import { useEffect, useState, useRef } from "react";
import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/id";
import axios from "axios";
import PersonalInfoCard from "./Component/PersonalInfoCard";
import VehicleInfoCard from "./Component/VehicleInfoCard";
import KeteranganCard from "./Component/KeteranganCard";
import FileUploadSection from "./Component/FileUploadSection";

// Fungsi bantu untuk konversi URL ke File
async function urlToFile(url, fileName, mimeType) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
}

export default function Edit() {
    const { pendaftaran, penanggung } = usePage().props;
    // console.log(pendaftaran);
    const [kendaraan, setKendaraan] = useState(pendaftaran.kendaraan);
    const [pelanggan, setPelanggan] = useState(pendaftaran.pelanggan);
    const [plate, setPlate] = useState({ prefix: "", number: "", suffix: "" });

    const [stnkFiles, setStnkFiles] = useState([]);
    const [kerusakanFiles, setKerusakanFiles] = useState([]);
    const [gesekRangkaFiles, setGesekRangkaFiles] = useState([]);
    const [suratPengantarFiles, setSuratPengantarFiles] = useState([]);

    const { data, setData, post, processing, reset, errors } = useForm({
        no_pendaftaran: String(pendaftaran.id).padStart(6, "0") || "",
        no_telepon: pendaftaran.pelanggan?.no_telepon || "",
        nama: pendaftaran.pelanggan?.nama || "",
        alamat: pendaftaran.pelanggan?.alamat || "",
        tanggal_pendaftaran: dayjs(pendaftaran.tanggal_pendaftaran).format(
            "YYYY-MM-DD"
        ),
        km_masuk: pendaftaran.km_masuk ?? 0,
        no_register: pendaftaran.no_register || "",
        penanggung: pendaftaran.penanggung_id || "",
        no_polis: pendaftaran.no_polis || "",
        no_rangka: pendaftaran.kendaraan?.no_rangka || "",
        no_mesin: pendaftaran.kendaraan?.no_mesin || "",
        no_polisi: pendaftaran.kendaraan?.no_polisi || "",
        plate_prefix: "",
        plate_number: "",
        plate_suffix: "",
        merk: pendaftaran.kendaraan?.tipe?.merk?.id || "",
        tipe: pendaftaran.kendaraan?.tipe_id || "",
        tahun: pendaftaran.kendaraan?.tahun || "",
        jenis: pendaftaran.kendaraan?.jenis || "",
        warna: pendaftaran.kendaraan?.warna || "",
        keterangan: pendaftaran.keterangan || "",
        foto_stnk: [],
        foto_kerusakan: [],
        gesek_rangka: [],
        surat_pengantar: [],
    });

    useEffect(() => {
        async function convertUrlToFileArray(fieldName, setter) {
            const filesData = pendaftaran[fieldName];

            if (Array.isArray(filesData) && filesData.length > 0) {
                try {
                    const files = await Promise.all(
                        filesData.map((foto) =>
                            urlToFile(
                                "/storage/" + foto.path,
                                foto.path.split("/").pop(),
                                "image/" + foto.path.split(".").pop()
                            )
                        )
                    );
                    setter(files);
                } catch (error) {
                    console.error(
                        `Gagal mengkonversi URL ke file (${fieldName}):`,
                        error
                    );
                }
            }
        }

        console.log(pendaftaran);

        convertUrlToFileArray("foto_stnks", setStnkFiles);
        convertUrlToFileArray("foto_kerusakans", setKerusakanFiles);
        convertUrlToFileArray("foto_gesek_rangkas", setGesekRangkaFiles);
        convertUrlToFileArray("foto_surat_pengantars", setSuratPengantarFiles);
    }, [pendaftaran]);

    useEffect(() => {
        console.log("data", data);
    }, [data]);
    // Update data setelah `pendaftaran` tersedia

    useEffect(() => {
        // Parsing string defaultPlate menjadi object dengan prefix, number, dan suffix.

        const initialPlate = pendaftaran.kendaraan?.no_polisi
            ? (() => {
                  const parts = pendaftaran.kendaraan?.no_polisi.split(" ");
                  return {
                      prefix: parts[0] || "",
                      number: parts[1] || "",
                      suffix: parts[2] || "",
                  };
              })()
            : { prefix: "", number: "", suffix: "" };
        setPlate(initialPlate);
        // const [plate, setPlate] = useState(initialPlate);
    }, [pendaftaran.kendaraan?.no_polisi]);

    // console.log(data.kelengkapan);
    const fetchKendaraan = async () => {
        if (`${data.no_rangka}`.trim() === "") return;
        try {
            const response = await axios.get(
                route("api.kendaraan.no_rangka", {
                    no_rangka: `${data.no_rangka}`,
                })
            );

            // setKendaraan(response.data);

            if (Object.keys(response.data).length > 0) {
                console.log(response.data);
                setKendaraan(response.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data kendaraan", error);
            // setKendaraan(null);
        }
    };

    const fetchPelanggan = async () => {
        if (data.no_telepon.trim() === "") return;
        try {
            const response = await axios.get(
                route("api.pelanggan.no_telepon", {
                    no_telepon: data.no_telepon,
                })
            );

            if (Object.keys(response.data).length > 0) {
                console.log(response.data);
                setPelanggan(response.data);
            }
            // setPelanggan(response.data);
        } catch (error) {
            console.error("Gagal mengambil data pelanggan", error);
        }
    };

    useEffect(() => {
        setData(
            "no_polisi",
            `${plate.prefix} ${plate.number} ${plate.suffix}`.trim()
        );
        setData("plate_prefix", plate.prefix);
        setData("plate_number", plate.number);
        setData("plate_suffix", plate.suffix);
    }, [plate]);

    useEffect(() => {
        console.log("kendaraan", kendaraan);
        setData("no_rangka", kendaraan?.no_rangka || "");
        setData("no_mesin", kendaraan?.no_mesin || "");
        setData("merk", kendaraan?.tipe?.merk?.id || "");
        setData("tipe", kendaraan?.tipe_id || "");
        setData("tahun", kendaraan?.tahun || "");
        setData("jenis", kendaraan?.jenis || "");
        setData("warna", kendaraan?.warna || "");
    }, [kendaraan]);

    useEffect(() => {
        setData("nama", pelanggan?.nama || "");
        setData("alamat", pelanggan?.alamat || "");
    }, [pelanggan]);

    useEffect(() => {
        setData("foto_stnk", stnkFiles);
    }, [stnkFiles]);

    useEffect(() => {
        setData("foto_kerusakan", kerusakanFiles);
    }, [kerusakanFiles]);

    useEffect(() => {
        setData("foto_gesek_rangka", gesekRangkaFiles);
    }, [gesekRangkaFiles]);

    useEffect(() => {
        setData("foto_surat_pengantar", suratPengantarFiles);
    }, [suratPengantarFiles]);

    const submit = (e) => {
        // console.log(data);
        e.preventDefault();
        post(route("pendaftaran.update", pendaftaran.id), {
            _method: "put",
            onSuccess: () => {
                alert("Data berhasil disimpan!");
                reset();
            },
            onError: (errors) => {
                console.error("Terjadi kesalahan:", errors);
                alert("Gagal menyimpan data. Periksa kembali input Anda.");
            },
            onFinish: () => {
                console.log("Request selesai.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-5">
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => window.history.back()}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Pendaftaran
                    </h2>
                </div>
            }
        >
            <Head title="Edit Pendaftaran" />
            <Container>
                <form onSubmit={submit}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="id"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-[70%_30%]">
                            <div>
                                <PersonalInfoCard
                                    data={data}
                                    setData={setData}
                                    fetchPelanggan={fetchPelanggan}
                                    penanggung={penanggung}
                                    errors={errors}
                                />
                                <VehicleInfoCard
                                    data={data}
                                    setData={setData}
                                    plate={plate}
                                    setPlate={setPlate}
                                    fetchKendaraan={fetchKendaraan}
                                    errors={errors}
                                />

                                <KeteranganCard
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </div>
                            <FileUploadSection
                                stnkFiles={stnkFiles}
                                setStnkFiles={setStnkFiles}
                                kerusakanFiles={kerusakanFiles}
                                setKerusakanFiles={setKerusakanFiles}
                                gesekRangkaFiles={gesekRangkaFiles}
                                setGesekRangkaFiles={setGesekRangkaFiles}
                                suratPengantarFiles={suratPengantarFiles}
                                setSuratPengantarFiles={setSuratPengantarFiles}
                                errors={errors}
                            />
                        </div>
                    </LocalizationProvider>
                    <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        className="ms-4"
                        disabled={processing}
                    >
                        Simpan
                    </Button>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
