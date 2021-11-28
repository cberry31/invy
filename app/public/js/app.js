class App {
    constructor() {
        const urlPathString = window.location.pathname;
        const parts = urlPathString.split('/');
        console.log(urlPathString);
        if (parts.length > 2 && parts[1] === 'edit') {
            const itemID = parts[2];
            this._showInventory(itemID);
        } else if (parts[1] === 'search') {
            this._searchInventory();
        } else if (parts[1] === 'add') {
            this._addIntoInventory();
        }
    }

    _searchInventory() {
        const viewContainer = document.querySelector('#search');
        const searchItem = new Search(viewContainer);
    }

    _addIntoInventory() {
        const viewContainer = document.querySelector('#addItem');
        const addItem = new AddItem(viewContainer);
    }

    _showInventory(itemID) {
        const viewContainer = document.querySelector('#editItem');
        const editItem = new EditItem(viewContainer, itemID);
    }
}
