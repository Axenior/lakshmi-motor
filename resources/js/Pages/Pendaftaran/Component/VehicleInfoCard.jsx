import InputLabel from "@/Components/InputLabel";
import PlateInput from "@/Components/PlateInput";
import TextInput from "@/Components/TextInput";
import { Card, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

// Komponen untuk data kendaraan dan nomor polisi
export default function VehicleInfoCard({
    data,
    setData,
    plate,
    setPlate,
    fetchKendaraan,
    errors = {},
    isReadOnly = false,
}) {
    const [merk, setMerk] = useState(null);
    const [tipe, setTipe] = useState(null);

    const fetchMerk = async () => {
        try {
            const response = await axios.get(route("api.merk"));
            // console.log(response);
            setMerk(response.data);
        } catch (error) {
            console.error("Gagal mengambil data merk kendaraan", error);
        }
    };

    const fetchTipe = async () => {
        try {
            console.log(data.merk);
            const response = await axios.get(
                route("api.tipe", { merk: data.merk })
            );

            // console.log(response);

            setTipe(response.data);
        } catch (error) {
            console.error("Gagal mengambil data merk kendaraan", error);
        }
    };

    useEffect(() => {
        fetchMerk();
    }, []);

    useEffect(() => {
        if (data.merk) fetchTipe();
        // setData("tipe", "");
    }, [data.merk]);

    const handleDefaultChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const merkRef = useRef(null);
    const tipeRef = useRef(null);

    return (
        <>
            <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1">
                <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                    <InputLabel className="flex items-center">
                        No Polisi
                    </InputLabel>
                    <PlateInput
                        plate={plate}
                        setPlate={setPlate}
                        isReadOnly={isReadOnly}
                    />
                    {(errors?.no_polisi ||
                        errors?.plate_prefix ||
                        errors?.plate_number ||
                        errors?.plate_suffix) && (
                        <>
                            <span></span>
                            <Typography
                                variant="caption"
                                color="error"
                                className="mt-1"
                            >
                                The no polisi field is required.
                            </Typography>
                        </>
                    )}

                    <InputLabel className="flex items-center">
                        No Rangka
                    </InputLabel>
                    <TextInput
                        readOnly={isReadOnly}
                        name="no_rangka"
                        value={data.no_rangka}
                        onChange={handleDefaultChange}
                        onBlur={fetchKendaraan}
                    />
                    {errors?.no_rangka && (
                        <>
                            <span></span>
                            <Typography
                                variant="caption"
                                color="error"
                                className="mt-1"
                            >
                                {errors.no_rangka}
                            </Typography>
                        </>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] mt-3 sm:mt-0 self-start">
                    <h5 className="text-lg font-bold mb-1 sm:col-span-2">
                        Data Kendaraan
                    </h5>
                    <InputLabel className="flex items-center">
                        No Mesin
                    </InputLabel>
                    <TextInput
                        readOnly={isReadOnly}
                        name="no_mesin"
                        value={data.no_mesin}
                        onChange={handleDefaultChange}
                    />
                    {errors?.no_mesin && (
                        <>
                            <span></span>
                            <Typography
                                variant="caption"
                                color="error"
                                className="mt-1"
                            >
                                {errors.no_mesin}
                            </Typography>
                        </>
                    )}

                    <InputLabel className="flex items-center">Merk</InputLabel>
                    <Select
                        readOnly={isReadOnly}
                        ref={merkRef}
                        name="merk"
                        value={data.merk}
                        onChange={(e) => {
                            handleDefaultChange(e);
                        }}
                        className="h-8"
                        onClose={() => {
                            merkRef.current.classList.remove("Mui-focused");
                            merkRef.current.previousSibling?.classList.remove(
                                "Mui-focused"
                            );
                        }}
                        onOpen={() => {
                            merkRef.current.classList.add("Mui-focused");
                            merkRef.current.previousSibling?.classList.add(
                                "Mui-focused"
                            );
                        }}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                                borderRadius: "0.375rem",
                            },
                        }}
                    >
                        {merk &&
                            merk.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.nama}
                                </MenuItem>
                            ))}
                    </Select>
                    {errors?.merk && (
                        <>
                            <span></span>
                            <Typography
                                variant="caption"
                                color="error"
                                className="mt-1"
                            >
                                {errors.merk}
                            </Typography>
                        </>
                    )}

                    <InputLabel className="flex items-center">Tipe</InputLabel>
                    <Select
                        readOnly={isReadOnly}
                        ref={tipeRef}
                        name="tipe"
                        value={data.tipe}
                        onChange={(e) => {
                            handleDefaultChange(e);
                        }}
                        className="h-8"
                        onClose={() => {
                            tipeRef.current.classList.remove("Mui-focused");
                            tipeRef.current.previousSibling?.classList.remove(
                                "Mui-focused"
                            );
                        }}
                        onOpen={() => {
                            tipeRef.current.classList.add("Mui-focused");
                            tipeRef.current.previousSibling?.classList.add(
                                "Mui-focused"
                            );
                        }}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                                borderRadius: "0.375rem",
                            },
                        }}
                    >
                        {tipe &&
                            tipe.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.nama}
                                </MenuItem>
                            ))}
                    </Select>
                    {errors?.tipe && (
                        <>
                            <span></span>
                            <Typography
                                variant="caption"
                                color="error"
                                className="mt-1"
                            >
                                {errors.tipe}
                            </Typography>
                        </>
                    )}

                    <InputLabel className="flex items-center">Tahun</InputLabel>
                    <TextInput
                        readOnly={isReadOnly}
                        type="text"
                        inputMode="numeric"
                        value={data.tahun}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            setData("tahun", val);
                        }}
                    />
                    {errors?.tahun && (
                        <>
                            <span></span>
                            <Typography
                                variant="caption"
                                color="error"
                                className="mt-1"
                            >
                                {errors.tahun}
                            </Typography>
                        </>
                    )}

                    <InputLabel className="flex items-center">Jenis</InputLabel>
                    <TextInput
                        readOnly={isReadOnly}
                        name="jenis"
                        value={data.jenis}
                        onChange={handleDefaultChange}
                    />
                    {errors?.jenis && (
                        <>
                            <span></span>
                            <Typography
                                variant="caption"
                                color="error"
                                className="mt-1"
                            >
                                {errors.jenis}
                            </Typography>
                        </>
                    )}

                    <InputLabel className="flex items-center">Warna</InputLabel>
                    <TextInput
                        readOnly={isReadOnly}
                        name="warna"
                        value={data.warna}
                        onChange={handleDefaultChange}
                    />
                    {errors?.warna && (
                        <>
                            <span></span>
                            <Typography
                                variant="caption"
                                color="error"
                                className="mt-1"
                            >
                                {errors.warna}
                            </Typography>
                        </>
                    )}
                </div>
            </Card>
        </>
    );
}
