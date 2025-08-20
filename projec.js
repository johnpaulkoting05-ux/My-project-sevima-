document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ================= LOGIN ==================
  const loginForm = document.getElementById("login-form");
  const loginSection = document.getElementById("login-section");
  const dashboardSection = document.getElementById("dashboard-section");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username === "admin" && password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
      } else {
        document.getElementById("login-error").textContent = "Username atau Password salah!";
      }
    });
  }

  if (loginSection && dashboardSection) {
    if (localStorage.getItem("isLoggedIn") === "true") {
      loginSection.hidden = true;
      dashboardSection.hidden = false;
    } else {
      loginSection.hidden = false;
      dashboardSection.hidden = true;
    }
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });
  }

  // ================= DATA JADWAL ==================
  const routes = [
    {
      rute: "Jakarta → Surabaya",
      tanggal: "2025-06-15",
      waktu: "08:00 WIB",
      kapal: "KM Nusantara 1",
      harga: 200000,
      backgroundImage: "url('jp.jpeg')"
    },
    {
      rute: "Surabaya → Makassar",
      tanggal: "2025-06-18",
      waktu: "10:00 WIB",
      kapal: "KM Lautan Biru",
      harga: 250000,
      backgroundImage: "url('ary.jpeg')"
    },
    {
      rute: "Makassar → Balikpapan",
      tanggal: "2025-06-20",
      waktu: "13:00 WITA",
      kapal: "KM Samudra Raya",
      harga: 225000,
      backgroundImage: "url('roy.jpeg')"
    }
  ];

  // ================== TAMPILKAN JADWAL ==================
  const routesContainer = document.getElementById("jadwal-section");
  const selectedRouteInput = document.getElementById("selected-route");

  if (routesContainer) {
    routes.forEach(route => {
      const card = document.createElement("div");
      card.className = "route-card";
      card.style.backgroundImage = route.backgroundImage;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";
      card.style.color = "white"; 
      card.style.padding = "1rem";
      card.style.borderRadius = "10px";
      card.style.marginBottom = "1rem";
      card.style.position = "relative";

      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.right = 0;
      overlay.style.bottom = 0;
      overlay.style.background = "rgba(0,0,0,0.5)";
      overlay.style.borderRadius = "10px";
      overlay.style.zIndex = 1;

      const content = document.createElement("div");
      content.style.position = "relative";
      content.style.zIndex = 2;
      content.innerHTML = `
        <h3>${route.rute}</h3>
        <p><strong>Tanggal:</strong> ${route.tanggal}</p>
        <p><strong>Waktu:</strong> ${route.waktu}</p>
        <p><strong>Kapal:</strong> ${route.kapal}</p>
        <p><strong>Harga Tiket:</strong> Rp ${route.harga.toLocaleString("id-ID")}</p>
        <button class="btn-secondary pilih-rute-btn" style="margin-top:10px;">Pilih Rute Ini</button>
      `;

      card.appendChild(overlay);
      card.appendChild(content);
      routesContainer.appendChild(card);

      content.querySelector(".pilih-rute-btn").addEventListener("click", () => {
        const fullRoute = `${route.rute} | ${route.tanggal} | ${route.waktu} | ${route.kapal}`;
        selectedRouteInput.value = fullRoute;
        selectedRouteInput.dataset.harga = route.harga;
        window.scrollTo({ top: document.getElementById("booking-form").offsetTop - 50, behavior: "smooth" });
      });
    });
  }

  const bookingForm = document.getElementById("booking-form");
const hasilPesanan = document.getElementById("hasil-pesanan");

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("passenger-name").value.trim();
    const telepon = document.getElementById("phone-number").value.trim();
    const rute = document.getElementById("selected-route").value;
    const hargaPerTiket = parseInt(document.getElementById("selected-route").dataset.harga);
    const jumlah = parseInt(document.getElementById("ticket-quantity").value);
    const totalHarga = hargaPerTiket * jumlah;

    if (nama && telepon && rute && jumlah) {
      
      // ⬇⬇ INI bagian fetch() yang harus kamu tambahkan DI SINI ⬇⬇
      fetch('http://localhost/nama-folder-project/simpan_pesanan.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: nama,
          telepon: telepon,
          rute: rute,
          jumlah: jumlah,
          total_harga: totalHarga
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          hasilPesanan.innerHTML = `
            <h2>Pesanan Berhasil!</h2>
            <p><strong>Nama:</strong> ${nama}</p>
            <p><strong>Telepon:</strong> ${telepon}</p>
            <p><strong>Rute Kapal:</strong> ${rute}</p>
            <p><strong>Jumlah Tiket:</strong> ${jumlah}</p>
            <p><strong>Total Harga:</strong> Rp ${totalHarga.toLocaleString("id-ID")}</p>
            <p>Terima kasih telah memesan tiket kapal laut bersama kami.</p>
          `;
          bookingForm.reset();
          document.getElementById("selected-route").value = "";
          delete document.getElementById("selected-route").dataset.harga;
        } else {
          hasilPesanan.innerHTML = `<p style="color:red;">${data.message}</p>`;
        }
      })
      .catch(error => {
        hasilPesanan.innerHTML = `<p style="color:red;">Terjadi kesalahan saat menyimpan pesanan.</p>`;
        console.error(error);
      });

    } else {
      hasilPesanan.innerHTML = `<p style="color:red;">Harap lengkapi semua data sebelum memesan.</p>`;
    }
  });
}


  // ================== TOGGLE JADWAL ==================
  const btnToggleJadwal = document.getElementById("btn-toggle-jadwal");
  const jadwalSection = document.getElementById("jadwal");

  if (btnToggleJadwal && jadwalSection) {
    btnToggleJadwal.addEventListener("click", () => {
      const isHidden = jadwalSection.classList.toggle("hidden");
      btnToggleJadwal.textContent = isHidden ? "Tampilkan Jadwal" : "Tutup Jadwal";
    });
  }
});
