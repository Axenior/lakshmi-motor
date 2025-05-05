import { Button, IconButton } from "@mui/material";
import { useEffect, useState, useId } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const FileUpload = ({
    label,
    selectedFiles,
    setSelectedFiles,
    isDisabled = false,
    allowedType = "gambar",
}) => {
    const [previews, setPreviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);
    const inputId = useId();
    const [inputKey, setInputKey] = useState(Date.now());

    useEffect(() => {
        if (!selectedFiles || selectedFiles.length === 0) {
            setPreviews([]);
            return;
        }

        const objectUrls = selectedFiles.map((file) =>
            URL.createObjectURL(file)
        );
        setPreviews(objectUrls);

        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [selectedFiles]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        }
    };

    const removeFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setInputKey(Date.now());
    };

    return (
        <div className="my-2">
            <Button
                size="small"
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 "
            >
                Pilih {allowedType}
            </Button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white w-[90%] h-[90%] flex flex-col p-6 overflow-auto rounded-lg">
                        <IconButton
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2"
                            sx={{ position: "absolute" }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Upload {label}
                        </h2>

                        <div className="flex flex-col items-center">
                            <Button
                                disabled={isDisabled}
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                className="mb-4"
                            >
                                Tambah File
                                <VisuallyHiddenInput
                                    key={inputKey}
                                    type="file"
                                    accept={
                                        allowedType == "gambar"
                                            ? "image/*"
                                            : allowedType == "pdf"
                                            ? "application/pdf"
                                            : ""
                                    }
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <p className="text-sm text-gray-500 text-center">
                                Pilih satu atau beberapa File untuk menambah ke
                                daftar.
                            </p>
                        </div>

                        {selectedFiles?.length > 0 && (
                            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {selectedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center border p-2 rounded-lg"
                                    >
                                        {file.type === "application/pdf" ? (
                                            <div
                                                className="w-full h-48 flex flex-col justify-center items-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition"
                                                onClick={() => {
                                                    const fileURL =
                                                        URL.createObjectURL(
                                                            file
                                                        );
                                                    window.open(
                                                        fileURL,
                                                        "_blank",
                                                        "noopener,noreferrer"
                                                    );
                                                }}
                                            >
                                                <p className="text-sm text-center text-gray-700 font-medium">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    (Klik untuk membuka PDF)
                                                </p>
                                            </div>
                                        ) : (
                                            <img
                                                src={previews[index]}
                                                alt={`Preview ${index}`}
                                                className="w-full h-48 object-cover rounded-md shadow-sm cursor-pointer"
                                                onClick={() =>
                                                    setZoomedImage(
                                                        previews[index]
                                                    )
                                                }
                                            />
                                        )}

                                        <div className="mt-2 flex gap-2">
                                            <Button
                                                disabled={isDisabled}
                                                variant="contained"
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                            >
                                                Hapus
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                component="a"
                                                href={
                                                    file.type.startsWith(
                                                        "gambar/"
                                                    )
                                                        ? previews[index]
                                                        : URL.createObjectURL(
                                                              file
                                                          )
                                                }
                                                download={
                                                    file.name || "download"
                                                }
                                            >
                                                Unduh
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {zoomedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[9999]"
                    onClick={() => setZoomedImage(null)}
                >
                    <div className="relative">
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setZoomedImage(null);
                            }}
                            className="!absolute top-2 right-2"
                        >
                            <CloseIcon sx={{ color: "white" }} />
                        </IconButton>
                        <img
                            src={zoomedImage}
                            alt="Zoomed Preview"
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
