// 🚀 API key kamu sudah dimasukkan di bawah
const apiKey = "6a3kzImeiKOUgkdlRgJo37iOENFfqSXL9WcNEkDe";

// elemen DOM
const btn = document.getElementById("getImage");
const titleEl = document.getElementById("title");
const dateTextEl = document.getElementById("dateText");
const descEl = document.getElementById("description");
const mediaDiv = document.getElementById("media");
const dateInputEl = document.getElementById("date");

// Periksa API key saat load agar user tahu kalau belum diganti (atau key kosong)
document.addEventListener("DOMContentLoaded", () => {
  if (!apiKey || apiKey.trim() === "") {
    titleEl.innerText = "Error";
    dateTextEl.innerText = "";
    descEl.innerText = "API key belum diisi. Dapatkan API key di https://api.nasa.gov/ lalu masukkan ke file script.js.";
    mediaDiv.innerHTML = "";
  }
});

btn.addEventListener("click", () => {
  if (!apiKey || apiKey.trim() === "") {
    alert("API key belum diisi. Silakan dapatkan API key di https://api.nasa.gov/ dan masukkan ke script.js");
    return;
  }

  const dateInput = dateInputEl.value;
  if (!dateInput) {
    alert("Pilih tanggal terlebih dahulu!");
    return;
  }

  // Pastikan format YYYY-MM-DD
  const date = new Date(dateInput).toISOString().split("T")[0];
  getApod(date);
});

async function getApod(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(apiKey)}&date=${date}`;

  // reset tampilan sebelum fetch
  titleEl.innerText = "Loading...";
  dateTextEl.innerText = "";
  descEl.innerText = "";
  mediaDiv.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Jika API mengembalikan error (limit, invalid key, dll)
    if (data.error || data.code || data.msg) {
      const errMsg = (data.error && data.error.message) || data.msg || data.message || JSON.stringify(data);
      titleEl.innerText = "Error";
      dateTextEl.innerText = "";
      descEl.innerText = errMsg;
      mediaDiv.innerHTML = "";
      return;
    }

    // Tampilkan data jika valid
    titleEl.innerText = data.title || "Tidak ada judul";
    dateTextEl.innerText = data.date ? ("Tanggal: " + data.date) : "";
    descEl.innerText = data.explanation || "";

    mediaDiv.innerHTML = "";
    if (data.media_type === "image") {
      // Gunakan hdurl jika tersedia, fallback ke url
      const imgSrc = data.hdurl || data.url;
      mediaDiv.innerHTML = `<img src="${imgSrc}" alt="${escapeHtml(data.title || "")}">`;
    } else if (data.media_type === "video") {
      // Banyak video APOD adalah YouTube embed URL yang bisa langsung dimasukkan ke iframe
      mediaDiv.innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      mediaDiv.innerText = "Tipe media tidak dikenali: " + (data.media_type || "unknown");
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    titleEl.innerText = "Terjadi kesalahan!";
    dateTextEl.innerText = "";
    descEl.innerText = "Gagal mengambil data dari API. Cek koneksi atau API key.";
    mediaDiv.innerHTML = "";
  }
}

// helper kecil untuk escape teks di atribut alt
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
