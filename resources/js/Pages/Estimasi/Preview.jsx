import { PDFViewer } from "@react-pdf/renderer";
import InvoiceDocument from "./Component/InvoiceDocument";
import { usePage } from "@inertiajs/react";

const Preview = () => {
    const { pendaftaran } = usePage().props;
    const data = {
        penanggung: pendaftaran.penanggung,
        kendaraan: {
            tipe: pendaftaran.kendaraan.tipe.nama,
            merk: pendaftaran.kendaraan.tipe.merk.nama,
            no_polisi: pendaftaran.kendaraan.no_polisi,
        },
        estimasi: pendaftaran.estimasi,
    };
    console.log(data);

    return (
        <div style={{ height: "100vh" }}>
            <PDFViewer width="100%" height="100%">
                <InvoiceDocument data={data} />
            </PDFViewer>
        </div>
    );
};

export default Preview;
