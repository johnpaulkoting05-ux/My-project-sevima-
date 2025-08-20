<?php
include 'koneksi.php';

$sql = "SELECT * FROM pesanan ORDER BY id DESC";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daftar Pesanan Tiket Kapal</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <h1>Daftar Pesanan Tiket Kapal Laut</h1>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>No</th>
        <th>Nama Pemesan</th>
        <th>Tujuan</th>
        <th>Tanggal</th>
        <th>Jumlah Tiket</th>
        <th>Total Harga</th>
      </tr>
    </thead>
    <tbody>
      <?php if (mysqli_num_rows($result) > 0): ?>
        <?php $no = 1; while ($row = mysqli_fetch_assoc($result)): ?>
          <tr>
            <td><?= $no++ ?></td>
            <td><?= htmlspecialchars($row['nama']) ?></td>
            <td><?= htmlspecialchars($row['tujuan']) ?></td>
            <td><?= htmlspecialchars($row['tanggal']) ?></td>
            <td><?= $row['jumlah'] ?></td>
            <td>Rp<?= number_format($row['total_harga'], 0, ',', '.') ?></td>
          </tr>
        <?php endwhile; ?>
      <?php else: ?>
        <tr><td colspan="6">Belum ada pesanan.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</body>
</html>
