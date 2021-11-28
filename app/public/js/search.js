class Search {
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

        this.box = document.getElementById("searchResults");

        this._onFormChange = this._onFormChange.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._saveValuesFromInput = this._saveValuesFromInput.bind(this);
        this.form.addEventListener('submit', this._onFormSubmit);

        this._saveValuesFromInput();
    }

    _onFormChange() {
        this._saveValuesFromInput();
    }

    async _onFormSubmit(event) {
        event.preventDefault();
        this.box.innerHTML = "";
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

        const result = await fetch('/query', fetchOptions);
        const json = await result.json();
        for (let i in json) {
            this._fillOutResults(json[i]);
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

    _fillOutResults(item) {
        let releventData = {
            brand: item.brand,
            size: item.size,
            category: item.category,
            subcategory: item.subcategory,
            description: item.description,
            styleNum: item.styleNum,
            boxNum: item.boxNum,
            itemNum: item.itemNum,
            Poshmark: item.poshURL,
            eBay: item.ebayURL
        }
        let searchResults = document.createElement("div");
        searchResults.classList.add("rightColumnGrid");
        for (let [key, value] of Object.entries(releventData)) {
            if (value === undefined || value === null) {
                value = "";
            }
            let innerDiv = document.createElement("div");
            innerDiv.classList.add("textData");

            if (key === "Poshmark" || key === "eBay") {
                let a = document.createElement("a");
                a.setAttribute('href', value);
                a.setAttribute('target', '_blank')
                a.classList.add("p_text");
                a.innerHTML = key;
                innerDiv.append(a);
            } else {
                let p = document.createElement("p");
                innerDiv.classList.add("p_text");
                innerDiv.append(value, p);
            }
            searchResults.append(innerDiv);
        }
        let editButton = document.createElement("a");
        editButton.setAttribute('href', `/edit/${item._id}`);
        editButton.setAttribute("style", "text-decoration:none");
        editButton.innerHTML = "<p>EDIT</p>";
        editButton.classList.add("textdata");
        editButton.classList.add("p_text");
        searchResults.append(editButton);
        this.box.append(searchResults);
    }
}