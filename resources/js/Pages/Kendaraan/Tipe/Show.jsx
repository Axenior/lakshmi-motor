import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useRef } from "react";

export default function Create() {
    const { merk, tipe } = usePage().props;
    const merkRef = useRef(null);

    const { delete: destroy, reset } = useForm();
    const deleting = (e) => {
        e.preventDefault();

        destroy(route("kendaraan.tipe.destroy", tipe.id), {
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
                        Detail Tipe Kendaraan
                    </h2>
                </div>
            }
        >
            <Head title="Detail Tipe Kendaraan" />

            <Container className="py-5">
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        href={route("kendaraan.tipe.edit", tipe.id)}
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
                <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:max-w-max mb-2">
                    <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] w-full gap-1 sm:w-[350px] self-start">
                        <InputLabel className="flex items-center">
                            Merk
                        </InputLabel>

                        <Select
                            ref={merkRef}
                            name="merk"
                            value={tipe.merk_id}
                            readOnly
                            onChange={(e) => setData("merk", e.target.value)}
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

                        <TextInput
                            name="tipe"
                            value={tipe.nama}
                            onChange={(e) => setData("tipe", e.target.value)}
                            readOnly
                        />
                    </div>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
