<?php
header(\"Access-Control-Allow-Origin: *\");
header(\"Content-Type: application/json\");

$conn = new mysqli(\"localhost\", \"root\", \"\", \"tiket_kapal\");
$data = json_decode(file_get_contents(\"php://input\"), true);

$nama = $data['nama'];
$telepon = $data['telepon'];
$rute = $data['rute'];
$jumlah = $data['jumlah'];
$totalHarga = $data['totalHarga'];

$stmt = $conn->prepare(\"INSERT INTO tickets (nama, telepon, rute, jumlah, total_harga) VALUES (?, ?, ?, ?, ?)\");
$stmt->bind_param(\"sssii\", $nama, $telepon, $rute, $jumlah, $totalHarga);

if ($stmt->execute()) {
  echo json_encode([\"success\" => true, \"message\" => \"Pemesanan berhasil disimpan\"]);
} else {
  echo json_encode([\"success\" => false, \"message\" => \"Gagal menyimpan pemesanan\"]);
}

$stmt->close();
$conn->close();
?>
