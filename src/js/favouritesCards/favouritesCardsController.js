import FavouritesCards from './favouritesCardModel';
import * as view from './favouritesCardsView';
export default async function (state) {
    document.querySelector('#app').innerHTML = '';

    // Получить список объектов которые находятся в избранном

    const favsList = state.favourites.favs;

    // Делаем запрос чтобы получить данных
    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();

    // Отображаем карточки
    view.renderPage(favouriteCards.cards);

    // Запускаем прослушку на иконки добавить в избранное
    addToFavsListener();

    // Нахождение иконок, прослушка, и добавление в избранное
    function addToFavsListener() {
        Array.from(document.getElementsByClassName('card__like')).forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Находим id объекта по которому кликнули
                const currentId = e.target.closest('.card').dataset.id;

                // Добавляем или убираем элемент из избранного
                state.favourites.toggleFav(currentId);

                // Включаем или выключаем иконку с избранным
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
            });
        });
    }
}
