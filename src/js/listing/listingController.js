import * as view from './listingView';

export default function (state) {
    // Рендер контейнера для карточек
    view.render();

    // Рендер карточек
    state.results.forEach(function (item) {
        view.renderCard(item, state.favourites.isFav(item.id));
    });

    // Запускаем прослушку на иконки добавить в избранное
    addToFavsListener();

    state.emitter.subscribe('event:render-listing', () => {
        // Очистим контейнер с карточками
        view.clearListingContainer();
        // Отрендерить карточки
        state.results.forEach(function (item) {
            view.renderCard(item, state.favourites.isFav(item.id));
        });

        // Запускаем прослушку на иконки добавить в избранное
        addToFavsListener();
    });

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
