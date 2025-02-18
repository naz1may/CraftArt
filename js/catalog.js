// Массив товаров
const products = [
    { id: 1, name: 'Laptop', description: 'High performance laptop', img: "https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopsunder500-2048px-5452.jpg", category: 'painting' },
    { id: 2, name: 'Phone', description: 'Latest smartphone', img: "https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopsunder500-2048px-5452.jpg" },
    { id: 3, name: 'Headphones', description: 'Noise-cancelling headphones', img: "https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopsunder500-2048px-5452.jpg" },
    { id: 4, name: 'Keyboard', description: 'Mechanical keyboard', img: "https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopsunder500-2048px-5452.jpg" },
    { id: 5, name: 'Mouse', description: 'Wireless mouse' },
    { id: 6, name: 'Monitor', description: '4K gaming monitor' },
    { id: 7, name: 'Tablet', description: 'Drawing tablet' },
    { id: 8, name: 'Camera', description: 'Mirrorless camera' },
    { id: 9, name: 'Printer', description: 'Color inkjet printer' },
    { id: 10, name: 'Scanner', description: 'Document scanner' },
    { id: 11, name: 'Webcam', description: 'HD webcam' },
    { id: 12, name: 'Microphone', description: 'USB microphone' },
    { id: 13, name: 'Speakers', description: 'Bluetooth speakers' },
    { id: 14, name: 'Smartwatch', description: 'Fitness smartwatch' },
    { id: 15, name: 'Charger', description: 'Fast charger' },
    { id: 16, name: 'Cable', description: 'USB-C cable' },
    { id: 17, name: 'Adapter', description: 'HDMI adapter' },
    { id: 18, name: 'External Hard Drive', description: '1TB external HDD' },
    { id: 19, name: 'SSD', description: '500GB SSD' },
    { id: 20, name: 'RAM', description: '16GB DDR4 RAM' },
    { id: 21, name: 'CPU', description: 'Intel i7 processor' },
    { id: 22, name: 'GPU', description: 'Nvidia RTX graphics card' },
    { id: 23, name: 'Motherboard', description: 'Gaming motherboard' },
    { id: 24, name: 'Power Supply', description: '750W power supply' },
    { id: 25, name: 'Computer Case', description: 'Mid-tower case' },
    { id: 26, name: 'Cooling Fan', description: 'CPU cooling fan' },
    { id: 27, name: 'Liquid Cooler', description: 'AIO liquid cooler' },
    { id: 28, name: 'Gaming Chair', description: 'Ergonomic gaming chair' },
    { id: 29, name: 'Desk', description: 'Standing desk' },
    { id: 30, name: 'Office Chair', description: 'Adjustable office chair' },
    { id: 31, name: 'Mousepad', description: 'Extended gaming mousepad' },
    { id: 32, name: 'VR Headset', description: 'Virtual reality headset' },
    { id: 33, name: 'Game Controller', description: 'Wireless game controller' },
    { id: 34, name: 'Drawing Pen', description: 'Stylus pen' }
  ];

// Функция для отображения товаров
function displayProducts(productsToShow) {
    const productCardsContainer = document.getElementById('productCards');
    productCardsContainer.innerHTML = ''; // Очищаем контейнер

    // Проходим по отфильтрованным товарам и отображаем их
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <img src="${product.img}" alt="error" />
            <cate
        `;
        productCardsContainer.appendChild(productCard);
    });
}

// Функция для поиска товаров
function searchProducts() {
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchQuery) {
        const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchQuery) ||
                   product.description.toLowerCase().includes(searchQuery);
        });
        displayProducts(filteredProducts);
    } else {
        // Если нет поискового запроса, показываем все товары
        displayProducts(products);
    }
}

// Функция для получения параметра из URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Инициализация: показываем все товары при загрузке страницы или отфильтрованные товары, если есть поисковый запрос
window.onload = () => {
    const searchQuery = getQueryParam('search');
    if (searchQuery) {
        document.getElementById('searchInput').value = searchQuery;
        searchProducts();
    } else {
        displayProducts(products);
    }

    // Добавляем обработчик события для нажатия клавиши Enter в поле поиска
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchProducts(); // Вызываем функцию поиска
        }
    });
};