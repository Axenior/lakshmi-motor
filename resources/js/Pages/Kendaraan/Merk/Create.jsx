import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Card, Typography } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Create() {
    const { data, setData, post, processing, reset, errors } = useForm({
        merk: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("kendaraan.merk.store"), {
            onSuccess: () => {
                alert("Data berhasil disimpan!");
                reset();
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
                        Tambah Merk Kendaraan
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Merk Kendaraan" />

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

                            {/* Tampilkan pesan error jika ada */}
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
                        Simpan
                    </Button>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
