import Container from "@/Components/Container";
import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Index() {
    const { user } = usePage().props;

    const columns = [
        { id: "no", label: "No", width: 50 },
        { id: "name", label: "Nama", width: 300 },
        { id: "email", label: "Email", width: 300 },
        { id: "role", label: "Role", width: 300 },
        { id: "status", label: "Status", width: 300 },
    ];
    console.log(user);
    const rows = user.data.map((item, index) => ({
        ...item,
        status: item.isActive == true ? "Aktif" : "Nonaktif",
    }));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Daftar Pengguna
                </h2>
            }
        >
            <Head title="Pengguna" />

            <Container className="py-5">
                <Button
                    variant="contained"
                    size="small"
                    component="a"
                    href={route("user.create")}
                    sx={{ marginBottom: "10px" }}
                >
                    Tambah
                </Button>

                <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    paginationLinks={user.links}
                    paginationMeta={user}
                    urlDetailRow={"/user"}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
