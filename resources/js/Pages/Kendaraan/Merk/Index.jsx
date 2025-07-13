import Container from "@/Components/Container";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@mui/material";

export default function Index() {
    const user = usePage().props.auth.user;
    const { merk } = usePage().props;

    const columns = [
        { id: "no", label: "No", width: 75 },
        { id: "merk", label: "Merk", minWidth: 100 },
    ];

    const rows = merk.data.map((item) => ({
        id: item.id,
        merk: item.nama,
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
                    <h2 className="font-semibold text-lg">Merk Kendaraan</h2>
                    <Button
                        variant="contained"
                        size="small"
                        href={route("kendaraan.tipe.index")}
                    >
                        Tipe Kendaraan
                    </Button>
                </div>
                <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    urlDetailRow={"/kendaraan/merk"}
                    paginationLinks={merk.links}
                    paginationMeta={merk}
                />
                <div className="mt-2">
                    {user.role == "admin" && (
                        <Button
                            variant="contained"
                            size="small"
                            href={route("kendaraan.merk.create")}
                        >
                            Tambah Merk
                        </Button>
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
