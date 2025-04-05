import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import { router } from "@inertiajs/react"; // Import Inertia's router

export default function StickyHeadTable({
    columns,
    rows,
    checkboxFields,
    isShowPagination = true,
    urlDetailRow,
    rowsPerPageOption = [10, 25, 100],
}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOption[0]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (id) => {
        if (!urlDetailRow) return;
        router.visit(`${urlDetailRow}/${id}`);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        maxWidth: column.maxWidth,
                                        width: column.width,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index}
                                    onClick={() => {
                                        handleRowClick(row.id);
                                        console.log(row);
                                    }}
                                    sx={{
                                        cursor: urlDetailRow
                                            ? "pointer"
                                            : "default",
                                    }}
                                >
                                    {columns.map((column) => {
                                        let value = row[column.id];

                                        if (column.id === "no") {
                                            value =
                                                page * rowsPerPage + index + 1;
                                        } else if (
                                            checkboxFields?.includes(column.id)
                                        ) {
                                            value = (
                                                <Checkbox
                                                    checked={
                                                        row[column.id] != null
                                                    }
                                                    disabled
                                                    sx={{
                                                        "&.Mui-checked": {
                                                            color: "primary.main",
                                                        },
                                                    }}
                                                />
                                            );
                                        } else if (
                                            column.id === "no_pendaftaran"
                                        ) {
                                            value = String(
                                                row.no_pendaftaran
                                            ).padStart(6, "0");
                                        }

                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.format
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isShowPagination && (
                <TablePagination
                    labelRowsPerPage="Data per halaman"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}–${to} dari ${
                            count !== -1 ? count : `lebih dari ${to}`
                        }`
                    }
                    rowsPerPageOptions={rowsPerPageOption}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
}
