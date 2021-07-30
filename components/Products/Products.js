class Products {
    constructor() {
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить 1';
        this.labelRemove = 'Убрать 1';
    }

    addProduct(id) {
        productUtil.handleAddProduct(id);
    }

    removeProduct(id) {
        productUtil.handleRemoveProduct(id);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

        CATALOG.forEach(({ id, name, price, img }) => {
            const saleIndex = SALES_PRODUCTS.findIndex((product) => id === product.id);
            const saleProduct = SALES_PRODUCTS[saleIndex];

            htmlCatalog += `
                <li class="products-element">
                    <span class="products-element__name">${name}</span>
                    <img class="products-element__img" src="${img}" />
                    <span class="products-element__price">
                    цена за 1 кг: ${price.toLocaleString()} USD
                    </span>
                    <span>${saleIndex === -1 ? '' : `скидка ${(saleProduct.sale * 312.5).toFixed(0)}% за каждый ${saleProduct.each}й кг`}</span>
                    <div>
                    <button class="products-element__btn" onclick="productsPage.addProduct('${id}');">
                        ${this.labelAdd}
                    </button>
                    <button class="products-element__btn" onclick="productsPage.removeProduct('${id}');">
                        ${this.labelRemove}
                    </button>
                    </div>
                </li>
            `;
        });

        const html = `
            <ul class="products-container">
                ${htmlCatalog}
            </ul>
        `;

        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products();
productsPage.render();
