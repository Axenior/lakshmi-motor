import Container from "@/Components/Container";
import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Edit() {
    const { jasa } = usePage().props;

    const { data, setData, put, processing, errors, reset } = useForm({
        nama: jasa.nama || "",
        harga: jasa.harga || "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("jasa.update", jasa.id), {
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
                        href={route("jasa.show", jasa.id)}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit jasa
                    </h2>
                </div>
            }
        >
            <Head title="Edit jasa" />

            <Container>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1">
                        <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:w-fit">
                            <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
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
