import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextAreaInput(
    { className = "", isFocused = false, rows = 2, ...props }, // Tambahkan rows default 2
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
        <textarea
            {...props}
            className={
                "rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-auto whitespace-pre-line " +
                className
            }
            ref={localRef}
            rows={rows} // Kontrol jumlah baris awal
            autoComplete="off"
        />
    );
});
