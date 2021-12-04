class EditItem {
    constructor(containerElement, itemId) {
        this.containerElement = containerElement;
        this.brand = '';
        this.category = '';
        this.subcategory = '';
        this.description = '';
        this.boxNum = '';
        this.itemNum = '';
        this.styleNum = '';
        this.size = '';
        this.poshURL = '';
        this.ebayURL = '';

        this.itemId = itemId;

        this.form = document.querySelector('form');
        this.brandInput = document.querySelector('#brand');
        this.categoryInput = document.querySelector('#category');
        this.subcategoryInput = document.querySelector('#subcategory');
        this.descriptionInput = document.querySelector('#description');
        this.boxNumInput = document.querySelector('#boxNum');
        this.itemNumInput = document.querySelector('#itemNum');
        this.styleNumInput = document.querySelector('#styleNum');
        this.sizeInput = document.querySelector('#size');
        this.poshURLInput = document.querySelector('#poshURL');
        this.ebayURLInput = document.querySelector('#ebayURL');
        this.addItem = document.querySelector("#add-item");
        this.finishDelete = document.querySelector('#finish-delete')

        this._onFormChange = this._onFormChange.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._onDelete = this._onDelete.bind(this);
        this._saveValuesFromInput = this._saveValuesFromInput.bind(this);
        document.getElementById('submit').addEventListener("click", this._onFormSubmit);
        document.getElementById('delete').addEventListener("click", this._onDelete);

        this.containerElement.classList.remove('hidden');

        this._loadValues();
    }

    _onFormChange() {
        this._saveValuesFromInput();
    }

    async _onFormSubmit(event) {
        event.preventDefault();
        this._saveValuesFromInput();
        const params = {
            brand: this.brand,
            category: this.category,
            subcategory: this.subcategory,
            description: this.description,
            boxNum: this.boxNum,
            itemNum: this.itemNum,
            styleNum: this.styleNum,
            size: this.size,
            poshURL: this.poshURL,
            ebayURL: this.ebayURL,
            _id: this.itemId
        }

        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        const result = await fetch('/saveEdit', fetchOptions);
        const json = await result.json();
    }

    _saveValuesFromInput() {
        this.brand = this.brandInput.value;
        this.category = this.categoryInput.value;
        this.subcategory = this.subcategoryInput.value;
        this.description = this.descriptionInput.value;
        this.boxNum = this.boxNumInput.value;
        this.itemNum = this.itemNumInput.value;
        this.styleNum = this.styleNumInput.value;
        this.size = this.sizeInput.value;
        this.poshURL = this.poshURLInput.value;
        this.ebayURL = this.ebayURLInput.value;
    }

    async _loadValues() {
        const result = await fetch(`/get/${this.itemId}`);
        const json = await result.json();
        this.brandInput.value = this.getValue(json.brand);
        this.categoryInput.value = this.getValue(json.category);
        this.subcategoryInput.value = this.getValue(json.subcategory);
        this.descriptionInput.value = this.getValue(json.description);
        this.boxNumInput.value = this.getValue(json.boxNum);
        this.itemNumInput.value = this.getValue(json.itemNum);
        this.styleNumInput.value = this.getValue(json.styleNum);
        this.sizeInput.value = this.getValue(json.size);
        this.poshURLInput.value = this.getValue(json.poshURL);
        this.ebayURLInput.value = this.getValue(json.ebayURL);
        this._saveValuesFromInput();
    }

    getValue(input) {
        if (input === undefined || input === null) {
            input = "";
        }
        return input;
    }

    async _onDelete(event) {
        event.preventDefault();
        console.log("DELETE")
        const params = {
            _id: this.itemId
        }

        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        const result = await fetch('/delete', fetchOptions);
        const json = await result.json();
        this.containerElement.classList.add('hidden');
        this.finishDelete.classList.remove('hidden');
    }
}