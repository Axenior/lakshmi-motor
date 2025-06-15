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
    const sparepartItem = jasaList.find(
        (s) => s.id === row.sparepart_id || s.id === row.id
    );
    const harga = sparepartItem?.harga || 0;
    const jumlah = row.jumlah || 0;
    const diskon = row.diskon || 0;
    return harga * jumlah * (1 - diskon / 100);
};

export default function SparepartEstimate({
    sparepart,
    onChangeRows,
    defaultRows = [],
}) {
    const jasaColumns = [
        { id: "no", label: "No", minWidth: 20 },
        { id: "nama", label: "Nama Sparepart", minWidth: 100 },
        { id: "jumlah", label: "Jumlah", minWidth: 40 },
        { id: "harga", label: "Harga", minWidth: 80 },
        { id: "diskon", label: "Diskon (%)", minWidth: 80 },
        { id: "total", label: "Total", minWidth: 80 },
        { id: "hapus", label: "Hapus", minWidth: 80 },
    ];

    const [selectedSparepart, setSelectedSparepart] = useState(null);
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

    const handleAddSparepart = () => {
        const { harga, jumlah, diskon } = formData;
        if (!selectedSparepart || isNaN(jumlah) || isNaN(harga)) return;

        const newRow = {
            // id: `NewItem-${Date.now()}`,
            sparepart_id: selectedSparepart.id,
            jumlah: parseInt(jumlah || 1),
            diskon: parseFloat(diskon || 0),
        };

        setRows((prev) => [...prev, newRow]);

        // Reset input
        setSelectedSparepart(null);
        setFormData({ harga: "", jumlah: "", diskon: "" });
    };

    const handleDeleteJasa = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const displayRows = useMemo(() => {
        return rows.map((row, index) => {
            const sparepartItem = sparepart.find(
                (s) => s.id === row.sparepart_id
            );
            const nama = sparepartItem?.nama || "";
            const harga = sparepartItem?.harga.toLocaleString("id-ID") || 0;
            const total = hitungTotal(row, sparepart).toLocaleString("id-ID");

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
    }, [rows, sparepart]);
    console.log(displayRows);
    useEffect(() => {
        if (onChangeRows) {
            const mapped = rows.map((row) => {
                const sparepartItem = sparepart.find(
                    (s) => s.id === row.sparepart_id
                );
                return {
                    id: row.sparepart_id,
                    nama: sparepartItem?.nama || "",
                    harga: sparepartItem?.harga || 0,
                    jumlah: row.jumlah,
                    diskon: row.diskon,
                    total: hitungTotal(row, sparepart),
                };
            });
            onChangeRows(mapped);
        }
    }, [rows, sparepart]);

    const subtotal = useMemo(() => {
        return rows.reduce((sum, r) => sum + hitungTotal(r, sparepart), 0);
    }, [rows, sparepart]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Estimasi sparepart
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
                    options={sparepart}
                    value={selectedSparepart}
                    getOptionLabel={(option) => option.nama || ""}
                    onChange={(event, newValue) => {
                        setSelectedSparepart(newValue);
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
                            label="Nama sparepart"
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
                    onClick={handleAddSparepart}
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
