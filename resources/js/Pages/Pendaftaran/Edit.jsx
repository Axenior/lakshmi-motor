import { useEffect, useState, useRef } from "react";
import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Divider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/id";
import axios from "axios";
import PersonalInfoCard from "./Component/PersonalInfoCard";
import VehicleInfoCard from "./Component/VehicleInfoCard";
import KeteranganCard from "./Component/KeteranganCard";
import FileUploadSection from "./Component/FileUploadSection";
import FileUpload from "@/Components/FileUpload";
import InputLabel from "@/Components/InputLabel";
import StatusCard from "./Component/StatusCard";
import DownloadAllFile from "./Component/DownloadAllFile";

// Fungsi bantu untuk konversi URL ke File
async function urlToFile(url, fileName, mimeType) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
}

export default function Edit() {
    const { pendaftaran, penanggung } = usePage().props;
    const user = usePage().props.auth.user;
    // console.log(pendaftaran);
    const [kendaraan, setKendaraan] = useState(pendaftaran.kendaraan);
    const [pelanggan, setPelanggan] = useState(pendaftaran.pelanggan);
    const [plate, setPlate] = useState({ prefix: "", number: "", suffix: "" });

    const [stnkFiles, setStnkFiles] = useState([]);
    const [kerusakanFiles, setKerusakanFiles] = useState([]);
    const [gesekRangkaFiles, setGesekRangkaFiles] = useState([]);
    const [suratPengantarFiles, setSuratPengantarFiles] = useState([]);
    const [spkFiles, setSpkFiles] = useState([]);
    const [epoxyFiles, setEpoxyFiles] = useState([]);

    const { data, setData, post, processing, reset, errors } = useForm({
        no_pendaftaran: String(pendaftaran.id).padStart(6, "0") || "",
        no_telepon: pendaftaran.no_telepon || "",
        nama: pendaftaran.nama || "",
        alamat: pendaftaran.alamat || "",
        tanggal_pendaftaran: dayjs(pendaftaran.tanggal_pendaftaran).format(
            "YYYY-MM-DD"
        ),
        km_masuk: pendaftaran.km_masuk ?? 0,
        no_register: pendaftaran.no_register || "",
        penanggung: pendaftaran.penanggung_id || "",
        no_polis: pendaftaran.no_polis || "",
        no_rangka: pendaftaran.no_rangka || "",
        no_mesin: pendaftaran.no_mesin || "",
        no_polisi: pendaftaran.no_polisi || "",
        plate_prefix: "",
        plate_number: "",
        plate_suffix: "",
        merk: pendaftaran.tipe?.merk?.id || "",
        tipe: pendaftaran.tipe_id || "",
        tahun: pendaftaran.tahun || "",
        jenis: pendaftaran.jenis || "",
        warna: pendaftaran.warna || "",
        keterangan: pendaftaran.keterangan || "",
        status: pendaftaran.status || "pendaftaran",
        lunas: pendaftaran.lunas || false,
        keterangan_pembatalan: pendaftaran.keterangan_pembatalan || "",
        user: user.id,
    });

    useEffect(() => {
        async function convertUrlToFileArray(fieldName, setter) {
            const filesData = pendaftaran[fieldName];

            if (Array.isArray(filesData) && filesData.length > 0) {
                try {
                    const files = await Promise.all(
                        filesData.map((fileObj) => {
                            const filePath = "/storage/" + fileObj.path;
                            const fileName = fileObj.path.split("/").pop();
                            const fileExtension = fileName
                                .split(".")
                                .pop()
                                .toLowerCase();

                            // Tentukan MIME type
                            const mimeTypeMap = {
                                jpg: "image/jpeg",
                                jpeg: "image/jpeg",
                                png: "image/png",
                                gif: "image/gif",
                                pdf: "application/pdf",
                            };
                            const mimeType =
                                mimeTypeMap[fileExtension] ||
                                "application/octet-stream";

                            return urlToFile(filePath, fileName, mimeType);
                        })
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

        convertUrlToFileArray("file_stnks", setStnkFiles);
        convertUrlToFileArray("file_kerusakans", setKerusakanFiles);
        convertUrlToFileArray("file_gesek_rangkas", setGesekRangkaFiles);
        convertUrlToFileArray("file_surat_pengantars", setSuratPengantarFiles);
        convertUrlToFileArray("file_spks", setSpkFiles);
        convertUrlToFileArray("file_epoxys", setEpoxyFiles);
    }, [pendaftaran]);

    useEffect(() => {
        console.log("data", data);
    }, [data]);
    // Update data setelah `pendaftaran` tersedia

    console.log(pendaftaran);

    useEffect(() => {
        // Parsing string defaultPlate menjadi object dengan prefix, number, dan suffix.

        const initialPlate = pendaftaran.no_polisi
            ? (() => {
                  const parts = pendaftaran.no_polisi.split(" ");
                  return {
                      prefix: parts[0] || "",
                      number: parts[1] || "",
                      suffix: parts[2] || "",
                  };
              })()
            : { prefix: "", number: "", suffix: "" };
        setPlate(initialPlate);
        // const [plate, setPlate] = useState(initialPlate);
    }, [pendaftaran.no_polisi]);

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
        setData("file_stnk", stnkFiles);
    }, [stnkFiles]);

    useEffect(() => {
        setData("file_kerusakan", kerusakanFiles);
    }, [kerusakanFiles]);

    useEffect(() => {
        setData("file_gesek_rangka", gesekRangkaFiles);
    }, [gesekRangkaFiles]);

    useEffect(() => {
        setData("file_surat_pengantar", suratPengantarFiles);
    }, [suratPengantarFiles]);

    useEffect(() => {
        setData("file_spk", spkFiles);
    }, [spkFiles]);

    useEffect(() => {
        setData("file_epoxy", epoxyFiles);
    }, [epoxyFiles]);

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
                        href={route("pendaftaran.show", pendaftaran.id)}
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
                <form onSubmit={submit} className="mb-5">
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="id"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-[70%_30%]">
                            <div>
                                <PersonalInfoCard
                                    data={data}
                                    setData={setData}
                                    penanggung={penanggung}
                                    errors={errors}
                                />
                                <VehicleInfoCard
                                    data={data}
                                    setData={setData}
                                    plate={plate}
                                    setPlate={setPlate}
                                    errors={errors}
                                />

                                <KeteranganCard
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                                <StatusCard
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </div>
                            <div>
                                <FileUploadSection
                                    stnkFiles={stnkFiles}
                                    setStnkFiles={setStnkFiles}
                                    kerusakanFiles={kerusakanFiles}
                                    setKerusakanFiles={setKerusakanFiles}
                                    gesekRangkaFiles={gesekRangkaFiles}
                                    setGesekRangkaFiles={setGesekRangkaFiles}
                                    suratPengantarFiles={suratPengantarFiles}
                                    setSuratPengantarFiles={
                                        setSuratPengantarFiles
                                    }
                                    errors={errors}
                                />
                                <Divider sx={{ my: 2 }} />
                                <div className="mb-3 flex sm:justify-end m-2">
                                    <DownloadAllFile
                                        pendaftaran={pendaftaran}
                                    />
                                </div>
                                <Divider sx={{ my: 2 }} />
                                <div className="flex justify-end m-2">
                                    <div className="sm:text-right">
                                        <InputLabel className="mb-2">
                                            Menu Estimasi
                                        </InputLabel>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            href={route(
                                                "estimasi.create",
                                                pendaftaran.id
                                            )}
                                        >
                                            Estimasi
                                        </Button>
                                        <InputLabel className="my-2">
                                            SPK
                                        </InputLabel>
                                        <FileUpload
                                            label="SPK"
                                            selectedFiles={spkFiles}
                                            setSelectedFiles={setSpkFiles}
                                            allowedType="pdf"
                                        />
                                        <InputLabel className="my-2">
                                            Foto Epoxy
                                        </InputLabel>
                                        <FileUpload
                                            label="Epoxy"
                                            selectedFiles={epoxyFiles}
                                            setSelectedFiles={setEpoxyFiles}
                                        />
                                    </div>
                                </div>
                            </div>
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
