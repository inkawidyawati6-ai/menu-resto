// Mengambil semua tombol kategori dan item menu
const categoryButtons = document.querySelectorAll('.cat-btn');
const menuItems = document.querySelectorAll('.menu-item');

// Menambahkan fungsi klik ke setiap tombol kategori
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Menghapus kelas 'active' dari semua tombol
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Menambahkan kelas 'active' ke tombol yang sedang diklik
        button.classList.add('active');

        // Mendapatkan kategori yang dipilih dari atribut data-category
        const selectedCategory = button.getAttribute('data-category');

        // Menyaring menu berdasarkan kategori
        menuItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (selectedCategory === 'semua' || itemCategory === selectedCategory) {
                item.style.display = 'flex'; // Tampilkan item
            } else {
                item.style.display = 'none'; // Sembunyikan item
            }
        });
    });
});
