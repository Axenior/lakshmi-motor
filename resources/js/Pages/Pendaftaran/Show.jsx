import { useEffect, useState, useRef } from "react";
import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Divider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/id";
import PersonalInfoCard from "./Component/PersonalInfoCard";
import VehicleInfoCard from "./Component/VehicleInfoCard";
import KeteranganCard from "./Component/KeteranganCard";
import FileUploadSection from "./Component/FileUploadSection";
import EstimateCard from "./Component/EstimateCard";
import InputLabel from "@/Components/InputLabel";
import FileUpload from "@/Components/FileUpload";
import StatusCard from "./Component/StatusCard";

// Fungsi bantu untuk konversi URL ke File
async function urlToFile(url, fileName, mimeType) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
}

export default function Create() {
    const { pendaftaran, penanggung } = usePage().props;
    // console.log(pendaftaran);
    const [plate, setPlate] = useState({ prefix: "", number: "", suffix: "" });

    const [stnkFiles, setStnkFiles] = useState([]);
    const [kerusakanFiles, setKerusakanFiles] = useState([]);
    const [gesekRangkaFiles, setGesekRangkaFiles] = useState([]);
    const [suratPengantarFiles, setSuratPengantarFiles] = useState([]);
    const [spkFiles, setSpkFiles] = useState([]);
    const [epoxyFiles, setEpoxyFiles] = useState([]);

    const {
        delete: destroy,
        data,
        setData,
    } = useForm({
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
        perkiraan_waktu: pendaftaran.perkiraan_waktu || 0,
        nilai_or: pendaftaran.nilai_or || 0,
        status: pendaftaran.status || "pendaftaran",
        lunas: pendaftaran.lunas || false,
    });

    console.log(pendaftaran);
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

        console.log(pendaftaran);

        convertUrlToFileArray("file_stnks", setStnkFiles);
        convertUrlToFileArray("file_kerusakans", setKerusakanFiles);
        convertUrlToFileArray("file_gesek_rangkas", setGesekRangkaFiles);
        convertUrlToFileArray("file_surat_pengantars", setSuratPengantarFiles);
        convertUrlToFileArray("file_spks", setSpkFiles);
        convertUrlToFileArray("file_epoxys", setEpoxyFiles);
    }, [pendaftaran]);

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

    const deleting = (e) => {
        e.preventDefault();

        destroy(route("pendaftaran.destroy", pendaftaran.id), {
            onSuccess: () => {
                alert("Data berhasil dihapus!");
                reset();
            },
            onError: (errors) => {
                console.error("Terjadi kesalahan:", errors);
                alert(errors.error);
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
                        href={route("pendaftaran.index")}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Pendaftaran
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Pendaftaran" />
            <Container className="py-5">
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        href={route("pendaftaran.edit", pendaftaran.id)}
                    >
                        Edit
                    </Button>

                    {/* <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={deleting}
                    >
                        Hapus
                    </Button> */}
                </div>
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
                                isReadOnly={true}
                            />
                            <VehicleInfoCard
                                data={data}
                                setData={setData}
                                plate={plate}
                                setPlate={setPlate}
                                isReadOnly={true}
                            />

                            <KeteranganCard
                                data={data}
                                setData={setData}
                                isReadOnly={true}
                            />
                            <StatusCard
                                data={data}
                                setData={setData}
                                isReadOnly={true}
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
                                setSuratPengantarFiles={setSuratPengantarFiles}
                                isDisabled={true}
                            />
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
                                        isDisabled={true}
                                    />
                                    <InputLabel className="my-2">
                                        Foto Epoxy
                                    </InputLabel>
                                    <FileUpload
                                        label="Epoxy"
                                        selectedFiles={epoxyFiles}
                                        setSelectedFiles={setEpoxyFiles}
                                        isDisabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </LocalizationProvider>
            </Container>
        </AuthenticatedLayout>
    );
}
