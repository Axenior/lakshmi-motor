import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select, Typography } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useRef } from "react";

export default function Create() {
    const { merk } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        merk: "",
        tipe: "",
    });

    const merkRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        post(route("kendaraan.tipe.store"), {
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

    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-5">
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => window.history.back()}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tambah Tipe Kendaraan
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Tipe Kendaraan" />

            <Container className="py-5">
                <form onSubmit={submit}>
                    <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:max-w-max mb-2">
                        <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] w-full gap-1 sm:w-[350px] self-start">
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
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.nama}
                                        </MenuItem>
                                    ))}
                            </Select>
                            {/* Error handling for merk */}
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

                            <TextInput
                                name="tipe"
                                value={data.tipe}
                                onChange={(e) =>
                                    setData("tipe", e.target.value)
                                }
                            />
                            {/* Error handling for tipe */}
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
                        </div>
                    </Card>
                    <Button
                        type="submit"
                        size="small"
                        variant="contained"
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
