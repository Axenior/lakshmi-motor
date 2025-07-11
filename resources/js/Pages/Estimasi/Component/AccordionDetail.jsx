import InputLabel from "@/Components/InputLabel";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

export default function AccordionDetail({ pendaftaran }) {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Detail</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 my-1">
                        <div className="grid grid-cols-2 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                            <InputLabel className="flex items-center">
                                ID Pendaftaran
                            </InputLabel>
                            <InputLabel className="flex items-center">
                                {String(pendaftaran.id).padStart(6, "0")}
                            </InputLabel>

                            <InputLabel className="flex items-center">
                                Tanggal
                            </InputLabel>
                            <InputLabel className="flex items-center">
                                {new Date(
                                    pendaftaran.tanggal_pendaftaran
                                ).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </InputLabel>

                            <InputLabel className="flex items-center">
                                Penanggung
                            </InputLabel>
                            <InputLabel className="flex items-center">
                                {pendaftaran.penanggung.nama}
                            </InputLabel>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                            <div className="col-span-2">
                                <InputLabel className="text-lg font-bold mb-1">
                                    Data Pelanggan
                                </InputLabel>

                                <div className="w-full border border-gray-300 rounded">
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            No Polisi
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.no_polisi}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Nama
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.nama}
                                        </InputLabel>
                                    </div>
                                    <div className="flex">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Alamat
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.alamat}
                                        </InputLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                            <div className="col-span-2">
                                <InputLabel className="text-lg font-bold mb-1">
                                    Data Kendaraan
                                </InputLabel>

                                <div className="w-full border border-gray-300 rounded">
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Merk
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.tipe.merk.nama}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Tipe
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.tipe.nama}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            No Rangka
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.no_rangka}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Tahun
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.tahun}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Jenis
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.jenis}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            warna
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.warna}
                                        </InputLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    );
}
