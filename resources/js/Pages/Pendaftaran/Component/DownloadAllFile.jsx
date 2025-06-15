import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

async function downloadAllFilesAsZip(pendaftaran) {
    const zip = new JSZip();
    const fileFields = [
        "file_stnks",
        "file_kerusakans",
        "file_gesek_rangkas",
        "file_surat_pengantars",
        // "file_spks",
        // "file_epoxys",
    ];

    let hasFiles = false;

    for (const field of fileFields) {
        const filesData = pendaftaran[field];

        if (Array.isArray(filesData) && filesData.length > 0) {
            hasFiles = true;

            for (const fileObj of filesData) {
                const filePath = "/storage/" + fileObj.path;
                const fileName = fileObj.path.split("/").pop();

                try {
                    const response = await fetch(filePath);
                    const blob = await response.blob();
                    zip.file(fileName, blob);
                } catch (error) {
                    console.error(`Gagal mengunduh file ${fileName}:`, error);
                }
            }
        }
    }

    if (!hasFiles) {
        alert("Belum ada file yang tersedia untuk diunduh.");
        return;
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(
            content,
            `pendaftaran-${String(pendaftaran.id).padStart(6, "0")}.zip`
        );
    });
}

export default function DownloadAllFile({ pendaftaran }) {
    return (
        <Button
            variant="contained"
            size="small"
            onClick={() => downloadAllFilesAsZip(pendaftaran)}
        >
            Unduh Semua File
        </Button>
    );
}
