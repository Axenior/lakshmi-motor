import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Create() {
    const { merk } = usePage().props;
    const merkRef = useRef(null);
    const tipeRef = useRef(null);
    const satuanRef = useRef(null);

    console.log(merk);
    const jenis = [{ value: "Pc" }, { value: "Set" }];

    const { data, setData, post, processing, errors, reset } = useForm({
        merk: "",
        tipe: "",
        kode: "",
        nama: "",
        satuan: "",
        harga: "",
    });

    const [tipe, setTipe] = useState(null);
    const fetchTipe = async () => {
        try {
            console.log(data.merk);
            const response = await axios.get(
                route("api.tipe", { merk: data.merk })
            );

            console.log(response);

            setTipe(response.data);
        } catch (error) {
            console.error("Gagal mengambil data merk kendaraan", error);
        }
    };

    useEffect(() => {
        if (data.merk) fetchTipe();
        setData("tipe", "");
    }, [data.merk]);

    const submit = (e) => {
        e.preventDefault();

        post(route("sparepart.store"), {
            onSuccess: () => {
                alert("Data berhasil disimpan!");
                reset();
            },
            onError: (errors) => {
                console.error("Terjadi kesalahan:", errors);
                alert("Gagal menyimpan data. Periksa kembali input Anda.");
            },
            onFinish: () => {
                console.log("Request selesai.");
            },
        });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

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
                        Tambah Sparepart
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Pendaftaran" />

            <Container>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1">
                        <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:w-fit">
                            <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                                <InputLabel className="flex items-center">
                                    Merk
                                </InputLabel>
                                <Select
                                    ref={merkRef}
                                    name="merk"
                                    value={data.merk}
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
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama}
                                            </MenuItem>
                                        ))}
                                </Select>
                                {errors.merk && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.merk}
                                        </Typography>
                                    </>
                                )}

                                <InputLabel className="flex items-center">
                                    Tipe
                                </InputLabel>
                                <Select
                                    ref={tipeRef}
                                    name="tipe"
                                    value={data.tipe}
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
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama}
                                            </MenuItem>
                                        ))}
                                </Select>
                                {errors.tipe && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.tipe}
                                        </Typography>
                                    </>
                                )}

                                <InputLabel className="flex items-center">
                                    Kode
                                </InputLabel>
                                <TextInput
                                    value={data.kode}
                                    onChange={(e) =>
                                        setData("kode", e.target.value)
                                    }
                                />
                                {errors.kode && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.kode}
                                        </Typography>
                                    </>
                                )}

                                <InputLabel className="flex items-center">
                                    Nama
                                </InputLabel>
                                <TextInput
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />
                                {errors.nama && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.nama}
                                        </Typography>
                                    </>
                                )}

                                <InputLabel className="flex items-center">
                                    Satuan
                                </InputLabel>
                                <Select
                                    ref={satuanRef}
                                    value={data.satuan}
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
                                {errors.satuan && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.satuan}
                                        </Typography>
                                    </>
                                )}

                                <InputLabel className="flex items-center">
                                    Harga
                                </InputLabel>
                                <TextInput
                                    type="text"
                                    inputMode="numeric"
                                    min={0}
                                    value={data.harga}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        );
                                        setData("harga", Number(val));
                                    }}
                                />
                                {errors.harga && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.harga}
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </Card>
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        className="ms-4"
                        disabled={processing}
                    >
                        Simpan
                    </Button>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
