import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Card, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Create() {
    const penanggungRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        alamat: "",
        no_telepon: "",
        no_fax: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("penanggung.store"), {
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
                        href={route("penanggung.index")}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tambah Penanggung
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Penanggung" />

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
                                    Alamat
                                </InputLabel>
                                <TextAreaInput
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                />
                                {errors.alamat && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.alamat}
                                        </Typography>
                                    </>
                                )}

                                <InputLabel className="flex items-center">
                                    No Telepon
                                </InputLabel>
                                <TextInput
                                    value={data.no_telepon}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(
                                            /[^0-9- ]/g,
                                            ""
                                        );
                                        setData("no_telepon", val);
                                    }}
                                />
                                {errors.no_telepon && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.no_telepon}
                                        </Typography>
                                    </>
                                )}

                                <InputLabel className="flex items-center">
                                    No Fax
                                </InputLabel>
                                <TextInput
                                    value={data.no_fax}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(
                                            /[^0-9- ]/g,
                                            ""
                                        );
                                        setData("no_fax", val);
                                    }}
                                />
                                {errors.no_fax && (
                                    <>
                                        <span></span>
                                        <Typography
                                            color="error"
                                            variant="caption"
                                            className="mt-1"
                                        >
                                            {errors.no_fax}
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
