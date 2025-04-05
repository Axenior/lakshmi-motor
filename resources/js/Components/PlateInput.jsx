import { useRef, useEffect } from "react";
import TextInput from "./TextInput";

const PlateInput = ({ plate, setPlate, isReadOnly = false }) => {
    const numberRef = useRef(null);
    const suffixRef = useRef(null);

    return (
        <div className="flex items-center space-x-0.5">
            {/* Prefix (BG) - Hanya A-Z */}
            <TextInput
                readOnly={isReadOnly}
                type="text"
                value={plate.prefix}
                onChange={(e) => {
                    const val = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z]/g, ""); // Hanya huruf A-Z
                    setPlate((prev) => ({ ...prev, prefix: val }));
                    if (val.length === 2) numberRef.current?.focus();
                }}
                maxLength={2}
                className="w-[59px] text-center uppercase"
            />

            {/* Number (1234) - Hanya Angka */}
            <TextInput
                readOnly={isReadOnly}
                ref={numberRef}
                type="text"
                value={plate.number}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, ""); // Hanya angka 0-9
                    setPlate((prev) => ({ ...prev, number: val }));
                    if (val.length === 4) suffixRef.current?.focus();
                }}
                maxLength={4}
                className="w-[65px] text-center"
            />

            {/* Suffix (ABW) - Hanya A-Z */}
            <TextInput
                readOnly={isReadOnly}
                ref={suffixRef}
                type="text"
                value={plate.suffix}
                onChange={(e) => {
                    const val = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z]/g, ""); // Hanya huruf A-Z
                    setPlate((prev) => ({ ...prev, suffix: val }));
                }}
                maxLength={3}
                className="w-[72px] text-center uppercase"
            />
        </div>
    );
};

export default PlateInput;
