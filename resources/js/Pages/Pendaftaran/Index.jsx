import Container from "@/Components/Container";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
import "dayjs/locale/id";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Button } from "@mui/material";

export default function Index() {
    const { pendaftaran } = usePage().props;
    console.log(pendaftaran);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (newValue) => {
        setStartDate(newValue);
        console.log("Start Date:", newValue?.format("YYYY-MM-DD"));
    };

    const handleEndDateChange = (newValue) => {
        setEndDate(newValue);
        console.log("End Date:", newValue?.format("YYYY-MM-DD"));
    };

    const columns = [
        { id: "no", label: "No", minWidth: 20 },
        { id: "no_pendaftaran", label: "No Pendaftaran", minWidth: 100 },
        {
            id: "tanggal_pendaftaran",
            label: "Tanggal Pendaftaran",
            minWidth: 170,
        },
        { id: "nama_pelanggan", label: "Nama Pelanggan", minWidth: 170 },
        {
            id: "nama_penanggung",
            label: "Nama Penanggung",
            minWidth: 170,
            format: (value) => (value == null ? "-" : value),
        },
        { id: "no_polisi", label: "No Polisi", minWidth: 150 },
        { id: "estimasi", label: "Estimasi", minWidth: 100 },
        { id: "foto_kerusakan", label: "Foto Kerusakan", minWidth: 100 },
        { id: "foto_epoxy", label: "Foto Epoxy", minWidth: 100 },
        { id: "surat_pengantar", label: "Surat Pengantar", minWidth: 100 },
        { id: "gesek_rangka", label: "Gesek Rangka", minWidth: 100 },
        { id: "spk", label: "SPK", minWidth: 100 },
        { id: "stnk", label: "STNK", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },
    ];

    const checkboxFields = [
        "estimasi",
        "foto_kerusakan",
        "foto_epoxy",
        "surat_pengantar",
        "gesek_rangka",
        "spk",
        "stnk",
    ];

    const rows = pendaftaran.map((item, index) => ({
        no: index + 1, // Menambahkan nomor urut
        id: item.id,
        no_pendaftaran: item.id,
        tanggal_pendaftaran: item.tanggal_pendaftaran,
        nama_pelanggan: item.pelanggan ? item.pelanggan.nama : null, // Jika pelanggan ada, ambil nama
        nama_penanggung: item.penanggung ? item.penanggung.nama : null, // Pastikan ada data penanggung
        no_polisi: item.kendaraan ? item.kendaraan.no_polisi : null,
        estimasi: item.estimasi,
        foto_kerusakan: item.foto_kerusakan,
        foto_epoxy: item.foto_epoxy,
        surat_pengantar: item.foto_surat_pengantar,
        gesek_rangka: item.foto_gesek_rangka,
        spk: item.spk,
        stnk: item.foto_stnk,
        status: item.status,
    }));

    console.log(pendaftaran);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pendaftaran
                </h2>
            }
        >
            <Head title="Pendaftaran" />

            <Container className="py-5">
                {/* <h2>Pendaftaran {nama}</h2> */}

                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="id"
                >
                    <div className="flex gap-5 mb-5">
                        <DatePicker
                            label="Tanggal Awal"
                            format="DD/MM/YYYY"
                            value={startDate}
                            onChange={handleStartDateChange}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        "& input": {
                                            "--tw-ring-shadow":
                                                "0 0 #000 !important",
                                        },
                                    },
                                },
                            }}
                        />
                        _
                        <DatePicker
                            label="Tanggal Akhir"
                            format="DD/MM/YYYY"
                            value={endDate}
                            onChange={handleEndDateChange}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        "& input": {
                                            "--tw-ring-shadow":
                                                "0 0 #000 !important",
                                        },
                                    },
                                },
                            }}
                        />
                        <Button variant="contained" size="small">
                            Cari
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            component="a"
                            href={route("pendaftaran.create")}
                        >
                            Tambah
                        </Button>
                    </div>
                </LocalizationProvider>

                <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    checkboxFields={checkboxFields}
                    urlDetailRow={"/pendaftaran"}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
