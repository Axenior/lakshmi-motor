import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        disabled = false,
        ...props
    },
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

    // Tentukan kelas styling berdasarkan kondisi disabled
    const baseClass =
        "rounded-md shadow-sm h-8 focus:border-indigo-500 focus:ring-indigo-500 ";
    const borderClass = disabled
        ? "border border-gray-400"
        : "border border-black";
    const textClass = disabled ? "text-gray-400" : "text-black";

    return (
        <input
            {...props}
            type={type}
            disabled={disabled}
            className={
                baseClass +
                " " +
                borderClass +
                " " +
                textClass +
                " " +
                className
            }
            ref={localRef}
            autoComplete="off"
        />
    );
});
