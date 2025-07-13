import Container from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Card, Divider, Typography } from "@mui/material";
import JasaEstimate from "./Component/JasaEstimate";
import { Head, useForm, usePage } from "@inertiajs/react";
import SparepartEstimate from "./Component/SparepartEstimate";
import AccordionDetail from "./Component/AccordionDetail";
import TextInput from "@/Components/TextInput";
import { useEffect } from "react";

export default function Create() {
    const { pendaftaran, jasa, sparepart } = usePage().props;
    console.log(pendaftaran);
    const { data, setData, post, processing, reset, errors } = useForm({
        jasa: [{ id: "", jumlah: "", diskon: "" }],
        sparepart: [{ id: "", jumlah: "", diskon: "" }],
        diskon_jasa: pendaftaran?.estimasi?.diskon_jasa || 0,
        diskon_sparepart: pendaftaran?.estimasi?.diskon_sparepart || 0,
        nilai_or:
            pendaftaran.penanggung.nama == "Pribadi"
                ? 0
                : pendaftaran?.estimasi?.nilai_or,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            diskon_jasa: pendaftaran?.estimasi?.diskon_jasa || 0,
            diskon_sparepart: pendaftaran?.estimasi?.diskon_sparepart || 0,
            nilai_or:
                pendaftaran.penanggung.nama == "Pribadi"
                    ? 0
                    : pendaftaran?.estimasi?.nilai_or,
        }));
    }, [pendaftaran]);

    const jasaTotal = data.jasa.reduce((sum, item) => {
        const harga = parseFloat(item.harga || 0);
        const jumlah = parseInt(item.jumlah || 0);
        const diskon = parseFloat(item.diskon || 0);
        return sum + harga * jumlah * (1 - diskon / 100);
    }, 0);
    const sparepartTotal = data.sparepart.reduce((sum, item) => {
        const harga = parseFloat(item.harga || 0);
        const jumlah = parseInt(item.jumlah || 0);
        const diskon = parseFloat(item.diskon || 0);
        return sum + harga * jumlah * (1 - diskon / 100);
    }, 0);
    console.log(jasaTotal);
    console.log(sparepartTotal);
    const grandTotal =
        jasaTotal +
        sparepartTotal -
        data.diskon_jasa -
        data.diskon_sparepart -
        data.nilai_or;

    const submit = (e) => {
        e.preventDefault();
        post(route("estimasi.store", pendaftaran.id), {
            onSuccess: () => {
                alert("Data berhasil disimpan!");
                reset();
            },
            onError: (errors) => {
                console.error("Terjadi kesalahan:", errors);
                alert(`Gagal menyimpan data. ${errors.jasa}`);
            },
            onFinish: () => {
                console.log("Request selesai.");
            },
        });
    };

    console.log(data);
    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-5">
                    <Button
                        variant="contained"
                        size="small"
                        href={route("pendaftaran.edit", pendaftaran.id)}
                    >
                        Kembali
                    </Button>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Estimasi
                    </h2>
                </div>
            }
        >
            <Head title="Estimasi" />
            <Container className="py-5">
                <form onSubmit={submit}>
                    <AccordionDetail pendaftaran={pendaftaran} />

                    <Card className="mt-5 p-4">
                        <JasaEstimate
                            jasa={jasa}
                            defaultRows={pendaftaran?.estimasi?.estimasi_jasas}
                            onChangeRows={(rows) => setData("jasa", rows)}
                        />

                        <br className="mt-5" />
                        <SparepartEstimate
                            sparepart={sparepart}
                            defaultRows={
                                pendaftaran?.estimasi?.estimasi_spareparts
                            }
                            onChangeRows={(rows) => setData("sparepart", rows)}
                        />
                        <Divider sx={{ my: 2 }} />
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_200px] gap-y-1 w-full sm:w-[350px] self-start">
                            <InputLabel className="flex items-center">
                                Diskon Jasa Lainnya
                            </InputLabel>
                            <TextInput
                                name="diskon_jasa"
                                type="text"
                                inputMode="numeric"
                                min={0}
                                value={data.diskon_jasa}
                                onChange={(e) => {
                                    const val = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                    setData("diskon_jasa", Number(val));
                                }}
                            />
                            <InputLabel className="flex items-center">
                                Diskon Sparepart Lainnya
                            </InputLabel>
                            <TextInput
                                name="diskon_sparepart"
                                type="text"
                                inputMode="numeric"
                                min={0}
                                value={data.diskon_sparepart}
                                onChange={(e) => {
                                    const val = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                    setData("diskon_sparepart", Number(val));
                                }}
                            />
                            {pendaftaran.penanggung.nama != "Pribadi" && (
                                <>
                                    <InputLabel className="flex items-center">
                                        Nilai OR
                                    </InputLabel>
                                    <TextInput
                                        name="nilai_or"
                                        type="text"
                                        inputMode="numeric"
                                        min={0}
                                        value={data.nilai_or}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                            );
                                            setData("nilai_or", Number(val));
                                        }}
                                    />
                                </>
                            )}
                        </div>

                        <Typography variant="h6">
                            Grand Total: Rp {grandTotal.toLocaleString("id-ID")}
                        </Typography>
                        <div className="flex gap-5">
                            <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                // className="ms-4"
                                disabled={processing}
                            >
                                Simpan
                            </Button>
                            {pendaftaran.estimasi && (
                                <Button
                                    href={route(
                                        "estimasi.invoice.show",
                                        pendaftaran.id
                                    )}
                                    size="small"
                                    variant="contained"
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Cetak Invoice
                                </Button>
                            )}
                        </div>
                    </Card>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
