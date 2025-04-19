import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import { router } from "@inertiajs/react";

export default function StickyHeadTable({
    columns,
    rows,
    checkboxFields,
    urlDetailRow,
    isShowPagination = true,
    paginationLinks = [],
    paginationMeta = {},
}) {
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
                        {rows.map((row, index) => (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id || index}
                                onClick={() => handleRowClick(row.id)}
                                sx={{
                                    cursor: urlDetailRow
                                        ? "pointer"
                                        : "default",
                                }}
                            >
                                {columns.map((column) => {
                                    let value = row[column.id];

                                    if (column.id === "no") {
                                        value = paginationMeta.from
                                            ? paginationMeta.from + index
                                            : index + 1;
                                    } else if (
                                        checkboxFields?.includes(column.id)
                                    ) {
                                        value = (
                                            <Checkbox
                                                checked={
                                                    !!row[column.id] &&
                                                    !!row[column.id]?.length
                                                }
                                                disabled
                                                sx={{
                                                    "&.Mui-checked": {
                                                        color: "primary.main",
                                                    },
                                                }}
                                            />
                                        );
                                    } else if (column.id === "no_pendaftaran") {
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

            {isShowPagination && paginationLinks.length > 0 && (
                <div className="flex flex-col gap-2 p-4">
                    <div className="text-sm text-gray-600">
                        Menampilkan {paginationMeta.from}-{paginationMeta.to}{" "}
                        dari {paginationMeta.total} data
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end">
                        {(() => {
                            const numericLinks = paginationLinks.filter(
                                (l) => l.label && !isNaN(l.label)
                            );
                            const navLinks = paginationLinks.filter(
                                (l) => !l.label || isNaN(l.label)
                            );

                            const currentPage = parseInt(
                                numericLinks.find((l) => l.active)?.label || "1"
                            );
                            const totalPages = numericLinks.length;
                            const maxVisible = 5;

                            const visiblePages = new Set();
                            visiblePages.add(1);
                            visiblePages.add(totalPages);

                            for (
                                let i =
                                    currentPage - Math.floor(maxVisible / 2);
                                i <= currentPage + Math.floor(maxVisible / 2);
                                i++
                            ) {
                                if (i > 1 && i < totalPages) {
                                    visiblePages.add(i);
                                }
                            }

                            const displayedLinks = [];
                            let prevPage = 0;

                            for (let i = 0; i < numericLinks.length; i++) {
                                const page = parseInt(numericLinks[i].label);
                                if (visiblePages.has(page)) {
                                    if (prevPage && page - prevPage > 1) {
                                        displayedLinks.push({
                                            label: "...",
                                            url: null,
                                            active: false,
                                        });
                                    }
                                    displayedLinks.push(numericLinks[i]);
                                    prevPage = page;
                                }
                            }

                            const finalLinks = [
                                ...navLinks.filter((l) =>
                                    l.label?.includes("Previous")
                                ),
                                ...displayedLinks,
                                ...navLinks.filter((l) =>
                                    l.label?.includes("Next")
                                ),
                            ];

                            return finalLinks.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    className={`px-3 py-1 border text-sm rounded ${
                                        link.active
                                            ? "bg-blue-500 text-white"
                                            : link.url
                                            ? "bg-white text-gray-700 hover:bg-gray-100"
                                            : "bg-white text-gray-400 cursor-default"
                                    }`}
                                    onClick={() =>
                                        link.url && router.get(link.url)
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: link.label ?? "",
                                    }}
                                />
                            ));
                        })()}
                    </div>
                </div>
            )}
        </Paper>
    );
}
