import { useEffect, useState, useRef } from "react";
import Container from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/id";
import axios from "axios";
import PersonalInfoCard from "./Component/PersonalInfoCard";
import VehicleInfoCard from "./Component/VehicleInfoCard";
import KeteranganCard from "./Component/KeteranganCard";
import FileUploadSection from "./Component/FileUploadSection";
import KelengkapanCard from "./Component/KelengkapanCard";
import EstimateCard from "./Component/EstimateCard";

export default function Create() {
    const { nextId, penanggung } = usePage().props;
    // console.log(penanggung);
    const [kendaraan, setKendaraan] = useState(null);
    const [pelanggan, setPelanggan] = useState(null);
    const [plate, setPlate] = useState({ prefix: "", number: "", suffix: "" });

    const [stnkFiles, setStnkFiles] = useState([]);
    const [kerusakanFiles, setKerusakanFiles] = useState([]);
    const [gesekRangkaFiles, setGesekRangkaFiles] = useState([]);
    const [suratPengantarFiles, setSuratPengantarFiles] = useState([]);

    const { data, setData, post, processing, reset, errors } = useForm({
        no_pendaftaran: String(nextId).padStart(6, "0"),
        no_telepon: "",
        nama: "",
        alamat: "",
        tanggal_pendaftaran: dayjs().format("YYYY-MM-DD"),
        km_masuk: 0,
        no_register: "",
        penanggung: "",
        no_polisi: "",
        plate_prefix: "",
        plate_number: "",
        plate_suffix: "",
        no_rangka: "",
        no_polis: "",
        no_mesin: "",
        merk: "",
        tipe: "",
        tahun: "",
        jenis: "",
        warna: "",
        keterangan: "",
        perkiraan_waktu: 0,
        nilai_or: 0,
        file_stnk: [],
        file_kerusakan: [],
        file_gesek_rangka: [],
        file_surat_pengantar: [],
    });

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
            setPelanggan(null);
        }
    };

    useEffect(() => {
        console.log(data.tipe);
    }, [data.tipe]);

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
        setData("no_mesin", kendaraan?.no_mesin || "");
        setData("merk", kendaraan?.tipe.merk.id || "");
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

    const submit = (e) => {
        e.preventDefault();
        post(route("pendaftaran.store"), {
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
                        Tambah Pendaftaran
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Pendaftaran" />
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

                                <EstimateCard
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </div>
                            <FileUploadSection
                                errors={errors}
                                stnkFiles={stnkFiles}
                                setStnkFiles={setStnkFiles}
                                kerusakanFiles={kerusakanFiles}
                                setKerusakanFiles={setKerusakanFiles}
                                gesekRangkaFiles={gesekRangkaFiles}
                                setGesekRangkaFiles={setGesekRangkaFiles}
                                suratPengantarFiles={suratPengantarFiles}
                                setSuratPengantarFiles={setSuratPengantarFiles}
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
