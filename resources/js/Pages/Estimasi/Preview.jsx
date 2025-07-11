import { PDFViewer } from "@react-pdf/renderer";
import InvoiceDocument from "./Component/InvoiceDocument";
import { Head, usePage } from "@inertiajs/react";

const Preview = () => {
    const { pendaftaran } = usePage().props;
    // const data = {
    //     pendaftaran: pendaftaran,
    //     estimasi: pendaftaran.estimasi,
    // };
    // console.log(data);

    return (
        <div style={{ height: "100vh" }}>
            <Head title="Surat Estimasi" />
            <PDFViewer width="100%" height="100%">
                <InvoiceDocument data={pendaftaran} />
            </PDFViewer>
        </div>
    );
};

export default Preview;
