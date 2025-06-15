import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Line,
} from "@react-pdf/renderer";

const numberToWord = (num) => {
    const numToWords = [
        "",
        "satu",
        "dua",
        "tiga",
        "empat",
        "lima",
        "enam",
        "tujuh",
        "delapan",
        "sembilan",
        "sepuluh",
        "sebelas",
        "dua belas",
        "tiga belas",
        "empat belas",
        "lima belas",
        "enam belas",
        "tujuh belas",
        "delapan belas",
        "sembilan belas",
    ];

    const tens = [
        "",
        "",
        "dua puluh",
        "tiga puluh",
        "empat puluh",
        "lima puluh",
        "enam puluh",
        "tujuh puluh",
        "delapan puluh",
        "sembilan puluh",
    ];

    const powersOfTen = ["", "ribu", "juta", "miliar", "triliun"];

    const convertHundreds = (n) => {
        if (n < 20) {
            return numToWords[n];
        } else if (n < 100) {
            const tensPart = Math.floor(n / 10);
            const onesPart = n % 10;
            return (
                tens[tensPart] +
                (onesPart > 0 ? " " + numToWords[onesPart] : "")
            );
        } else {
            const hundredsPart = Math.floor(n / 100);
            const remainder = n % 100;
            return (
                numToWords[hundredsPart] +
                " ratus" +
                (remainder > 0 ? " " + convertHundreds(remainder) : "")
            );
        }
    };

    const convert = (n) => {
        if (n === 0) return "nol";
        let result = "";
        let power = 0;

        while (n > 0) {
            const chunk = n % 1000;
            if (chunk > 0) {
                const chunkWord =
                    convertHundreds(chunk) +
                    (powersOfTen[power] ? " " + powersOfTen[power] : "");
                result = chunkWord + (result ? " " + result : "");
            }
            n = Math.floor(n / 1000);
            power++;
        }

        return result;
    };

    return convert(num).trim();
};

// Style
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: "Helvetica",
    },
    title: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        // textAlign: "center",
        fontSize: 12,
        marginBottom: 2,
        fontWeight: "bold",
    },
    amountInWords: {
        fontSize: 10,
        fontStyle: "italic",
        marginBottom: 20,
        textTransform: "uppercase",
    },
    section: {
        marginTop: 10,
        marginBottom: 8,
        lineHeight: 1.4,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#000",
        paddingVertical: 4,
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 2,
    },
    label: {
        width: "70%",
    },
    value: {
        width: "30%",
        flexDirection: "row",
        justifyContent: "space-between",
        textAlign: "right",
    },
    totalAmount: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: "bold",
    },
    footer: {
        textAlign: "right",
        fontSize: 11,
    },
    signature: {
        marginTop: 65,
        textAlign: "right",
        fontWeight: "bold",
        marginRight: 30,
    },
});

const InvoiceDocument = ({ data }) => {
    const total_jasa =
        data.estimasi.estimasi_jasas.reduce((acc, item) => {
            const jumlah = item.jumlah;
            const harga = item.jasa.harga;
            const diskon = item.diskon;
            return acc + harga * jumlah * (1 - diskon / 100);
        }, 0) - data.estimasi.diskon_jasa;

    const total_sparepart =
        data.estimasi.estimasi_spareparts.reduce((acc, item) => {
            const jumlah = item.jumlah;
            const harga = item.sparepart.harga;
            const diskon = item.diskon;
            return acc + harga * jumlah * (1 - diskon / 100);
        }, 0) - data.estimasi.diskon_sparepart;

    const grandTotal = total_jasa + total_sparepart - data.estimasi.nilai_or;
    return (
        <Document>
            <Page size={[595.44, 425.89]} style={styles.page}>
                {/* Header */}
                <Text style={styles.subtitle}>INV.W118.97687.03.2025</Text>
                <Text style={styles.subtitle}>{data.penanggung.nama}</Text>

                {/* Description */}
                <Text style={styles.section}>
                    <Text style={styles.section}>
                        {`Biaya penggantian Spare Part dan Jasa Kerja pada mobil ${data.kendaraan.merk} ${data.kendaraan.tipe} ${data.kendaraan.no_polisi}`}
                    </Text>
                </Text>

                {/* Table */}
                <View style={styles.tableHeader}>
                    <Text style={styles.label}>Keterangan</Text>
                    <Text style={styles.value}>Jumlah</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.label}>Jasa</Text>
                    <View style={styles.value}>
                        <Text>Rp</Text>
                        <Text style={{ textAlign: "right" }}>
                            {total_jasa.toLocaleString("id-ID")}
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.label}>Spare Part</Text>
                    <View style={styles.value}>
                        <Text>Rp</Text>
                        <Text style={{ textAlign: "right" }}>
                            {" "}
                            {total_sparepart.toLocaleString("id-ID")}
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.label}>OR</Text>
                    <View style={styles.value}>
                        <Text>Rp</Text>
                        <Text style={{ textAlign: "right" }}>
                            {data.estimasi.nilai_or.toLocaleString("id-ID")}
                        </Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.label}>PPN</Text>
                    <View style={styles.value}>
                        <Text>Rp</Text>
                        <Text style={{ textAlign: "right" }}>293.453</Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.tableRow,
                        {
                            borderTopWidth: 1,
                            borderColor: "#000",
                            marginTop: 4,
                            paddingTop: 4,
                        },
                    ]}
                >
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                        Total
                    </Text>
                    <View style={styles.value}>
                        <Text style={{ fontWeight: "bold" }}>Rp</Text>
                        <Text
                            style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                            {grandTotal.toLocaleString("id-ID")}
                        </Text>
                    </View>
                </View>

                {/* Total number */}
                <Text style={styles.totalAmount}>
                    Rp {grandTotal.toLocaleString("id-ID")}
                </Text>
                <Text style={styles.amountInWords}>
                    *{numberToWord(grandTotal)} rupiah*
                </Text>
                {/* Footer */}
                <Text style={styles.footer}>Palembang, 13 Maret 2025</Text>
                <Text style={styles.signature}>Ir. ARTAMAN</Text>
            </Page>
        </Document>
    );
};

export default InvoiceDocument;
