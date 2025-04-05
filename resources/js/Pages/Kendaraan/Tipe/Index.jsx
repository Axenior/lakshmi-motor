import Container from "@/Components/Container";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@mui/material";

export default function Index() {
    const { tipe } = usePage().props;

    const columns = [
        { id: "no", label: "No", width: 75 },
        { id: "merk", label: "Merk", minWidth: 100 },
        { id: "tipe", label: "Tipe", minWidth: 100 },
    ];

    const rows = tipe.map((item) => ({
        id: item.id,
        merk: item.merk.nama,
        tipe: item.nama,
    }));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Jenis Kendaraan
                </h2>
            }
        >
            <Head title="Jenis Kendaraan" />

            <Container className="py-5">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="font-semibold text-lg">Tipe Kendaraan</h2>
                    <Button
                        variant="contained"
                        size="small"
                        href={route("kendaraan.merk.index")}
                    >
                        Merk Kendaraan
                    </Button>
                </div>
                <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    urlDetailRow={"/kendaraan/tipe"}
                />
                <div className="mt-2">
                    <Button
                        variant="contained"
                        size="small"
                        href={route("kendaraan.tipe.create")}
                    >
                        Tambah Tipe
                    </Button>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
