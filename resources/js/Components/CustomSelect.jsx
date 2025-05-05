import React, { useRef } from "react";
import { Select, MenuItem } from "@mui/material";

export default function CustomSelect({
    name,
    value,
    onChange,
    options = [],
    readOnly = false,
}) {
    const selectRef = useRef();

    const handleFocus = () => {
        selectRef.current.classList.add("Mui-focused");
        selectRef.current.previousSibling?.classList.add("Mui-focused");
    };

    const handleBlur = () => {
        selectRef.current.classList.remove("Mui-focused");
        selectRef.current.previousSibling?.classList.remove("Mui-focused");
    };

    return (
        <Select
            ref={selectRef}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8"
            onOpen={handleFocus}
            onClose={handleBlur}
            sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    borderRadius: "0.375rem",
                },
            }}
            readOnly={readOnly}
        >
            {options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                    {item.nama}
                </MenuItem>
            ))}
        </Select>
    );
}
