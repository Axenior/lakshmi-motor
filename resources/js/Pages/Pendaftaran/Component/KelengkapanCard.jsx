import { useEffect, useState } from "react";
import { Card, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function KelengkapanCard({
    kelengkapan,
    selectedKelengkapan = [],
    onChange,
}) {
    // Inisialisasi state dengan selectedKelengkapan dari props.
    const [checkedItems, setCheckedItems] = useState(selectedKelengkapan);

    // Jika prop selectedKelengkapan berubah, perbarui state.
    useEffect(() => {
        setCheckedItems(selectedKelengkapan);
    }, [selectedKelengkapan]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const numericValue = Number(value);
        let updatedCheckedItems;
        if (checked) {
            updatedCheckedItems = [...checkedItems, numericValue];
        } else {
            updatedCheckedItems = checkedItems.filter(
                (item) => item !== numericValue
            );
        }
        setCheckedItems(updatedCheckedItems);
        if (onChange) {
            onChange(updatedCheckedItems);
        }
    };

    return (
        <Card className="p-4">
            <h5 className="text-lg font-bold">Kelengkapan</h5>
            <FormGroup>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                    {kelengkapan.map((k) => (
                        <FormControlLabel
                            key={k.id}
                            control={
                                <Checkbox
                                    value={k.id}
                                    checked={checkedItems.includes(k.id)}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label={<span className="text-sm">{k.nama}</span>}
                        />
                    ))}
                </div>
            </FormGroup>
        </Card>
    );
}
