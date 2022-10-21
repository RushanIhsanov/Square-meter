export default class FavouritesCards {
    constructor(favsList) {
        this.favsList = favsList;
    }

    // Метод по получению объектов c сервера
    async getFavs() {
        const ids = this.favsList.toString(); // 1,2,3,4,5
        const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`;
        const result = await fetch(queryString);
        const data = await result.json();
        this.cards = await data;
    }
}
