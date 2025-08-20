document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pesan-form");
  const tujuanSelect = document.getElementById("tujuan");
  const jumlahInput = document.getElementById("jumlah");
  const totalHargaInput = document.getElementById("total_harga");
  const tanggalInput = document.getElementById("tanggal"); // hidden input untuk tanggal
  const responseMessage = document.getElementById("response-message");

  // Harga tiap rute tujuan
  const hargaTujuan = {
    "Jakarta - Surabaya": 350000,
    "Surabaya - Makasar": 500000,
    "Makasar - Balikpapan": 550000
  };

  // Update total harga dan input tanggal saat tujuan atau jumlah berubah
  function updateForm() {
    const tujuan = tujuanSelect.value;
    const jumlah = parseInt(jumlahInput.value) || 0;
    const harga = hargaTujuan[tujuan] || 0;

    totalHargaInput.value = harga * jumlah;

    // Ambil tanggal keberangkatan dari data-tanggal di <option>
    const selectedOption = tujuanSelect.options[tujuanSelect.selectedIndex];
    const tanggal = selectedOption.getAttribute("data-tanggal") || "";
    tanggalInput.value = tanggal;
  }

  tujuanSelect.addEventListener("change", updateForm);
  jumlahInput.addEventListener("input", updateForm);

  // Kirim data form ke server
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("simpan_pesanan.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      responseMessage.style.padding = "10px";
      responseMessage.style.marginTop = "10px";
      responseMessage.style.borderRadius = "6px";

      if (data.status === "success") {
        responseMessage.style.backgroundColor = "#d4edda";  // hijau muda
        responseMessage.style.color = "#155724";             // hijau tua
        responseMessage.textContent = data.message;

        form.reset();             // kosongkan form
        totalHargaInput.value = ""; // reset total harga
        tanggalInput.value = "";  // reset tanggal
      } else {
        responseMessage.style.backgroundColor = "#f8d7da";  // merah muda
        responseMessage.style.color = "#721c24";            // merah tua
        responseMessage.textContent = data.message;
      }
    })
    .catch(() => {
      responseMessage.style.padding = "10px";
      responseMessage.style.marginTop = "10px";
      responseMessage.style.borderRadius = "6px";
      responseMessage.style.backgroundColor = "#f8d7da";
      responseMessage.style.color = "#721c24";
      responseMessage.textContent = "Terjadi kesalahan jaringan. Coba lagi.";
    });
  });
});
