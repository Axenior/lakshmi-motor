import Container from "@/Components/Container";
import CustomSelect from "@/Components/CustomSelect";
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
                            Penanggung
                        </InputLabel>
                        <CustomSelect
                            name={"penanggung"}
                            value={selectedPenanggung}
                            onChange={(val) => {
                                setSelectedMerk(val);
                                params.set("penanggung", val);

                                window.history.pushState(
                                    {},
                                    "",
                                    `${
                                        window.location.pathname
                                    }?${params.toString()}`
                                );
                            }}
                            options={penanggung}
                        />
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
