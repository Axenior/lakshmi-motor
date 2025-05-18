import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card, MenuItem, Select } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CustomSelect from "@/Components/CustomSelect";

export default function Create() {
    const { merk, tipe } = usePage().props;

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
                        href={route("kendaraan.tipe.index")}
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

                        <CustomSelect
                            name={"merk"}
                            value={tipe.merk_id}
                            onChange={(val) => setData("merk", val)}
                            options={merk}
                            readOnly={true}
                        />

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
