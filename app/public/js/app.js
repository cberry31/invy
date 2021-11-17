class App {
    constructor() {
        const urlPathString = window.location.pathname;
        const parts = urlPathString.split('/');
        if (parts.length > 2 && parts[1] === 'id') {
            const itemID = parts[2];
            this._showInventory(itemID);
        } else if (parts[1] === 'search') {
            this._searchInventory();
        } else {
            this._addIntoInventory();
        }
    }

    _searchInventory() {
        const viewContainer = document.querySelector('#search');
        //const creatorView = new CreatorView(viewContainer);
        //Do this with the new js files
    }

    _addIntoInventory() {
        const viewContainer = document.querySelector('#add-item');
        //const creatorView = new CreatorView(viewContainer);
        //Do this with the new js files
    }

    _showInventory(itemID) {
        //TODO Add show inventory screen
    }
}
