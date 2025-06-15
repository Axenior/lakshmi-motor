import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import StickyHeadTable from "@/Components/StickyHeadTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Index() {
    const {
        sparepart,
        merk,
        selectedMerk: selectedMerkFromProps,
        selectedTipe: selectedTipeFromProps,
    } = usePage().props;

    console.log(sparepart);

    const columns = [
        { id: "no", label: "No", width: 50 },
        { id: "kode", label: "Kode", width: 180 },
        { id: "nama", label: "Nama", width: 300 },
        { id: "satuan", label: "Satuan", width: 50 },
        { id: "harga", label: "Harga", width: 300 },
    ];

    const rows = sparepart.data.map((data) => ({
        ...data,
        harga: "Rp " + data.harga.toLocaleString("id-ID"),
    }));

    const merkRef = useRef(null);
    const tipeRef = useRef(null);

    const params = new URLSearchParams(window.location.search);

    const [selectedMerk, setSelectedMerk] = useState(
        selectedMerkFromProps || ""
    );
    const [selectedTipe, setSelectedTipe] = useState(
        selectedTipeFromProps || ""
    );

    const [tipe, setTipe] = useState(null);
    const fetchTipe = async () => {
        try {
            console.log(selectedMerk);
            const response = await axios.get(
                route("api.tipe", { merk: selectedMerk })
            );

            console.log(response);

            setTipe(response.data);
        } catch (error) {
            console.error("Gagal mengambil data merk kendaraan", error);
        }
    };

    useEffect(() => {
        if (selectedMerk) {
            fetchTipe();
        }
    }, [selectedMerk]);

    const searchTipe = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (selectedMerk) params.set("merk", selectedMerk);
        if (selectedTipe) params.set("tipe", selectedTipe);

        window.location.href = `${route(
            "sparepart.index"
        )}?${params.toString()}`;
    };

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
                <form onSubmit={searchTipe}>
                    <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                        <InputLabel className="flex items-center">
                            Merk
                        </InputLabel>
                        <Select
                            required
                            ref={merkRef}
                            name="merk"
                            value={selectedMerk}
                            onChange={(e) => {
                                setSelectedMerk(e.target.value);
                                params.set("merk", e.target.value);
                                params.delete("tipe");
                                setSelectedTipe("");

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
                                merkRef.current.classList.remove("Mui-focused");
                                merkRef.current.previousSibling?.classList.remove(
                                    "Mui-focused"
                                );
                            }}
                            onOpen={() => {
                                merkRef.current.classList.add("Mui-focused");
                                merkRef.current.previousSibling?.classList.add(
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
                            {merk &&
                                merk.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.nama}
                                    </MenuItem>
                                ))}
                        </Select>

                        <InputLabel className="flex items-center">
                            Tipe
                        </InputLabel>
                        <Select
                            required
                            ref={tipeRef}
                            name="tipe"
                            value={selectedTipe}
                            onChange={(e) => {
                                setSelectedTipe(e.target.value);
                                params.set("tipe", e.target.value);
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
                                tipeRef.current.classList.remove("Mui-focused");
                                tipeRef.current.previousSibling?.classList.remove(
                                    "Mui-focused"
                                );
                            }}
                            onOpen={() => {
                                tipeRef.current.classList.add("Mui-focused");
                                tipeRef.current.previousSibling?.classList.add(
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
                            {tipe &&
                                tipe.map((item) => (
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
                    href={route("sparepart.create")}
                    sx={{ marginBottom: "10px" }}
                >
                    Tambah
                </Button>

                <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    paginationLinks={sparepart.links}
                    paginationMeta={sparepart}
                    urlDetailRow={"/sparepart"}
                />
            </Container>
        </AuthenticatedLayout>
    );
}
