import SingleItem from './singleItemModel';
import * as view from './singleItemView';

export default async function (state) {
    // Создаем новый объект singleItem
    state.singleItem = new SingleItem(state.routeParams);

    // Получаем данные с сервера
    await state.singleItem.getItem();

    // Отрисовываем разметку для отдельного объекта
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    //================================
    // Запустить прослушку событий
    //================================

    // 1. Открытие модального окна

    document.querySelector('.button-order').addEventListener('click', () => {
        view.showModal();
    });

    // 2. Закрытие модального окна по кнопке

    document.querySelector('.modal__close').addEventListener('click', () => {
        view.hideModal();
    });

    // 3. Закрытие модального окна клик по оверлэю

    document.querySelector('.modal-wrapper').addEventListener('click', (e) => {
        if (e.target.closest('.modal')) {
            return null;
        } else {
            view.hideModal();
        }
    });

    // Отправка формы

    document.querySelector('.modal__form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = view.getInput();
        await state.singleItem.submitForm(formData);

        const response = state.singleItem.response;

        if (response.message === 'Bid Created') {
            alert('Ваша заявка успешно добавлена');
            view.hideModal();
            view.clearInput();
        } else if (response.message === 'Bid Not Created') {
            response.errors.forEach((item) => {
                alert(item);
            });
        }
    });

    // Клик по кнопке добавить в избранное
    document.querySelector('#addToFavouriteButton').addEventListener('click', function () {
        state.favourites.toggleFav(state.singleItem.id);
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    });
}
