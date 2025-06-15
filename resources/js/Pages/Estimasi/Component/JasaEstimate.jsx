import React, { useState, useEffect, useMemo } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Autocomplete,
    TableRow,
    TableCell,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StickyHeadTable from "@/Components/StickyHeadTable";

const sx = {
    "& .MuiOutlinedInput-root": {
        "& input": {
            "&:focus": {
                outline: "none",
                boxShadow: "none",
            },
        },
    },
};

const hitungTotal = (row, jasaList) => {
    const jasaItem = jasaList.find(
        (j) => j.id === row.jasa_id || j.id === row.id
    );
    const harga = jasaItem?.harga || 0;
    const jumlah = row.jumlah || 0;
    const diskon = row.diskon || 0;
    return harga * jumlah * (1 - diskon / 100);
};

export default function JasaEstimate({ jasa, onChangeRows, defaultRows = [] }) {
    const jasaColumns = [
        { id: "no", label: "No", minWidth: 20 },
        { id: "nama", label: "Nama Jasa", minWidth: 100 },
        { id: "jumlah", label: "Jumlah", minWidth: 40 },
        { id: "harga", label: "Harga", minWidth: 80 },
        { id: "diskon", label: "Diskon (%)", minWidth: 80 },
        { id: "total", label: "Total", minWidth: 80 },
        { id: "hapus", label: "Hapus", minWidth: 80 },
    ];

    const [selectedJasa, setSelectedJasa] = useState(null);
    const [formData, setFormData] = useState({
        harga: "",
        jumlah: "",
        diskon: "",
    });
    const [rows, setRows] = useState(defaultRows);

    const handleInputChange = (field) => (e) => {
        const val = e.target.value.replace(/[^0-9]/g, "");

        if (e.target.name == "diskon") {
            if (val > 100) val = 100;
            // Jika nilai kurang dari 0, set ke 0
            if (val < 0) val = 0;
        }
        setFormData((prev) => ({ ...prev, [field]: val }));
    };

    const handleAddJasa = () => {
        const { harga, jumlah, diskon } = formData;
        if (!selectedJasa || isNaN(jumlah) || isNaN(harga)) return;

        const newRow = {
            jasa_id: selectedJasa.id,
            jumlah: parseInt(jumlah || 1),
            diskon: parseFloat(diskon || 0),
        };

        setRows((prev) => [...prev, newRow]);

        // Reset input
        setSelectedJasa(null);
        setFormData({ harga: "", jumlah: "", diskon: "" });
    };

    const handleDeleteJasa = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const displayRows = useMemo(() => {
        return rows.map((row, index) => {
            const jasaItem = jasa.find((j) => j.id === row.jasa_id);
            const nama = jasaItem?.nama || "";
            const harga = jasaItem?.harga.toLocaleString("id-ID") || 0;
            const total = hitungTotal(row, jasa).toLocaleString("id-ID");

            return {
                ...row,
                nama,
                harga,
                total,
                hapus: (
                    <Button onClick={() => handleDeleteJasa(index)}>
                        <DeleteIcon color="error" />
                    </Button>
                ),
            };
        });
    }, [rows, jasa]);

    useEffect(() => {
        if (onChangeRows) {
            const mapped = rows.map((row) => {
                const jasaItem = jasa.find((j) => j.id === row.jasa_id);
                return {
                    id: row.jasa_id,
                    nama: jasaItem?.nama || "",
                    harga: jasaItem?.harga || 0,
                    jumlah: row.jumlah,
                    diskon: row.diskon,
                    total: hitungTotal(row, jasa),
                };
            });
            onChangeRows(mapped);
        }
    }, [rows, jasa]);

    const subtotal = useMemo(() => {
        return rows.reduce((sum, r) => sum + hitungTotal(r, jasa), 0);
    }, [rows, jasa]);

    console.log(rows);
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Estimasi Jasa
            </Typography>

            <Box
                display="flex"
                gap={2}
                mb={2}
                flexWrap="wrap"
                flexDirection={{ xs: "column", sm: "row" }}
            >
                <Autocomplete
                    disablePortal
                    options={jasa}
                    value={selectedJasa}
                    getOptionLabel={(option) => option.nama || ""}
                    onChange={(event, newValue) => {
                        setSelectedJasa(newValue);
                        setFormData({
                            harga: newValue?.harga || "",
                            jumlah: 1,
                            diskon: 0,
                        });
                    }}
                    sx={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Nama Jasa"
                            size="small"
                            sx={sx}
                        />
                    )}
                />

                <TextField
                    label="Harga"
                    size="small"
                    inputProps={{ readOnly: true }}
                    value={formData.harga}
                    sx={sx}
                />

                <TextField
                    name="jumlah"
                    label="Jumlah"
                    size="small"
                    value={formData.jumlah}
                    onChange={handleInputChange("jumlah")}
                    sx={sx}
                />

                <TextField
                    name="diskon"
                    label="Diskon (%)"
                    size="small"
                    value={formData.diskon}
                    onChange={handleInputChange("diskon")}
                    sx={sx}
                />

                <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddJasa}
                    sx={{ minWidth: "46px", paddingX: "8px" }}
                >
                    +
                </Button>
            </Box>

            <StickyHeadTable columns={jasaColumns} rows={displayRows}>
                <TableRow>
                    <TableCell colSpan={5}>Subtotal</TableCell>
                    <TableCell align="left">
                        {subtotal.toLocaleString("id-ID")}
                    </TableCell>
                </TableRow>
            </StickyHeadTable>
        </>
    );
}
