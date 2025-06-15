import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";

import { Card, Checkbox, Typography } from "@mui/material";

export default function StatusCard({
    data,
    setData,
    isReadOnly = false,
    errors = {},
}) {
    const handleStatusChange = (val) => {
        setData("status", val);
    };
    const handleKeterangan = (e) => {
        setData("keterangan_pembatalan", e.target.value);
    };
    const handleLunas = (e) => {
        setData("lunas", e.target.checked);
    };
    console.log(data);
    const choice = [
        { id: "pendaftaran", nama: "pendaftaran" },
        { id: "estimasi", nama: "estimasi" },
        { id: "pengerjaan", nama: "pengerjaan" },
        { id: "selesai", nama: "selesai" },
        { id: "batal", nama: "batal" },
    ];
    console.log(data);
    return (
        <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1">
            <div className="grid grid-cols-1 sm:grid-cols-[130px_calc(86.5%-130px)] gap-1 w-full self-start">
                <InputLabel className="flex items-center">Status</InputLabel>
                <CustomSelect
                    name="status"
                    value={data.status}
                    onChange={handleStatusChange}
                    className="h-8"
                    options={choice}
                    readOnly={isReadOnly}
                />
            </div>

            {data.status != "batal" && (
                <div className="grid grid-cols-1 sm:grid-cols-[130px_calc(86.5%-130px)] gap-1 w-full self-start">
                    <InputLabel className="flex items-center">Lunas</InputLabel>
                    <Checkbox
                        checked={data.lunas}
                        disabled={isReadOnly}
                        onChange={handleLunas}
                        disableRipple
                        sx={{
                            display: "block",
                            "& .MuiSvgIcon-root": {
                                fontSize: 28,
                            },
                            "&.Mui-checked": {
                                color: "primary.main",
                            },
                            margin: 0,
                            padding: 0,
                        }}
                    />
                </div>
            )}

            {data.status == "batal" && (
                <div className="grid grid-cols-1 sm:grid-cols-[130px_calc(86.5%-130px)] gap-1 w-full self-start">
                    <InputLabel className="flex items-center">
                        Keterangan Pembatalan
                    </InputLabel>
                    <TextAreaInput
                        readOnly={isReadOnly}
                        name="keterangan"
                        value={data.keterangan_pembatalan}
                        onChange={handleKeterangan}
                    />
                </div>
            )}
            {errors?.keterangan_pembatalan && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-[130px_calc(86.5%-130px)] gap-1 w-full self-start">
                        <span></span>
                        <Typography
                            variant="caption"
                            color="error"
                            className="mt-1"
                        >
                            {errors.keterangan_pembatalan}
                        </Typography>
                    </div>
                </>
            )}
        </Card>
    );
}
