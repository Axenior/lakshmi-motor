import Container from "@/Components/Container";
import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import StickyHeadTable from "@/Components/StickyHeadTable";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Index() {
    const user = usePage().props.auth.user;
    const { jasa } = usePage().props;

    const { data, setData, get } = useForm({
        searchText: "",
    });

    const columns = [
        { id: "no", label: "No", width: 50 },
        { id: "nama", label: "Nama", width: 300 },
        { id: "harga", label: "Harga", width: 300 },
    ];

    const rows = jasa.data.map((data) => ({
        ...data,
        harga: "Rp " + data.harga.toLocaleString("id-ID"),
    }));

    const handleSearch = () => {
        get(route("jasa.index"), {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Jasa
                </h2>
            }
        >
            <Head title="Jasa" />

            <Container className="py-5">
                <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                    <InputLabel className="flex items-center">Nama</InputLabel>
                    <TextInput
                        value={data.searchText}
                        onChange={(e) => setData("searchText", e.target.value)}
                    />
                </div>
                <div className="my-1">
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleSearch}
                    >
                        Cari
                    </Button>
                </div>
                {user.role == "admin" && (
                    <Button
                        variant="contained"
                        size="small"
                        component="a"
                        href={route("jasa.create")}
                        sx={{ marginBottom: "10px" }}
                    >
                        Tambah
                    </Button>
                )}

                <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    paginationLinks={jasa.links}
                    paginationMeta={jasa}
                    urlDetailRow={"/jasa"}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
