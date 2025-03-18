// Массив товаров
const products = [
    // Painting
    { id: 4, name: 'Paint Set', description: 'Professional paint set', img: "/img/products/paint-set.jpg", category: 'painting' },
    { id: 5, name: 'Canvas', description: 'High-quality canvas', img: "/img/products/Canvas.jpg", category: 'painting' },
    { id: 6, name: 'Brushes', description: 'Variety of paint brushes', img: "/img/products/Brushes.jpg", category: 'painting' },
    // Остальные товары...
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
            <img src="${product.img}" alt="${product.name}" />
        `;
        productCardsContainer.appendChild(productCard);
    });
}

// Функция для получения данных с сервера (можно убрать, если данные уже есть на клиенте)
function fetchProducts() {
    fetch('http://localhost:8080/products')  // Запрос к серверу
        .then(response => response.json())  // Парсим JSON-ответ
        .then(data => {
            displayProducts(data.products);  // Отображаем полученные товары
        })
        .catch(error => {
            console.error('Error fetching products:', error);  // Обработка ошибок
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
        displayProducts(products); // Если нет поискового запроса, показываем все товары
    }
}

// Функция для добавления товара в избранное
function addToFavorites(productId) {
    const userId = 1; // Это должно быть ID пользователя, который залогинен. Например, из сессии или токена.

    fetch('http://localhost:8080/add-to-favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            product_id: productId,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Товар добавлен в избранное');
        } else {
            alert('Произошла ошибка');
        }
    })
    .catch(error => {
        console.error('Error adding to favorites:', error);
        alert('Ошибка при добавлении в избранное');
    });
}
// Инициализация
window.onload = () => {
    fetchProducts();  // Загружаем товары с сервера (если нужно)
    
    // Или можно использовать просто:
    // displayProducts(products); // Если товары уже есть в массиве

    // Добавляем обработчик события для нажатия клавиши Enter в поле поиска
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchProducts(); // Вызываем функцию поиска
        }
    });
};
