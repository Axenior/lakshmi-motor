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
        { id: "file_stnk", label: "STNK", minWidth: 100 },
        { id: "file_kerusakan", label: "Foto Kerusakan", minWidth: 100 },
        { id: "file_gesek_rangka", label: "Gesek Rangka", minWidth: 100 },
        { id: "file_surat_pengantar", label: "Surat Pengantar", minWidth: 100 },
        { id: "file_spk", label: "SPK", minWidth: 100 },
        { id: "file_epoxy", label: "Foto Epoxy", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },
    ];

    const checkboxFields = [
        "estimasi",
        "file_kerusakan",
        "file_epoxy",
        "file_surat_pengantar",
        "file_gesek_rangka",
        "file_spk",
        "file_stnk",
    ];

    const rows = pendaftaran.data.map((item, index) => ({
        no: index + 1, // Menambahkan nomor urut
        id: item.id,
        no_pendaftaran: item.id,
        tanggal_pendaftaran: item.tanggal_pendaftaran,
        nama_pelanggan: item.pelanggan ? item.pelanggan.nama : null,
        nama_penanggung: item.penanggung ? item.penanggung.nama : null,
        no_polisi: item.kendaraan ? item.kendaraan.no_polisi : null,
        estimasi: item.estimasi,
        file_kerusakan: item.file_kerusakans,
        file_epoxy: item.file_epoxys,
        file_surat_pengantar: item.file_surat_pengantars,
        file_gesek_rangka: item.file_gesek_rangkas,
        file_spk: item.file_spks,
        file_stnk: item.file_stnks,
        status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    }));

    console.log(rows);
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
                    paginationLinks={pendaftaran.links}
                    paginationMeta={pendaftaran}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
