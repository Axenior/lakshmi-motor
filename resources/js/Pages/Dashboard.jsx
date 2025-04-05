import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
// import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Button, Card, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BuildIcon from "@mui/icons-material/Build";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StickyHeadTable from "@/Components/StickyHeadTable";

export default function Dashboard() {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const columns = [
        { id: "no", label: "No", minWidth: 20 },
        { id: "no_pendaftaran", label: "No Pendaftaran", minWidth: 100 },
        {
            id: "tanggal_pendaftaran",
            label: "Tanggal Pendaftaran",
            minWidth: 170,
        },
        { id: "nama_pelanggan", label: "Nama Pelanggan", minWidth: 170 },
        { id: "nama_penanggung", label: "Nama Penanggung", minWidth: 170 },
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

    const rows = [
        {
            no_pendaftaran: "001",
            tanggal_pendaftaran: "2025-03-08",
            nama_pelanggan: "John Doe",
            nama_penanggung: "Jane Doe",
            no_polisi: "AB 1234 CD",
            estimasi: "truee",
            foto_kerusakan: "truee",
            foto_epoxy: "truee",
            surat_pengantar: "truee",
            gesek_rangka: null,
            spk: null,
            stnk: null,
            status: "Proses",
        },
        {
            no_pendaftaran: "002",
            tanggal_pendaftaran: "2025-03-09",
            nama_pelanggan: "Alice Smith",
            nama_penanggung: "Bob Smith",
            no_polisi: "EF 5678 GH",
            estimasi: "truee",
            foto_kerusakan: "truee",
            foto_epoxy: "truee",
            surat_pengantar: null,
            gesek_rangka: "truee",
            spk: "truee",
            stnk: "truee",
            status: "Selesai",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Container className="my-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <Card className="bg-sky-600 h-[100px] flex items-center gap-x-4 px-4">
                        <ListAltIcon className="!text-4xl flex-shrink-0" />
                        <div className="flex flex-col">
                            <Typography>Pendaftaran Hari Ini</Typography>
                            <span className="">16</span>
                        </div>
                    </Card>
                    <Card className="bg-sky-600 h-[100px] flex items-center gap-x-4 px-4">
                        <BuildIcon className="!text-4xl flex-shrink-0" />
                        <div className="flex flex-col">
                            <Typography>Servis Sedang Dikerjakan</Typography>
                            <span className="">5</span>
                        </div>
                    </Card>
                    <Card className="bg-sky-600 h-[100px] flex items-center gap-x-4 px-4">
                        <AttachMoneyIcon className="!text-4xl flex-shrink-0" />
                        <div className="flex flex-col">
                            <Typography>Pemasukan Hari Ini</Typography>
                            <span className="">Rp16.000.000</span>
                        </div>
                    </Card>
                </div>

                <div className="my-5">
                    <Typography variant="h6">Pendaftaran Terbaru</Typography>
                    <Button
                        variant="contained"
                        component="a"
                        href="https://google.com"
                        sx={{ my: 1 }}
                    >
                        Tambah Pendaftaran
                    </Button>
                    <StickyHeadTable
                        columns={columns}
                        rows={rows}
                        checkboxFields={checkboxFields}
                        isShowPagination={false}
                    />
                </div>
            </Container>

            {/* <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={"truee"}
                    onChange={(e) => setData("email", e.target.value)}
                /> */}

            {/* <Checkbox {...label} /> */}
        </AuthenticatedLayout>
    );
}
