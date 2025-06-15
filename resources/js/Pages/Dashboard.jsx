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
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import StickyHeadTable from "@/Components/StickyHeadTable";

export default function Dashboard({
    jumlah_pendaftaran_hari_ini,
    jumlah_pengerjaan,
    jumlah_estimasi,
    pendaftaran,
}) {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });
    console.log(pendaftaran);
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

    const rows = pendaftaran.map((item, index) => ({
        no: index + 1, // Menambahkan nomor urut
        id: item.id,
        no_pendaftaran: item.id,
        tanggal_pendaftaran: new Date(
            item.tanggal_pendaftaran
        ).toLocaleDateString("id-ID"),
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
        last_editor: item.user ? item.user.name : null,
    }));

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
                            <span className="">
                                {jumlah_pendaftaran_hari_ini}
                            </span>
                        </div>
                    </Card>
                    <Card className="bg-sky-600 h-[100px] flex items-center gap-x-4 px-4">
                        <BuildIcon className="!text-4xl flex-shrink-0" />
                        <div className="flex flex-col">
                            <Typography>Servis Sedang Dikerjakan</Typography>
                            <span className="">{jumlah_pengerjaan}</span>
                        </div>
                    </Card>
                    <Card className="bg-sky-600 h-[100px] flex items-center gap-x-4 px-4">
                        <PendingActionsIcon className="!text-4xl flex-shrink-0" />
                        <div className="flex flex-col">
                            <Typography>Pendaftaran Dalam Estimasi</Typography>
                            <span className="">{jumlah_estimasi}</span>
                        </div>
                    </Card>
                </div>

                <div className="my-5">
                    <Typography variant="h6">Pendaftaran Terbaru</Typography>
                    <Button
                        variant="contained"
                        component="a"
                        href={route("pendaftaran.create")}
                        sx={{ my: 1 }}
                    >
                        Tambah Pendaftaran
                    </Button>
                    <StickyHeadTable
                        columns={columns}
                        rows={rows}
                        checkboxFields={checkboxFields}
                        isShowPagination={false}
                        urlDetailRow={"/pendaftaran"}
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
