// $(document).ready(function(){
//     console.log('Документ загружен!');
    
//     let position = 0;
//     const slidesToShow = 1;
//     const slidesToScroll = 1;
//     const container = $('.slider-container');
//     const track = $('.slider-track');
//     const item = $('.slider-item');
//     const btnPrev = $('.btn-prev');
//     const btnNext = $('.btn-next');
//     const itemWidth = container.width() / slidesToShow;

//     item.each(function (index, item){
//         $(item).css({
//             minWidth: itemWidth,
//         })
//     });

//     btnPrev.click(function(){
//         console.log('btnPrev');
//     })
//     btnNext.click(function(){
//         console.log('btnNext');
//     })
// })

// Функция для перенаправления на страницу каталога
function searchRedirect() {
    // Получаем текст из поля поиска
    const searchQuery = document.querySelector('.search-field').value.trim();

    // Проверяем, что текст не пустой
    if (searchQuery !== "") {
        // Сохраняем запрос в локальном хранилище
        localStorage.setItem('searchQuery', searchQuery);
        // Переходим на страницу каталога
        window.location.href = 'catalog.html';
    } else {
        alert('Введите запрос для поиска!');
    }
}
