import Container from "@/Components/Container";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/id";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import dayjs from "dayjs";

export default function Index() {
    const { pendaftaran, penanggung } = usePage().props;
    console.log(penanggung);

    const { data, setData, get } = useForm({
        startDate: null,
        endDate: null,
        sortDirection: "",
        searchBy: "",
        searchText: "",
    });

    const handleStartDateChange = (newValue) => {
        setData("startDate", newValue ? newValue.format("YYYY-MM-DD") : null);
    };

    const handleEndDateChange = (newValue) => {
        setData("endDate", newValue ? newValue.format("YYYY-MM-DD") : null);
    };

    const handleSortChange = (event) => {
        setData("sortDirection", event.target.value);
    };

    const handleSearchByChange = (event) => {
        setData("searchBy", event.target.value);
    };

    const handleSearchTextChange = (event) => {
        setData("searchText", event.target.value);
    };

    const handleSearch = () => {
        get(route("pendaftaran.index"), {
            preserveState: true,
            replace: true,
        });
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
        { id: "last_editor", label: "Last Editor", minWidth: 75 },
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
        no: index + 1,
        id: item.id,
        no_pendaftaran: item.id,
        tanggal_pendaftaran: new Date(
            item.tanggal_pendaftaran
        ).toLocaleDateString("id-ID"),
        nama_pelanggan: item.nama,
        nama_penanggung: item.penanggung ? item.penanggung.nama : null,
        no_polisi: item.no_polisi,
        estimasi: item.estimasi,
        file_kerusakan: item.file_kerusakans,
        file_epoxy: item.file_epoxys,
        file_surat_pengantar: item.file_surat_pengantars,
        file_gesek_rangka: item.file_gesek_rangkas,
        file_spk: item.file_spks,
        file_stnk: item.file_stnks,
        status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
        last_editor: item.user ? item.user.name : null,
    }));
    console.log(pendaftaran);
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
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="id"
                >
                    <div className="flex flex-wrap gap-4 mb-5">
                        <div className="flex gap-2">
                            <DatePicker
                                label="Tanggal Awal"
                                format="DD/MM/YYYY"
                                value={
                                    data.startDate
                                        ? dayjs(data.startDate)
                                        : null
                                }
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
                            <DatePicker
                                label="Tanggal Akhir"
                                format="DD/MM/YYYY"
                                value={
                                    data.endDate ? dayjs(data.endDate) : null
                                }
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
                        </div>
                        <FormControl size="small" sx={{ minWidth: 140 }}>
                            <InputLabel id="sort-label">Sort</InputLabel>
                            <Select
                                labelId="sort-label"
                                value={data.sortDirection}
                                label="Sort"
                                onChange={handleSortChange}
                            >
                                <MenuItem value="asc">Terlama</MenuItem>
                                <MenuItem value="desc">Terbaru</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="flex gap-2">
                            <FormControl size="small" sx={{ minWidth: 160 }}>
                                <InputLabel id="searchby-label">
                                    Cari Berdasarkan
                                </InputLabel>
                                <Select
                                    labelId="searchby-label"
                                    value={data.searchBy}
                                    label="Cari Berdasarkan"
                                    onChange={handleSearchByChange}
                                >
                                    <MenuItem value="no_pendaftaran">
                                        No. Pendaftaran
                                    </MenuItem>
                                    <MenuItem value="nama">
                                        Nama Pelanggan
                                    </MenuItem>
                                    <MenuItem value="penanggung_id">
                                        Nama Penanggung
                                    </MenuItem>
                                    <MenuItem value="no_polisi">
                                        No Polisi
                                    </MenuItem>
                                    <MenuItem value="status">Status</MenuItem>
                                </Select>
                            </FormControl>

                            {data.searchBy === "penanggung_id" ? (
                                <FormControl
                                    size="small"
                                    sx={{ minWidth: 160 }}
                                >
                                    <InputLabel id="penanggung-select-label">
                                        Pilih Penanggung
                                    </InputLabel>
                                    <Select
                                        labelId="penanggung-select-label"
                                        value={data.searchText}
                                        label="Pilih Penanggung"
                                        onChange={handleSearchTextChange}
                                    >
                                        {penanggung.map((p) => (
                                            <MenuItem key={p.id} value={p.id}>
                                                {p.nama}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : data.searchBy === "status" ? (
                                <FormControl
                                    size="small"
                                    sx={{ minWidth: 160 }}
                                >
                                    <InputLabel id="penanggung-select-label">
                                        Pilih Status
                                    </InputLabel>
                                    <Select
                                        labelId="penanggung-select-label"
                                        value={data.searchText}
                                        label="Pilih Status"
                                        onChange={handleSearchTextChange}
                                    >
                                        <MenuItem key={1} value={"pendaftaran"}>
                                            Pendaftaran
                                        </MenuItem>
                                        <MenuItem key={1} value={"estimasi"}>
                                            Estimasi
                                        </MenuItem>
                                        <MenuItem key={1} value={"pengerjaan"}>
                                            Pengerjaan
                                        </MenuItem>
                                        <MenuItem key={1} value={"selesai"}>
                                            Selesai
                                        </MenuItem>
                                        <MenuItem key={1} value={"batal"}>
                                            Batal
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    size="small"
                                    label="Isi Pencarian"
                                    value={data.searchText}
                                    onChange={handleSearchTextChange}
                                    sx={{
                                        "& .MuiInputBase-input:focus": {
                                            outline: "none",
                                            boxShadow: "none",
                                        },
                                    }}
                                />
                            )}
                        </div>

                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleSearch}
                        >
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
