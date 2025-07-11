import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Create({ user }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: "********",
        role: user.role,
        isActive: Boolean(user.isActive),
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("user.update", user.id), {
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
                        href={route("user.index")}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Pengguna
                    </h2>
                </div>
            }
        >
            <Head title="Detail Pengguna" />

            <Container>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1">
                        <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:w-fit">
                            <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                                <InputLabel className="flex items-center">
                                    Nama
                                </InputLabel>
                                <TextInput
                                    readOnly
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputLabel className="flex items-center">
                                    Email
                                </InputLabel>
                                <TextInput
                                    readOnly
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputLabel className="flex items-center">
                                    Role
                                </InputLabel>
                                <TextInput
                                    readOnly
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                />

                                <InputLabel className="flex items-center">
                                    Password
                                </InputLabel>
                                <TextInput
                                    readOnly
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                        </Card>
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="warning"
                        size="small"
                        className="ms-4"
                        readOnly={processing}
                    >
                        {data.isActive ? "Nonaktifkan" : "Aktifkan"}
                    </Button>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
