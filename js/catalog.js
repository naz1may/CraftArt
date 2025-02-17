// Массив товаров
const products = [
    { id: 1, name: 'Laptop', description: 'High performance laptop' },
    { id: 2, name: 'Phone', description: 'Latest smartphone' },
    { id: 3, name: 'Headphones', description: 'Noise-cancelling headphones' },
    { id: 4, name: 'Keyboard', description: 'Mechanical keyboard' },
    // Добавьте больше товаров...
];

// Функция для отображения товаров
function displayProducts(productsToShow) {
    const productListContainer = document.querySelector('.product-list');
    productListContainer.innerHTML = ''; // Очищаем контейнер

    // Проходим по отфильтрованным товарам и отображаем их
    productsToShow.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `<h2>${product.name}</h2><p>${product.description}</p>`;
        productListContainer.appendChild(productElement);
    });
}

// Получаем запрос из локального хранилища
const searchQuery = localStorage.getItem('searchQuery');

// Фильтруем товары, если запрос не пустой
if (searchQuery) {
    const filteredProducts = products.filter(product => {
        // Проверяем, содержится ли запрос в названии или описании товара
        return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               product.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
    displayProducts(filteredProducts);
} else {
    // Если нет поискового запроса, показываем все товары
    displayProducts(products);
}

// Очистить локальное хранилище после использования
localStorage.removeItem('searchQuery');
