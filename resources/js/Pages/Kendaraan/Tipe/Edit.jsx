import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select, Typography } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useEffect, useRef, useState } from "react";
import CustomSelect from "@/Components/CustomSelect";

export default function Create() {
    const { merk, tipe } = usePage().props;

    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        merk: tipe.merk_id || "",
        tipe: tipe.nama || "",
    });

    const merkRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        put(route("kendaraan.tipe.update", tipe.id), {
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
                        href={route("kendaraan.tipe.show", tipe.id)}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Tipe Kendaraan
                    </h2>
                </div>
            }
        >
            <Head title="Edit Tipe Kendaraan" />

            <Container className="py-5">
                <form onSubmit={submit}>
                    <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:max-w-max mb-2">
                        <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] w-full gap-1 sm:w-[350px] self-start">
                            <InputLabel className="flex items-center">
                                Merk
                            </InputLabel>

                            <CustomSelect
                                name={"merk"}
                                value={data.merk}
                                onChange={(val) => setData("merk", val)}
                                options={merk}
                            />

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
                            {errors?.tipe && (
                                <>
                                    <span></span>
                                    <Typography
                                        variant="caption"
                                        color="error"
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
                        Update
                    </Button>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
