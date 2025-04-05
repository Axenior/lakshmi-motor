import DateInput from "@/Components/DateInput";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Card, MenuItem, Select, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRef } from "react";

// Komponen untuk data pribadi dan pendaftaran
export default function PersonalInfoCard({
    data,
    setData,
    fetchPelanggan,
    penanggung,
    errors = {},
    isReadOnly = false,
}) {
    const penanggungRef = useRef(null);
    const handleDefaultChange = (e) => {
        setData(e.target.name, e.target.value);
        if (e.target.name == "penanggung") {
            if (e.target.value == 1) {
                setData("no_polis", "");
            }
        }
    };

    return (
        <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1">
            <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                <InputLabel className="flex items-center">
                    No Pendaftaran
                </InputLabel>
                <TextInput
                    readOnly
                    name="no_pendaftaran"
                    value={data.no_pendaftaran}
                />

                <InputLabel className="flex items-center">No Telp</InputLabel>
                <TextInput
                    readOnly={isReadOnly}
                    value={data.no_telepon}
                    onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9- ]/g, "");
                        setData("no_telepon", val);
                    }}
                    onBlur={fetchPelanggan}
                />
                {errors?.no_telepon && (
                    <>
                        <span></span>
                        <Typography
                            variant="caption"
                            color="error"
                            className="mt-1"
                        >
                            {errors.no_telepon}
                        </Typography>
                    </>
                )}

                <InputLabel className="flex items-center">Nama</InputLabel>
                <TextInput
                    readOnly={isReadOnly}
                    name="nama"
                    value={data.nama}
                    onChange={handleDefaultChange}
                />
                {errors?.nama && (
                    <>
                        <span></span>
                        <Typography
                            variant="caption"
                            color="error"
                            className="mt-1"
                        >
                            {errors.nama}
                        </Typography>
                    </>
                )}

                <InputLabel className="flex items-center">Alamat</InputLabel>
                <TextAreaInput
                    readOnly={isReadOnly}
                    name="alamat"
                    value={data.alamat}
                    onChange={handleDefaultChange}
                />
                {errors?.alamat && (
                    <>
                        <span></span>
                        <Typography
                            variant="caption"
                            color="error"
                            className="mt-1"
                        >
                            {errors.alamat}
                        </Typography>
                    </>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                <InputLabel className="flex items-center">
                    Tanggal Pendaftaran
                </InputLabel>
                <DateInput
                    readOnly={isReadOnly}
                    value={
                        data.tanggal_pendaftaran
                            ? dayjs(data.tanggal_pendaftaran)
                            : null
                    }
                    onChange={(e) =>
                        setData(
                            "tanggal_pendaftaran",
                            dayjs(e).format("YYYY-MM-DD")
                        )
                    }
                />

                <InputLabel className="flex items-center">KM Masuk</InputLabel>
                <TextInput
                    readOnly={isReadOnly}
                    type="text"
                    inputMode="numeric"
                    min={0}
                    value={data.km_masuk}
                    onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setData("km_masuk", Number(val));
                    }}
                />

                <InputLabel className="flex items-center">
                    No Register
                </InputLabel>
                <TextInput
                    readOnly={isReadOnly}
                    name="no_register"
                    value={data.no_register}
                    onChange={handleDefaultChange}
                />
                {errors?.no_register && (
                    <>
                        <span></span>
                        <Typography
                            variant="caption"
                            color="error"
                            className="mt-1"
                        >
                            {errors.no_register}
                        </Typography>
                    </>
                )}

                <InputLabel className="flex items-center">
                    Penanggung
                </InputLabel>
                <Select
                    readOnly={isReadOnly}
                    ref={penanggungRef}
                    name="penanggung"
                    value={data.penanggung}
                    onChange={handleDefaultChange}
                    className="h-8"
                    onClose={() => {
                        penanggungRef.current.classList.remove("Mui-focused");
                        penanggungRef.current.previousSibling?.classList.remove(
                            "Mui-focused"
                        );
                    }}
                    onOpen={() => {
                        penanggungRef.current.classList.add("Mui-focused");
                        penanggungRef.current.previousSibling?.classList.add(
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
                    {penanggung &&
                        penanggung.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.nama}
                            </MenuItem>
                        ))}
                </Select>

                {errors?.penanggung && (
                    <>
                        <span></span>
                        <Typography
                            variant="caption"
                            color="error"
                            className="mt-1"
                        >
                            {errors.penanggung}
                        </Typography>
                    </>
                )}

                {data.penanggung !== "" && data.penanggung !== 1 && (
                    <>
                        <InputLabel className="flex items-center">
                            No Polis
                        </InputLabel>
                        <TextInput
                            readOnly={isReadOnly}
                            name="no_polis"
                            value={data.no_polis}
                            onChange={handleDefaultChange}
                        />
                        {errors?.no_polis && (
                            <>
                                <span></span>
                                <Typography
                                    variant="caption"
                                    color="error"
                                    className="mt-1"
                                >
                                    The no polis field is required.
                                </Typography>
                            </>
                        )}
                    </>
                )}
            </div>
        </Card>
    );
}
