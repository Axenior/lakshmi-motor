import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button, Card } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Show() {
    const { merk } = usePage().props;
    const { delete: destroy, reset } = useForm();

    const deleting = (e) => {
        e.preventDefault();

        destroy(route("kendaraan.merk.destroy", merk.id), {
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
                        href={route("kendaraan.merk.index")}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Merk Kendaraan
                    </h2>
                </div>
            }
        >
            <Head title="Detail Merk Kendaraan" />

            <Container className="py-5">
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        href={route("kendaraan.merk.edit", merk.id)}
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
                            Nama Merk
                        </InputLabel>

                        <TextInput
                            name="merk"
                            value={merk.nama}
                            onChange={(e) => setData("merk", e.target.value)}
                            readOnly
                        />
                    </div>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
