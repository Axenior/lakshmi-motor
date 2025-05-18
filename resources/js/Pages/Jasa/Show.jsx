import Container from "@/Components/Container";
import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select, Typography } from "@mui/material";
import { useRef } from "react";

export default function Show() {
    const { penanggung, jasa } = usePage().props;

    const { delete: destroy, reset } = useForm();
    const deleting = (e) => {
        e.preventDefault();

        destroy(route("jasa.destroy", jasa.id), {
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
                        href={route("jasa.index")}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail jasa
                    </h2>
                </div>
            }
        >
            <Head title="Detail Pendaftaran" />

            <Container className="py-5">
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        href={route("jasa.edit", jasa.id)}
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
                <div className="grid grid-cols-1">
                    <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1 sm:w-fit">
                        <div className="grid grid-cols-1 sm:grid-cols-[130px_350px] gap-1 w-full sm:w-[485px] self-start">
                            <InputLabel className="flex items-center">
                                Penanggung
                            </InputLabel>
                            <CustomSelect
                                name={"penanggung"}
                                value={jasa.penanggung_id}
                                onChange={(val) => setData("penanggung", val)}
                                options={penanggung}
                                readOnly={true}
                            />

                            <InputLabel className="flex items-center">
                                Nama
                            </InputLabel>
                            <TextInput
                                readOnly
                                value={jasa.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />

                            <InputLabel className="flex items-center">
                                Harga
                            </InputLabel>
                            <TextInput
                                readOnly
                                type="text"
                                inputMode="numeric"
                                min={0}
                                value={jasa.harga}
                                onChange={(e) => {
                                    const val = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                    setData("harga", Number(val));
                                }}
                            />
                        </div>
                    </Card>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
