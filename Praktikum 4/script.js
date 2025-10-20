let daftarBuah = [];

document.getElementById("btnTambah").addEventListener("click", tambahBuah);

function tambahBuah() {
  let nama = document.getElementById("namaBuah").value.trim();
  let harga = document.getElementById("hargaBuah").value.trim();

  if (nama === "" || harga === "") {
    alert("Nama dan harga buah harus diisi!");
    return;
  }

  daftarBuah.push({ nama: nama, harga: parseInt(harga) });
  renderTabel();

  // reset input
  document.getElementById("namaBuah").value = "";
  document.getElementById("hargaBuah").value = "";
}

function renderTabel() {
  let tabel = document.getElementById("tabelBuah");
  tabel.innerHTML = "";

  daftarBuah.forEach((buah, index) => {
    let row = document.createElement("tr");

    let noCell = document.createElement("td");
    noCell.textContent = index + 1;
    row.appendChild(noCell);

    let namaCell = document.createElement("td");
    namaCell.textContent = buah.nama;
    row.appendChild(namaCell);

    let hargaCell = document.createElement("td");
    hargaCell.textContent = formatRupiah(buah.harga);
    row.appendChild(hargaCell);

    let aksiCell = document.createElement("td");
    let btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";
    btnHapus.className = "aksi-btn";
    btnHapus.onclick = function () {
      hapusBuah(index);
    };
    aksiCell.appendChild(btnHapus);
    row.appendChild(aksiCell);

    tabel.appendChild(row);
  });
}

function hapusBuah(index) {
  daftarBuah.splice(index, 1);
  renderTabel();
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(angka);
}
