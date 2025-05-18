import CustomSelect from "@/Components/CustomSelect";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Card } from "@mui/material";

export default function StatusCard({ data, setData, isReadOnly = false }) {
    const handleDefaultChange = (val) => {
        // console.log(e);
        // setData(e.target.name, e.target.value);
        setData("status", val);
    };

    const choice = [
        { id: "pendaftaran", nama: "pendaftaran" },
        { id: "estimasi", nama: "estimasi" },
        { id: "pengerjaan", nama: "pengerjaan" },
        { id: "selesai", nama: "selesai" },
        { id: "batal", nama: "batal" },
    ];
    console.log(choice);
    return (
        <Card className="flex flex-wrap gap-x-5 gap-y-1 p-4 my-1">
            <InputLabel className="flex items-center">Status</InputLabel>
            <CustomSelect
                name="status"
                value={data.status}
                onChange={handleDefaultChange}
                className="h-8"
                options={choice}
                readOnly={isReadOnly}
            />
        </Card>
    );
}
