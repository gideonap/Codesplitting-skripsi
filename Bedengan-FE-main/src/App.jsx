import React, { Suspense, lazy } from 'react'; // Tambahkan Suspense dan lazy
import { Routes, Route } from 'react-router-dom';
import { ScrollToTop, PrivateRoute, AdminRoute } from './components'; // Komponen utilitas tetap diimport biasa
import { ToastContainer } from "react-toastify";
// import { LandingPage, ... } from './pages'; // Hapus import statis halaman

// --- Implementasi Code Splitting untuk Pages ---
const LandingPage = lazy(() => import('./pages/main/LandingPage'));
const Reservasi = lazy(() => import('./pages/reservasi/Reservasi'));
const Kavling = lazy(() => import('./pages/reservasi/Kavling'));
const Pembayaran = lazy(() => import('./pages/pembayaran/Pembayaran'));
const SyaratDanKetentuan = lazy(() => import('./pages/syaratdanketentuan/SyaratDanKetentuan'));
const Profil = lazy(() => import('./pages/profile/Profil'));
const Masuk = lazy(() => import('./pages/profile/Masuk'));
const Daftar = lazy(() => import('./pages/profile/Daftar'));
const ComingSoon = lazy(() => import('./pages/main/ComingSoon'));
const Invoice = lazy(() => import('./pages/pembayaran/Invoice'));
const DaftarDataDiri = lazy(() => import('./pages/profile/DaftarDataDiri'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ReservasiSemua = lazy(() => import('./pages/admin/ReservasiSemua'));
const ReservasiOnline = lazy(() => import('./pages/admin/ReservasiOnline'));
const ReservasiOffline = lazy(() => import('./pages/admin/ReservasiOffline'));
const PerlengkapanAdmin = lazy(() => import('./pages/admin/PerlengkapanAdmin'));
const TendaPaket = lazy(() => import('./pages/admin/TendaPaket'));
const TendaNonPaket = lazy(() => import('./pages/admin/TendaNonPaket'));
const Item = lazy(() => import('./pages/admin/Item'));
const KavlingAdmin = lazy(() => import('./pages/admin/KavlingAdmin'));
const OnlineDetail = lazy(() => import('./pages/admin/OnlineDetail'));
const OnlineDetailKelompok = lazy(() => import('./pages/admin/OnlineDetailKelompok'));
const AddReservasiOffline = lazy(() => import('./pages/admin/AddReservasiOffline'));
const AddPerlengkapan = lazy(() => import('./pages/admin/AddPerlengkapan'));
const UpdatePerlengkapan = lazy(() => import('./pages/admin/UpdatePerlengkapan'));
const AddKavling = lazy(() => import('./pages/admin/AddKavling'));
const UpdateKavling = lazy(() => import('./pages/admin/UpdateKavling'));
const UpdateOfflineReservation = lazy(() => import('./pages/admin/UpdateOfflineReservation'));
const PembayaranUpload = lazy(() => import('./pages/pembayaran/PembayaranUpload'));
// -------------------------------------------------

function App() {

  // Fallback UI bisa berupa spinner atau teks sederhana
  const pageLoadingFallback = <div>Loading page...</div>;

  return (
    <div>
      <ScrollToTop />
      {/* --- Bungkus Routes dengan Suspense --- */}
      <Suspense fallback={pageLoadingFallback}>
        <Routes>
          {/* --- Rute Publik (Contoh) --- */}
          {/* Rute ini mungkin tidak perlu PrivateRoute jika Masuk/Daftar/Syarat bersifat publik */}
          <Route path="/syarat-dan-ketentuan" element={<SyaratDanKetentuan />} />
          <Route path="/masuk" element={<Masuk />} />
          <Route path="/daftar" element={<Daftar />} />
          {/* Jika LandingPage bisa diakses tanpa login, pindahkan keluar PrivateRoute */}
          <Route path="/" element={<LandingPage />} />

          {/* --- Rute setelah Login/Registrasi Awal --- */}
          <Route element={<PrivateRoute requireDaftar={true} />}>
             <Route path="/daftar-data-diri" element={<DaftarDataDiri />} />
          </Route>

          {/* --- Rute yang Membutuhkan Autentikasi Penuh --- */}
          <Route element={<PrivateRoute requireAuth={true} />}>
             {/* <Route path="/" element={<LandingPage />} /> Jika landing page butuh auth */}
             <Route path="/reservasi" element={<Reservasi />} />
             <Route path="/kavling" element={<Kavling />} />
             <Route path="/pembayaran" element={<Pembayaran />} />
             <Route path="/pembayaran/:id" element={<PembayaranUpload />} />
             <Route path="/invoice/:id" element={<Invoice />} />
             <Route path="/profil/*" element={<Profil />} />
          </Route>

          {/* --- Rute Admin --- */}
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/reservasi" element={<ReservasiSemua />} />
            <Route path="/admin/reservasi/online" element={<ReservasiOnline />} />
            <Route path="/admin/reservasi/online/detail" element={<OnlineDetail />} />
            <Route path="/admin/reservasi/online/detail-kelompok" element={<OnlineDetailKelompok />} />
            {/* ... sisa rute admin ... */}
            <Route path="/admin/reservasi/offline" element={<ReservasiOffline />} />
            <Route path="/admin/reservasi/offline/tambah" element={<AddReservasiOffline />} />
            <Route path="/admin/reservasi/offline/update" element={<UpdateOfflineReservation />} />
            <Route path="/admin/perlengkapan" element={<PerlengkapanAdmin />} />
            <Route path="/admin/perlengkapan/tenda-paket" element={<TendaPaket />} />
            <Route path="/admin/perlengkapan/tenda-non-paket" element={<TendaNonPaket />} />
            <Route path="/admin/perlengkapan/item" element={<Item />} />
            <Route path="/admin/perlengkapan/tambah" element={<AddPerlengkapan />} />
            <Route path="/admin/perlengkapan/update" element={<UpdatePerlengkapan />} />
            <Route path="/admin/perlengkapan/kavling" element={<KavlingAdmin />} />
            <Route path="/admin/perlengkapan/kavling/tambah" element={<AddKavling />} />
            <Route path="/admin/perlengkapan/kavling/ubah/:id" element={<UpdateKavling />} />
          </Route>

          {/* --- Rute Lain-lain --- */}
          <Route path="/tes" element={<UpdateKavling />} /> {/* Mungkin ini juga perlu lazy load? */}
          <Route path="/comingsoon" element={<ComingSoon />} />
        </Routes>
      </Suspense>
      {/* ------------------------------------ */}
      <ToastContainer />
    </div>
  )
}

export default App