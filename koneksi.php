<?php
$host = "localhost";
$user = "root";      // Sesuaikan (jika pakai XAMPP biasanya root)
$pass = "";          // Kosong jika default XAMPP
$db   = "tiket_kapal";  // Pastikan database sudah dibuat

$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}
?>
