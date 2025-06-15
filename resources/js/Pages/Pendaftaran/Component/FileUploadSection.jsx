import FileUpload from "@/Components/FileUpload";
import InputLabel from "@/Components/InputLabel";
import DownloadAllFile from "./DownloadAllFile";

// Komponen untuk upload file (STNK & KTP) dengan dukungan multi file
export default function FileUploadSection({
    stnkFiles,
    setStnkFiles,
    kerusakanFiles,
    setKerusakanFiles,
    gesekRangkaFiles,
    setGesekRangkaFiles,
    suratPengantarFiles,
    setSuratPengantarFiles,
    isDisabled = false,
}) {
    return (
        <div className="m-2 grid grid-cols-2">
            <div className="sm:text-right">
                <InputLabel className="mb-2">Foto STNK</InputLabel>
                <FileUpload
                    label="STNK"
                    selectedFiles={stnkFiles}
                    setSelectedFiles={setStnkFiles}
                    isDisabled={isDisabled}
                />
                <InputLabel className="mb-2">Gesek Rangka</InputLabel>
                <FileUpload
                    label="Gesek Rangka"
                    selectedFiles={gesekRangkaFiles}
                    setSelectedFiles={setGesekRangkaFiles}
                    isDisabled={isDisabled}
                />
            </div>
            <div className="sm:text-right">
                <InputLabel className="mb-2">Foto Kerusakan</InputLabel>
                <FileUpload
                    label="Kerusakan"
                    selectedFiles={kerusakanFiles}
                    setSelectedFiles={setKerusakanFiles}
                    isDisabled={isDisabled}
                />
                <InputLabel className="mb-2">Surat Pengantar</InputLabel>
                <FileUpload
                    label="Surat Pengantar"
                    selectedFiles={suratPengantarFiles}
                    setSelectedFiles={setSuratPengantarFiles}
                    isDisabled={isDisabled}
                    allowedType="pdf"
                />
            </div>
        </div>
    );
}
