import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Show() {
    const { merk, sparepart } = usePage().props;
    const merkRef = useRef(null);
    const tipeRef = useRef(null);
    const satuanRef = useRef(null);
    console.log(sparepart);
    const { delete: destroy, reset } = useForm();
    const deleting = (e) => {
        e.preventDefault();

        destroy(route("sparepart.destroy", sparepart.id), {
            onSuccess: () => {
                alert("Data berhasil dihapus!");
                reset();
            },
            onError: (errors) => {
                console.error("Terjadi kesalahan:", errors);
                alert(errors.error);
            },
            onFinish: () => {
                console.log("Request selesai.");
            },
        });
    };

    const jenis = [{ value: "Pc" }, { value: "Set" }];

    const [tipe, setTipe] = useState(null);
    const fetchTipe = async () => {
        try {
            const response = await axios.get(
                route("api.tipe", { merk: sparepart.tipe.merk.id })
            );

            console.log(response);

            setTipe(response.data);
        } catch (error) {
            console.error("Gagal mengambil data merk kendaraan", error);
        }
    };

    useEffect(() => {
        if (sparepart.tipe.merk.id) fetchTipe();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-5">
                    <Button
                        variant="contained"
                        size="small"
                        href={route("sparepart.index")}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Sparepart
                    </h2>
                </div>
            }
        >
            <Head title="Detail Pendaftaran" />

            <Container className="py-5">
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        href={route("sparepart.edit", sparepart.id)}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={deleting}
                    >
                        Hapus
                    </Button>
                </div>
                <div className="grid grid-cols-1">
                    <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:w-fit">
                        <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                            <InputLabel className="flex items-center">
                                Merk
                            </InputLabel>
                            <Select
                                readOnly
                                ref={merkRef}
                                name="merk"
                                value={sparepart.tipe.merk.id}
                                onChange={(e) =>
                                    setData("merk", e.target.value)
                                }
                                className="h-8"
                                onClose={() => {
                                    merkRef.current.classList.remove(
                                        "Mui-focused"
                                    );
                                    merkRef.current.previousSibling?.classList.remove(
                                        "Mui-focused"
                                    );
                                }}
                                onOpen={() => {
                                    merkRef.current.classList.add(
                                        "Mui-focused"
                                    );
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
                                readOnly
                                ref={tipeRef}
                                name="tipe"
                                value={sparepart.tipe_id}
                                onChange={(e) =>
                                    setData("tipe", e.target.value)
                                }
                                className="h-8"
                                onClose={() => {
                                    tipeRef.current.classList.remove(
                                        "Mui-focused"
                                    );
                                    tipeRef.current.previousSibling?.classList.remove(
                                        "Mui-focused"
                                    );
                                }}
                                onOpen={() => {
                                    tipeRef.current.classList.add(
                                        "Mui-focused"
                                    );
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

                            <InputLabel className="flex items-center">
                                Kode
                            </InputLabel>
                            <TextInput
                                readOnly
                                value={sparepart.kode}
                                onChange={(e) =>
                                    setData("kode", e.target.value)
                                }
                            />

                            <InputLabel className="flex items-center">
                                Nama
                            </InputLabel>
                            <TextInput
                                readOnly
                                value={sparepart.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />

                            <InputLabel className="flex items-center">
                                Satuan
                            </InputLabel>
                            <Select
                                readOnly
                                ref={satuanRef}
                                value={sparepart.satuan}
                                onChange={(e) =>
                                    setData("satuan", e.target.value)
                                }
                                className="h-8"
                                onClose={() => {
                                    satuanRef.current.classList.remove(
                                        "Mui-focused"
                                    );
                                    satuanRef.current.previousSibling?.classList.remove(
                                        "Mui-focused"
                                    );
                                }}
                                onOpen={() => {
                                    satuanRef.current.classList?.add(
                                        "Mui-focused"
                                    );
                                    satuanRef.current.previousSibling?.classList.add(
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
                                {jenis &&
                                    jenis.map((item) => (
                                        <MenuItem
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.value}
                                        </MenuItem>
                                    ))}
                            </Select>

                            <InputLabel className="flex items-center">
                                Harga
                            </InputLabel>
                            <TextInput
                                readOnly
                                type="text"
                                inputMode="numeric"
                                min={0}
                                value={sparepart.harga}
                                onChange={(e) => {
                                    const val = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                    setData("harga", Number(val));
                                }}
                            />
                        </div>
                    </Card>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
