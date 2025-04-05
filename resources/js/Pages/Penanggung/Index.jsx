import Container from "@/Components/Container";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Button } from "@mui/material";

export default function Index() {
    const { penanggung } = usePage().props;

    const columns = [
        { id: "no", label: "No", minWidth: 20 },
        { id: "nama", label: "Nama", minWidth: 100 },
        {
            id: "alamat",
            label: "Alamat",
            minWidth: 170,
        },
        { id: "no_telepon", label: "No Telepon", minWidth: 170 },
        { id: "no_fax", label: "No Fax", minWidth: 170 },
        {
            id: "pph",
            label: "PPH",
            minWidth: 100,
            format: (value) => (value !== null ? `${value}%` : "-"),
        },
        {
            id: "ppn",
            label: "PPN",
            minWidth: 100,
            format: (value) => (value !== null ? `${value}%` : "-"),
        },
    ];

    const rows = penanggung.data;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Penanggung
                </h2>
            }
        >
            <Head title="Penanggung" />

            <Container className="py-5">
                <Button
                    variant="contained"
                    size="small"
                    component="a"
                    href={route("penanggung.create")}
                    sx={{ marginBottom: "10px" }}
                >
                    Tambah
                </Button>

                <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    urlDetailRow={"/penanggung"}
                    paginationLinks={penanggung.links}
                    paginationMeta={penanggung}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
