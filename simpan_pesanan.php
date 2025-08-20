<?php
header("Content-Type: application/json");
include 'koneksi.php';

// Tampilkan error saat debugging (nonaktifkan kalau sudah produksi)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Koneksi ke database gagal: " . mysqli_connect_error()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ambil data dari POST
    $nama = $_POST['nama'] ?? '';
    $telepon = $_POST['telepon'] ?? '';
    $tujuan = $_POST['tujuan'] ?? '';
    $tanggal = $_POST['tanggal'] ?? '';
    $jumlah = intval($_POST['jumlah'] ?? 0);
    $total_harga = intval($_POST['total_harga'] ?? 0);

    // Validasi input
    if (!empty($nama) && !empty($telepon) && !empty($tujuan) && !empty($tanggal) && $jumlah > 0 && $total_harga > 0) {

        // Prepared statement (lebih aman dari SQL Injection)
        $stmt = mysqli_prepare($conn, "INSERT INTO pemesanan (nama, telepon, rute, tanggal_pesan, jumlah, total_harga) VALUES (?, ?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssssid", $nama, $telepon, $tujuan, $tanggal, $jumlah, $total_harga);

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["status" => "success", "message" => "Pesanan berhasil disimpan"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Gagal menyimpan pesanan: " . mysqli_error($conn)]);
        }

        mysqli_stmt_close($stmt);

    } else {
        echo json_encode(["status" => "error", "message" => "Data tidak lengkap atau tidak valid"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Metode tidak diizinkan"]);
}

mysqli_close($conn);
?>
