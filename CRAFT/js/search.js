// Функция для перенаправления на страницу каталога
function searchRedirect() {
    // Получаем текст из поля поиска
    const searchQuery = document.querySelector('.search-field').value.trim();

    // Проверяем, что текст не пустой
    if (searchQuery !== "") {
        // Сохраняем запрос в локальном хранилище
        localStorage.setItem('searchQuery', searchQuery);
        // Переходим на страницу каталога с поисковым запросом в URL
        window.location.href = 'catalog.html?search=' + encodeURIComponent(searchQuery);
    } else {
        alert('Введите запрос для поиска!');
    }
}

// Добавляем обработчики событий
document.addEventListener('DOMContentLoaded', function () {
    const searchField = document.querySelector('.search-field');
    const searchButton = document.querySelector('.search-btn');

    // Обработчик события для нажатия клавиши Enter
    searchField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchRedirect(); // Вызываем функцию поиска
        }
    });

    // Обработчик события для клика по кнопке поиска
    searchButton.addEventListener('click', searchRedirect);
});