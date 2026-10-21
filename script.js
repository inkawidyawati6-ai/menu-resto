// Filter Kategori
const categoryButtons = document.querySelectorAll('.cat-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');

        menuItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (selectedCategory === 'semua' || itemCategory === selectedCategory) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Sistem Keranjang dan Jumlah (Qty)
let keranjang = {};

function ubahJumlah(namaMenu, harga, perubahan) {
    if (!keranjang[namaMenu]) {
        keranjang[namaMenu] = { harga: harga, jumlah: 0 };
    }

    keranjang[namaMenu].jumlah += perubahan;

    // Pastikan jumlah tidak kurang dari 0
    if (keranjang[namaMenu].jumlah < 0) {
        keranjang[namaMenu].jumlah = 0;
    }

    // Jika jumlah 0, hapus dari objek keranjang
    if (keranjang[namaMenu].jumlah === 0) {
        delete keranjang[namaMenu];
    }

    updateTampilanWeb();
}

function updateTampilanWeb() {
    const orderList = document.getElementById('order-list');
    const totalHargaEl = document.getElementById('total-harga');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    // Update angka di sebelah tombol tambah/kurang (Contoh untuk Nasi Goreng)
    const qtyNasiGoreng = document.getElementById('qty-nasi-goreng');
    if (qtyNasiGoreng) {
        qtyNasiGoreng.innerText = keranjang['Nasi Goreng Spesial'] ? keranjang['Nasi Goreng Spesial'].jumlah : 0;
    }

    const qtyEsTeh = document.getElementById('qty-es-teh');
    if (qtyEsTeh) {
        qtyEsTeh.innerText = keranjang['Es Teh Manis'] ? keranjang['Es Teh Manis'].jumlah : 0;
    }

    // Update Ringkasan Keranjang
    orderList.innerHTML = '';
    let totalHarga = 0;
    let jumlahItemTotal = 0;

    for (let nama in keranjang) {
        let item = keranjang[nama];
        let subtotal = item.harga * item.jumlah;
        totalHarga += subtotal;
        jumlahItemTotal += item.jumlah;

        let li = document.createElement('li');
        li.innerText = `${nama} (${item.jumlah}x) - Rp ${subtotal.toLocaleString('id-ID')}`;
        orderList.appendChild(li);
    }

    if (jumlahItemTotal === 0) {
        orderList.innerHTML = '<li>Belum ada menu yang dipilih.</li>';
        whatsappBtn.disabled = true;
    } else {
        whatsappBtn.disabled = false;
    }

    totalHargaEl.innerText = `Total: Rp ${totalHarga.toLocaleString('id-ID')}`;
}

// Tombol Kirim WhatsApp
document.getElementById('whatsapp-btn').addEventListener('click', () => {
    const nomorKasir = "628123456789"; // Ganti dengan nomor WhatsApp kafe
    let pesan = "Halo Kak, saya ingin memesan:\n\n";
    let totalHargaKeseluruhan = 0;

    for (let nama in keranjang) {
        let item = keranjang[nama];
        let subtotal = item.harga * item.jumlah;
        totalHargaKeseluruhan += subtotal;
        pesan += `- ${nama} (${item.jumlah}x) : Rp ${subtotal.toLocaleString('id-ID')}\n`;
    }

    pesan += `\n*Total Pembayaran: Rp ${totalHargaKeseluruhan.toLocaleString('id-ID')}*\n\nTerima kasih!`;

    const encodedPesan = encodeURIComponent(pesan);
    window.open(`https://wa.me/${nomorKasir}?text=${encodedPesan}`, '_blank');
});
