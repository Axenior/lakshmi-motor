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
                                No Transaksi
                            </InputLabel>
                            <InputLabel className="flex items-center">
                                123123123
                            </InputLabel>

                            <InputLabel className="flex items-center">
                                Tanggal
                            </InputLabel>
                            <InputLabel className="flex items-center">
                                09/09/2004
                            </InputLabel>

                            <InputLabel className="flex items-center">
                                Penanggung
                            </InputLabel>
                            <InputLabel className="flex items-center">
                                {pendaftaran.penanggung.nama}
                            </InputLabel>

                            <InputLabel className="flex items-center">
                                Kelompok
                            </InputLabel>
                            <InputLabel className="flex items-center">
                                xxxxxx
                            </InputLabel>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                            <InputLabel className="flex items-center">
                                ID Pendaftaran
                            </InputLabel>
                            <InputLabel className="flex items-center">
                                {String(pendaftaran.id).padStart(6, "0")}
                            </InputLabel>

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
                                            {pendaftaran.kendaraan.no_polisi}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Nama
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.pelanggan.nama}
                                        </InputLabel>
                                    </div>
                                    <div className="flex">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Alamat
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.pelanggan.alamat}
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
                                            {
                                                pendaftaran.kendaraan.tipe.merk
                                                    .nama
                                            }
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Tipe
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.kendaraan.tipe.nama}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            No Rangka
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.kendaraan.no_rangka}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Tahun
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.kendaraan.tahun}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            Jenis
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.kendaraan.jenis}
                                        </InputLabel>
                                    </div>
                                    <div className="flex border-b">
                                        <InputLabel className="w-2/5 px-4 py-1 font-semibold">
                                            warna
                                        </InputLabel>
                                        <InputLabel className="w-3/5 px-4 py-1">
                                            {pendaftaran.kendaraan.warna}
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
