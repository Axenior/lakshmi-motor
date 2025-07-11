import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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

// Styles
const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
    header: { textAlign: "center", marginBottom: 10 },
    section: { marginBottom: 10 },
    row: {
        flexDirection: "row",
        // borderBottom: 1,
        paddingBottom: 2,
        marginBottom: 2,
    },
    col: { flex: 1 },
    tableHeader: {
        fontWeight: "bold",
        borderTop: 1,
        borderBottom: 1,
        marginTop: 5,
    },
    rightText: { textAlign: "right" },
    infoRow: { flexDirection: "row", marginBottom: 2 },
    label: { width: 90 }, // Lebar tetap untuk rata titik dua
    value: { flex: 1 },
    footer: {
        marginTop: 20,
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

function calculateTotalItem(harga, diskon, jumlah) {
    return harga * ((100 - diskon) / 100) * jumlah;
}

const InvoiceDocument = ({ data }) => {
    // const data = {
    //     spareparts: [
    //         {
    //             kode: "86300-0K200",
    //             nama: "ANTENA RADIO",
    //             qty: 1,
    //             harga: 940000,
    //             total: 940000,
    //         },
    //         {
    //             kode: "52119-0K901",
    //             nama: "BUMPER DEPAN",
    //             qty: 1,
    //             harga: 2350000,
    //             total: 2350000,
    //         },
    //         // ... lanjutkan sesuai gambar
    //     ],
    //     jasa: [
    //         {
    //             nama: "ALL BODY RINGAN + ROOF",
    //             qty: 2,
    //             harga: 5500000,
    //             total: 5500000,
    //         },
    //     ],
    //     total_sparepart: 6955000,
    //     total_jasa: 5500000,
    //     total_semua: 15155000,
    //     terbilang: "Lima Belas Juta Seratus Lima Puluh Lima Ribu Rupiah",
    // };
    console.log(data);

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

    const grandTotal =
        total_sparepart +
        total_jasa -
        data.estimasi.diskon_sparepart -
        data.estimasi.diskon_jasa -
        data.estimasi.nilai_or;

    const jasa = data.estimasi.estimasi_jasas;
    const sparepart = data.estimasi.estimasi_spareparts;

    const now = new Date(Date.now());
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("id-ID", options);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Palembang, {formattedDate}</Text>
                    <Text>Kepada Yth:</Text>
                    <Text>
                        {(data.penanggung?.nama != "Pribadi"
                            ? data.penanggung?.nama
                            : data.nama
                        ).toUpperCase()}
                    </Text>
                    {/* <Text>Di Palembang</Text> */}
                </View>

                <Text style={styles.section}>Dengan hormat,</Text>
                <Text style={styles.section}>
                    Bersama ini kami mengajukan penawaran untuk kendaraan dengan
                    spesifikasi sebagai berikut:
                </Text>

                <View
                    style={[styles.section, { flexDirection: "row", gap: 10 }]}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Nama Pemilik</Text>
                            <Text style={styles.value}>
                                : {data.nama.toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Telp</Text>
                            <Text style={styles.value}>
                                : {data.no_telepon}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>No. Polis</Text>
                            <Text style={styles.value}>
                                : {data.no_polis?.toUpperCase()}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>No. Rangka</Text>
                            <Text style={styles.value}>
                                : {data.no_rangka.toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>No. Mesin</Text>
                            <Text style={styles.value}>
                                : {data.no_mesin.toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Merk / Type</Text>
                            <Text style={styles.value}>
                                : {data.tipe.merk.nama.toUpperCase()}{" "}
                                {data.tipe.nama.toUpperCase()} /{" "}
                                {data.warna.toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>No. Polisi / Thn</Text>
                            <Text style={styles.value}>
                                : {data.no_polisi.toUpperCase()} / {data.tahun}
                            </Text>
                        </View>
                    </View>
                </View>

                <Text>SPAREPART</Text>
                <View
                    style={[
                        styles.row,
                        styles.tableHeader,
                        { fontWeight: "bold" },
                    ]}
                >
                    <Text style={{ flex: 0.4 }}>No</Text>
                    <Text style={styles.col}>Kode Part</Text>
                    <Text style={{ flex: 2 }}>Nama Sparepart</Text>
                    <Text style={{ flex: 0.65 }}>Qty</Text>
                    <Text style={{ flex: 0.75 }}>Diskon %</Text>
                    <Text style={styles.col}>Harga Satuan</Text>
                    <Text style={styles.col}>Total</Text>
                </View>

                {sparepart.map((item, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={{ flex: 0.4 }}>{index + 1}</Text>
                        <Text style={styles.col}>{item.sparepart.kode}</Text>
                        <Text style={{ flex: 2 }}>{item.sparepart.nama}</Text>
                        <Text style={{ flex: 0.65 }}>
                            {item.jumlah} {item.sparepart.satuan}
                        </Text>
                        <Text style={{ flex: 0.75 }}>{item.diskon}</Text>
                        <Text style={styles.col}>
                            Rp {item.sparepart.harga.toLocaleString("ID")}
                        </Text>
                        <Text style={styles.col}>
                            Rp{" "}
                            {calculateTotalItem(
                                item.sparepart.harga,
                                item.diskon,
                                item.jumlah
                            ).toLocaleString("ID")}
                        </Text>
                    </View>
                ))}

                <View style={[styles.row, { borderTop: 1, paddingTop: 2 }]}>
                    <Text style={{ flex: 4 }}></Text>
                    <Text style={{ flex: 1.8 }}>
                        Total Seluruh Sparepart
                    </Text>{" "}
                    <Text style={[styles.col, { marginBottom: 10 }]}>
                        Rp {total_sparepart.toLocaleString("ID")}
                    </Text>{" "}
                </View>

                <Text>JASA</Text>
                <View
                    style={[
                        styles.row,
                        styles.tableHeader,
                        { fontWeight: "bold" },
                    ]}
                >
                    <Text style={{ flex: 0.4 }}>No</Text>
                    <Text style={{ flex: 2 }}>Nama Jasa</Text>
                    <Text style={{ flex: 0.75 }}>Qty</Text>
                    <Text style={{ flex: 0.75 }}>Diskon %</Text>
                    <Text style={styles.col}>Harga</Text>
                    <Text style={{ flex: 0.85 }}>Total</Text>
                </View>

                {jasa.map((item, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={{ flex: 0.4 }}>{index + 1}</Text>
                        <Text style={{ flex: 2 }}>{item.jasa.nama}</Text>
                        <Text style={{ flex: 0.75 }}>{item.jumlah}</Text>
                        <Text style={{ flex: 0.75 }}>{item.diskon}</Text>
                        <Text style={styles.col}>
                            Rp {item.jasa.harga.toLocaleString("ID")}
                        </Text>
                        <Text style={{ flex: 0.85 }}>
                            Rp{" "}
                            {calculateTotalItem(
                                item.jasa.harga,
                                item.diskon,
                                item.jumlah
                            ).toLocaleString("ID")}
                        </Text>
                    </View>
                ))}

                <View style={[styles.row, { borderTop: 1, paddingTop: 2 }]}>
                    <Text style={{ flex: 4 }}></Text>
                    <Text style={{ flex: 1.8 }}>Total Seluruh Jasa</Text>{" "}
                    <Text style={[styles.col, styles.leftText]}>
                        Rp {total_jasa.toLocaleString("ID")}
                    </Text>
                </View>

                <View style={[styles.row, { marginTop: 10 }]}>
                    <Text style={{ flex: 4 }}></Text>
                    <Text style={{ flex: 1.8 }}>
                        Diskon Sparepart Lainnya
                    </Text>{" "}
                    <Text style={[styles.col, styles.leftText]}>
                        Rp {data.estimasi.diskon_sparepart.toLocaleString("ID")}
                    </Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={{ flex: 4 }}></Text>
                    <Text style={{ flex: 1.8 }}>Diskon Jasa Lainnya</Text>{" "}
                    <Text style={[styles.col, styles.leftText]}>
                        Rp {data.estimasi.diskon_jasa.toLocaleString("ID")}
                    </Text>
                </View>
                {data.penanggung?.nama != "Pribadi" && (
                    <View style={[styles.row]}>
                        <Text style={{ flex: 4 }}></Text>
                        <Text style={{ flex: 1.8 }}>Nilai OR</Text>{" "}
                        <Text style={[styles.col, styles.leftText]}>
                            Rp {data.estimasi.nilai_or.toLocaleString("ID")}
                        </Text>
                    </View>
                )}

                <View style={[styles.row, { fontWeight: "bold" }]}>
                    <Text style={{ flex: 4 }}></Text>
                    <Text style={{ flex: 1.8 }}>Total</Text>{" "}
                    <Text style={[styles.col, styles.leftText]}>
                        Rp {grandTotal.toLocaleString("ID")}
                    </Text>
                </View>

                <Text
                    style={{
                        marginTop: 20,
                        fontWeight: "bold",
                        fontStyle: "italic",
                    }}
                >
                    TERBILANG :
                </Text>

                <Text
                    style={{
                        marginTop: 8,
                        marginLeft: 20,
                        fontWeight: "bold",
                        fontStyle: "italic",
                    }}
                >
                    * {numberToWord(grandTotal).toUpperCase()} RUPIAH *
                </Text>

                <Text style={styles.footer}>Palembang, {formattedDate}</Text>
                <Text style={styles.signature}>Ir. ARTAMAN</Text>
            </Page>
        </Document>
    );
};

export default InvoiceDocument;
