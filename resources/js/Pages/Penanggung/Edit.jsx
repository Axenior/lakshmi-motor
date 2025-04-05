import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Show() {
    const { penanggung } = usePage().props;
    console.log(usePage().props);
    const penanggungRef = useRef(null);

    const jenis = [
        { id: "1", nama: "Pribadi" },
        { id: "2", nama: "PT. Ajinomoto" },
    ];

    const { data, setData, put, processing, errors, reset } = useForm({
        nama: "",
        alamat: "",
        no_telepon: "",
        no_fax: "",
        pph: 0,
        ppn: 0,
        jenis_penanggung: "1",
    });

    useEffect(() => {
        setData("nama", penanggung.nama);
        setData("alamat", penanggung.alamat);
        setData("no_telepon", penanggung.no_telepon);
        setData("no_fax", penanggung.no_fax);
        setData("pph", penanggung.pph);
        setData("ppn", penanggung.ppn);
    }, [penanggung]);

    const submit = (e) => {
        e.preventDefault();

        put(route("penanggung.update", penanggung.id), {
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
                        onClick={() => window.history.back()}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Penanggung
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
                                    Nama
                                </InputLabel>
                                <TextInput
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />

                                <InputLabel className="flex items-center">
                                    Alamat
                                </InputLabel>
                                <TextAreaInput
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                />

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

                                <InputLabel className="flex items-center">
                                    No Fax
                                </InputLabel>
                                <TextInput
                                    value={data.no_fax}
                                    onChange={(e) =>
                                        setData("no_fax", e.target.value)
                                    }
                                />

                                <InputLabel className="flex items-center">
                                    Pph
                                </InputLabel>
                                <div className="flex gap-2 items-center ">
                                    <TextInput
                                        type="text"
                                        inputMode="numeric"
                                        className="w-[52px]"
                                        min={0}
                                        value={data.pph}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                            );
                                            setData("pph", Number(val));
                                        }}
                                    />
                                    <span>%</span>
                                </div>

                                <InputLabel className="flex items-center">
                                    PPN
                                </InputLabel>
                                <div className="flex gap-2 items-center ">
                                    <TextInput
                                        type="text"
                                        inputMode="numeric"
                                        className="w-[52px]"
                                        min={0}
                                        value={data.ppn}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                            );
                                            setData("ppn", Number(val));
                                        }}
                                    />
                                    <span>%</span>
                                </div>

                                <InputLabel className="flex items-center">
                                    Jenis Penanggung
                                </InputLabel>
                                <Select
                                    ref={penanggungRef}
                                    // value={data.jenis_penanggung}
                                    value={
                                        data.jenis_penanggung ||
                                        (jenis.length > 0 ? jenis[0].id : "")
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "jenis_penanggung",
                                            e.target.value
                                        )
                                    }
                                    className="h-8"
                                    onClose={() => {
                                        penanggungRef.current.classList.remove(
                                            "Mui-focused"
                                        );
                                        penanggungRef.current.previousSibling?.classList.remove(
                                            "Mui-focused"
                                        );
                                    }}
                                    onOpen={() => {
                                        penanggungRef.current.classList?.add(
                                            "Mui-focused"
                                        );
                                        penanggungRef.current.previousSibling?.classList.add(
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
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama}
                                            </MenuItem>
                                        ))}
                                </Select>
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
