import { PDFViewer } from "@react-pdf/renderer";
import InvoiceDocument from "./Invoice/InvoiceDocument";

const KwitansiPreviewPage = () => {
    return (
        <div style={{ height: "100vh" }}>
            <PDFViewer width="100%" height="100%">
                <InvoiceDocument />
            </PDFViewer>
        </div>
    );
};

export default KwitansiPreviewPage;
