class LocalStorageUtil {
    constructor() {
        this.keyName = 'products';
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    setProducts(products) {
        localStorage.setItem(this.keyName, JSON.stringify(products));
    }
}

const localStorageUtil = new LocalStorageUtil();
