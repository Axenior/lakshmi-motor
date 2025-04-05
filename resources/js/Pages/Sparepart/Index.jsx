import Container from "@/Components/Container";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Button } from "@mui/material";

export default function Index() {
    const { sparepart } = usePage().props;

    const columns = [
        { id: "no", label: "No", width: 50 },
        { id: "kode", label: "Kode", width: 180 },
        { id: "nama", label: "Nama", width: 300 },
        { id: "satuan", label: "Satuan", width: 50 },
        { id: "harga", label: "Harga", width: 300 },
    ];

    const rows = sparepart;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sparepart
                </h2>
            }
        >
            <Head title="Sparepart" />

            <Container className="py-5">
                <Button
                    variant="contained"
                    size="small"
                    component="a"
                    href={route("sparepart.create")}
                    sx={{ marginBottom: "10px" }}
                >
                    Tambah
                </Button>

                <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    urlDetailRow={"/sparepart"}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
