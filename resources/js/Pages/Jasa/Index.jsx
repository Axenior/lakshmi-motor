import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Index() {
    const {
        jasa,
        penanggung,
        selectedPenanggung: selectedPenanggungFromProps,
    } = usePage().props;

    const columns = [
        { id: "no", label: "No", width: 50 },
        { id: "penanggung", label: "Penanggung", width: 50 },
        { id: "nama", label: "Nama", width: 300 },
        { id: "harga", label: "Harga", width: 300 },
    ];

    const rows = jasa.data.map((item) => ({
        ...item,
        penanggung: item.penanggung?.nama || "Tidak diketahui",
    }));

    const penanggungRef = useRef(null);

    const params = new URLSearchParams(window.location.search);

    const [selectedPenanggung, setSelectedMerk] = useState(
        selectedPenanggungFromProps || ""
    );

    const searchPenanggung = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (selectedPenanggung) params.set("penanggung", selectedPenanggung);

        window.location.href = `${route("jasa.index")}?${params.toString()}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    jasa
                </h2>
            }
        >
            <Head title="jasa" />

            <Container className="py-5">
                <form onSubmit={searchPenanggung}>
                    <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                        <InputLabel className="flex items-center">
                            penanggung
                        </InputLabel>
                        <Select
                            required
                            ref={penanggungRef}
                            name="penanggung"
                            value={selectedPenanggung}
                            onChange={(e) => {
                                setSelectedMerk(e.target.value);
                                params.set("penanggung", e.target.value);

                                window.history.pushState(
                                    {},
                                    "",
                                    `${
                                        window.location.pathname
                                    }?${params.toString()}`
                                );
                            }}
                            className="h-8"
                            onClose={() => {
                                penanggungRef.current.classList.remove(
                                    "Mui-focused"
                                );
                                penanggungRef.current.previousSibling?.classList.remove(
                                    "Mui-focused"
                                );
                            }}
                            onOpen={() => {
                                penanggungRef.current.classList.add(
                                    "Mui-focused"
                                );
                                penanggungRef.current.previousSibling?.classList.add(
                                    "Mui-focused"
                                );
                            }}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "black",
                                    borderRadius: "0.375rem",
                                },
                            }}
                        >
                            {penanggung &&
                                penanggung.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.nama}
                                    </MenuItem>
                                ))}
                        </Select>
                    </div>
                    <div className="my-1">
                        <Button variant="contained" size="small" type="submit">
                            Cari
                        </Button>
                    </div>
                </form>
                <Button
                    variant="contained"
                    size="small"
                    component="a"
                    href={route("jasa.create")}
                    sx={{ marginBottom: "10px" }}
                >
                    Tambah
                </Button>

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
