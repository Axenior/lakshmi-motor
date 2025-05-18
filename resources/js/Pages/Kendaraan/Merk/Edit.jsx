import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, Typography } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useEffect } from "react";

export default function Edit() {
    const { merk } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        merk: merk.nama || "", // Pastikan nilai awal dari merk yang diterima
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("kendaraan.merk.update", merk.id), {
            preserveScroll: true,
            preserveState: true, // Pastikan form tidak reset saat error
            onSuccess: () => {
                alert("Data berhasil disimpan!");
            },
            onError: (errors) => {
                console.error("Terjadi kesalahan:", errors);
                alert("Gagal menyimpan data. Periksa kembali input Anda.");
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
                        href={route("kendaraan.merk.show", merk.id)}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Merk Kendaraan
                    </h2>
                </div>
            }
        >
            <Head title="Edit Merk Kendaraan" />

            <Container className="py-5">
                <form onSubmit={submit}>
                    <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:max-w-max mb-2">
                        <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] w-full gap-1 sm:w-[350px] self-start">
                            <InputLabel className="flex items-center">
                                Nama Merk
                            </InputLabel>

                            <TextInput
                                name="merk"
                                value={data.merk}
                                onChange={(e) =>
                                    setData("merk", e.target.value)
                                }
                            />

                            {/* Menampilkan error jika ada */}
                            {errors?.merk && (
                                <>
                                    <span></span>
                                    <Typography
                                        variant="caption"
                                        color="error"
                                        className="mt-1"
                                    >
                                        {errors.merk}
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
                        Update
                    </Button>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
