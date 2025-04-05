import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Card } from "@mui/material";

// Komponen untuk data pribadi dan pendaftaran
export default function EstimateCard({ data, setData, isReadOnly = false }) {
    const handleDefaultChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1">
            <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                <InputLabel className="flex items-center">
                    Perkiraan Waktu
                </InputLabel>
                <div className="flex items-center gap-x-2">
                    <TextInput
                        readOnly={isReadOnly}
                        type="text"
                        inputMode="numeric"
                        min={0}
                        value={data.perkiraan_waktu}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            setData("perkiraan_waktu", Number(val));
                        }}
                        className="w-20"
                    />
                    <InputLabel>Hari</InputLabel>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[130px_200px] gap-1 w-full sm:w-[350px] self-start">
                <InputLabel className="flex items-center">Nilai OR</InputLabel>
                <TextInput
                    readOnly={isReadOnly}
                    type="text"
                    inputMode="numeric"
                    min={0}
                    value={data.nilai_or}
                    onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setData("nilai_or", Number(val));
                    }}
                />
            </div>
        </Card>
    );
}
