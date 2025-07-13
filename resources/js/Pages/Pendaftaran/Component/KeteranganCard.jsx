import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import { Card, Typography } from "@mui/material";

// Komponen untuk keterangan tambahan
export default function KeteranganCard({
    data,
    setData,
    isReadOnly = false,
    errors = {},
}) {
    const handleDefaultChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    return (
        <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1">
            <div className="grid grid-cols-1 sm:grid-cols-[130px_calc(86.5%-130px)] gap-1 w-full self-start">
                <InputLabel className="flex items-center">
                    Keterangan
                </InputLabel>
                <TextAreaInput
                    readOnly={isReadOnly}
                    name="keterangan"
                    value={data.keterangan}
                    onChange={handleDefaultChange}
                />
            </div>
            {console.log(errors)}
            {errors?.keterangan && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-[130px_calc(86.5%-130px)] gap-1 w-full self-start">
                        <span></span>
                        <Typography
                            variant="caption"
                            color="error"
                            className="mt-1"
                        >
                            {errors.keterangan}
                        </Typography>
                    </div>
                </>
            )}
        </Card>
    );
}
