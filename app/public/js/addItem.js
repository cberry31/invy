class addItem {
    constructor(containerElement) {
        this.containerElement = containerElement;

        this.brand = '';
        this.category = '';
        this.subcategory = '';
        this.description = '';
        this.boxNum = '';
        this.itemNum = '';
        this.styleNum = '';
        this.poshURL = '';
        this.ebayURL = '';

        this.brandInput = document.querySelector('#brand');
        this.categoryInput = document.querySelector('#category');
        this.subcategoryInput = document.querySelector('#subcategory');
        this.descriptionInput = document.querySelector('#description');
        this.boxNumInput = document.querySelector('#boxNum');
        this.itemNumInput = document.querySelector('#itemNum');
        this.styleNumInput = document.querySelector('#styleNum');
        this.poshURLInput = document.querySelector('#poshURL');
        this.ebayURLInput = document.querySelector('#ebayURL');

        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.saveValuesFromInput = this.saveValuesFromInput.bind(this);
        this.updateView = this.updateView.bind(this);

        this.styleInput.addEventListener('change', this.onFormChange);
        this.messageInput.addEventListener('keyup', this.onFormChange);
        this.form.addEventListener('submit', this.onFormSubmit);

        this.saveValuesFromInput();
        this.updateView();

    }

    onFormChange() {
        this.saveValuesFromInput();
        this.updateView()
    }

    async onFormSubmit(event) {
        event.preventDefault();

        this.saveValuesFromInput();
        const params = {
            brand =  this.brand,
            category =this.category,
            subcategory = this.subcategory,
            description = this.description,
            boxNum = this.boxNum,
            itemNum = this.itemNum,
            styleNum = this.styleNum,
            poshURL = this.poshURL,
            ebayURL = this.ebayURL
        }

        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        // const result = await fetch('/save', fetchOptions);
        // const json = await result.json();

        // this.creatorView.classList.add('hidden');
        // this.cardLink.href = '/id/' + json.cardId;
        // this.statusView.classList.remove('hidden');
    }

    saveValuesFromInput() {
        this.brand = this.brandInput;
        this.category = this.categoryInput;
        this.subcategory = this.subcategory;
        this.description = this.descriptionInput;
        this.boxNum = this.boxNumInput;
        this.itemNum = this.itemNumInput;
        this.styleNum = this.styleNumInput;
        this.poshURL = this.poshURL;
        this.ebayURL = this.ebayURL;
    }

    updateView() {
        //TODO see what needs to be done here
    }
}