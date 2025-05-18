// import Container from "@/Components/Container";
// import StickyHeadTable from "@/Components/StickyHeadTable";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link, useForm, usePage } from "@inertiajs/react";
// import { useState } from "react";
// import { Button } from "@mui/material";

// export default function Index() {
//     const { merk, tipe } = usePage().props;
//     console.log(merk, tipe);
//     const [isMerk, setIsMerk] = useState(true);

//     const tipeColumns = [
//         { id: "no", label: "No", width: 75 },
//         { id: "merk", label: "Merk", minWidth: 100 },
//         { id: "tipe", label: "Tipe", minWidth: 170 },
//     ];

//     const tipeRows = tipe.map((item) => ({
//         id: item.id,
//         merk: item.merk.nama,
//         tipe: item.nama,
//     }));

//     const merkColumns = [
//         { id: "no", label: "No", width: 75 },
//         { id: "merk", label: "Merk", minWidth: 100 },
//     ];

//     const merkRows = merk.map((item) => ({
//         id: item.id,
//         merk: item.nama,
//     }));

//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Jenis Kendaraan
//                 </h2>
//             }
//         >
//             <Head title="Jenis Kendaraan" />

//             <Container className="py-5">
//                 <div className="flex justify-between items-center mb-5">
//                     <h2 className="font-semibold text-lg">
//                         {isMerk ? "Merk Kendaraan" : "Tipe Kendaraan"}
//                     </h2>
//                     <Button
//                         variant="contained"
//                         size="small"
//                         onClick={() => setIsMerk(!isMerk)}
//                     >
//                         {isMerk ? "Tipe Kendaraan" : "Merk Kendaraan"}
//                     </Button>
//                 </div>
//                 <StickyHeadTable
//                     columns={isMerk ? merkColumns : tipeColumns}
//                     rows={isMerk ? merkRows : tipeRows}
//                     urlDetailRow={"kendaraan/merk/edit"}
//                 />
//                 <div className="mt-2">
//                     <Button
//                         variant="contained"
//                         size="small"
//                         href={
//                             isMerk
//                                 ? route("kendaraan.merk.create")
//                                 : route("kendaraan.tipe.create")
//                         }
//                     >
//                         {isMerk ? "Tambah Merk" : "Tambah Tipe"}
//                     </Button>
//                 </div>
//             </Container>
//         </AuthenticatedLayout>
//     );
// }
