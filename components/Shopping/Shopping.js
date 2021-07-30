class Shopping {
    handleClear() {
        ROOT_SHOPPING.innerHTML = '';
    }

    addProduct(id) {
        productUtil.handleAddProduct(id);
        shoppingPage.render();
    }

    removeProduct(id) {
        productUtil.handleRemoveProduct(id);
        shoppingPage.render();
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        const sumCatalog = productUtil.calcShoppingSum(productsStore);

        CATALOG.forEach(({ id, name, price }) => {
            const index = productsStore.findIndex((product) => id === product.id);
            
            if (index !== -1) {
                const product = productsStore[index];
                const sale = productUtil.calcSale(id, product, price);
                const productTotal = price * product.amount - sale;
                htmlCatalog += `
                    <tr>
                        <td class="shopping-element__name">⚡️ ${name}</td>
                        <td class="shopping-element__price">${price.toLocaleString()} USD</td>
                        <td class="shopping-element__price">${product.amount}</td>
                        <td class="shopping-element__price">${- sale} USD</td>
                        <td class="shopping-element__price">${productTotal.toLocaleString()} USD</td>
                        <td class="shopping-element__price">
                            <button class="shopping-element__btn" onclick="shoppingPage.addProduct('${id}');">
                            +
                            </button>
                            <button class="shopping-element__btn" onclick="shoppingPage.removeProduct('${id}');">
                            -
                            </button>
                        </td>
                    </tr>
                `;
            }
        });

        const html = `
            <div class="shopping-container">
                <div class="shopping__close" onclick="shoppingPage.handleClear();"></div>
                <table>
                    <thead>
                        <tr>
                            <td class="shopping-element__name">Продукт</td>
                            <td class="shopping-element__name">Стоимость</td>
                            <td class="shopping-element__name">Количество</td>
                            <td class="shopping-element__name">Скидка</td>
                            <td class="shopping-element__name">Сумма</td>
                            <td class="shopping-element__name">Управление</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${htmlCatalog}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td class="shopping-element__name">💥 Итого:</td>
                            <td class="shopping-element__price">${sumCatalog.toLocaleString()} USD</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
        ROOT_SHOPPING.innerHTML = html;
    }
}

const shoppingPage = new Shopping();
