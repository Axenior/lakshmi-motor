import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import StickyHeadTable from "@/Components/StickyHeadTable";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Index() {
    const { sparepart, merk } = usePage().props;

    console.log(sparepart);

    const { data, setData, get } = useForm({
        selectedMerk: "",
        selectedTipe: "",
        searchText: "",
    });

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

    const [tipe, setTipe] = useState(null);
    const fetchTipe = async () => {
        try {
            console.log(data.selectedMerk);
            const response = await axios.get(
                route("api.tipe", { merk: data.selectedMerk })
            );

            console.log(response);

            setTipe(response.data);
        } catch (error) {
            console.error("Gagal mengambil data merk kendaraan", error);
        }
    };

    useEffect(() => {
        if (data.selectedMerk) {
            fetchTipe();
        }
        setData("selectedTipe", "");
    }, [data.selectedMerk]);

    const handleSearch = () => {
        get(route("sparepart.index"), {
            preserveState: true,
            replace: true,
        });
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
                <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                    <InputLabel className="flex items-center">Merk</InputLabel>
                    <Select
                        required
                        ref={merkRef}
                        name="merk"
                        value={data.selectedMerk}
                        onChange={(e) => {
                            console.log(e.target.value);
                            console.log(data.selectedMerk);

                            setData("selectedMerk", e.target.value);
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

                    <InputLabel className="flex items-center">Tipe</InputLabel>

                    <Select
                        required
                        ref={tipeRef}
                        name="tipe"
                        value={data.selectedTipe}
                        onChange={(e) => {
                            setData("selectedTipe", e.target.value);
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
