class AddItem {
    constructor(containerElement) {
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

        this.branPrev = document.querySelector('#brand-preview');

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
        this.finishAdd = document.querySelector('#finish-add');

        this._onFormChange = this._onFormChange.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._saveValuesFromInput = this._saveValuesFromInput.bind(this);
        this.form.addEventListener('submit', this._onFormSubmit);

        this.containerElement.classList.remove('hidden');

        this._saveValuesFromInput();
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
            ebayURL: this.ebayURL
        }

        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        const result = await fetch('/save', fetchOptions);
        const json = await result.json();
        if (json._id === -1) {
            alert("Error: There was an error adding your item please try agian");
        } else {
            this.containerElement.classList.add('hidden');
            this.finishAdd.classList.remove('hidden');
        }
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
}