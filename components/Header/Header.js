class Header {
    handlerOpenShoppingPage() {
        shoppingPage.render();
    }

    render(sum) {
        const html = `
           <div class="header-container">
                <button onclick="shoppingPage.render()">
        text
                </button>
                <div class="header-counter" onclick="headerPage.handlerOpenShoppingPage();">
                🗑 ${sum} USD
                </div>
           </div>
        `;

        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header();

const productsStore = localStorageUtil.getProducts();
headerPage.render(productUtil.calcShoppingSum(productsStore));
