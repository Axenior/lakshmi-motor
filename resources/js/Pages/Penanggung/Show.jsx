import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Alert, Button, Card, MenuItem, Select } from "@mui/material";
import { useRef } from "react";

export default function Show() {
    const { penanggung } = usePage().props;
    console.log(usePage().props);
    const penanggungRef = useRef(null);

    const { delete: destroy, reset } = useForm();
    const deleting = (e) => {
        e.preventDefault();

        destroy(route("penanggung.destroy", penanggung.id), {
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
                        href={route("penanggung.index")}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Penanggung
                    </h2>
                </div>
            }
        >
            <Head title="Detail Penanggung" />

            <Container className="py-5">
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        href={route("penanggung.edit", penanggung.id)}
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

                <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:w-fit">
                    <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                        <InputLabel className="flex items-center">
                            Nama
                        </InputLabel>
                        <TextInput
                            value={penanggung.nama || ""}
                            onChange={(e) => setData("nama", e.target.value)}
                            readOnly
                        />

                        <InputLabel className="flex items-center">
                            Alamat
                        </InputLabel>
                        <TextAreaInput
                            value={penanggung.alamat || ""}
                            onChange={(e) => setData("alamat", e.target.value)}
                            readOnly
                        />

                        <InputLabel className="flex items-center">
                            No Telepon
                        </InputLabel>
                        <TextInput
                            value={penanggung.no_telepon || ""}
                            onChange={(e) => {
                                const val = e.target.value.replace(
                                    /[^0-9- ]/g,
                                    ""
                                );
                                setData("no_telepon", val);
                            }}
                            readOnly
                        />

                        <InputLabel className="flex items-center">
                            No Fax
                        </InputLabel>
                        <TextInput
                            value={penanggung.no_fax || ""}
                            onChange={(e) => setData("no_fax", e.target.value)}
                            readOnly
                        />

                        {/* <InputLabel className="flex items-center">
                            Pph
                        </InputLabel>
                        <div className="flex gap-2 items-center ">
                            <TextInput
                                type="text"
                                inputMode="numeric"
                                className="w-[52px]"
                                min={0}
                                value={penanggung.pph}
                                onChange={(e) => {
                                    const val = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                    setData("pph", Number(val));
                                }}
                                readOnly
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
                                value={penanggung.ppn}
                                onChange={(e) => {
                                    const val = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                    setData("ppn", Number(val));
                                }}
                                readOnly
                            />
                            <span>%</span>
                        </div>

                        <InputLabel className="flex items-center">
                            Jenis Penanggung
                        </InputLabel>
                        <Select
                            ref={penanggungRef}
                            // value={penanggung.jenis_penanggung}
                            value={
                                penanggung.jenis_penanggung ||
                                (jenis.length > 0 ? jenis[0].id : "")
                            }
                            onChange={(e) =>
                                setData("jenis_penanggung", e.target.value)
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
                            readOnly
                        >
                            {jenis &&
                                jenis.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.nama}
                                    </MenuItem>
                                ))}
                        </Select> */}
                    </div>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
