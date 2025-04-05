import { DatePicker } from "@mui/x-date-pickers";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function DateInput(
    { className = "", isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <DatePicker
            {...props}
            className={className}
            ref={localRef}
            format="DD/MM/YYYY"
            slotProps={{
                textField: {
                    size: "small",
                    sx: {
                        "& input": {
                            "--tw-ring-shadow": "0 0 #000 !important",
                        },
                        "& .MuiInputBase-root": {
                            height: "32px",
                            borderRadius: "0.375rem",
                            backgroundColor: "white",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "black",
                        },
                    },
                },
            }}
        />
    );
});
