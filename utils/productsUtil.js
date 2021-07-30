class ProductUtil {

    calcShoppingSum(products) {
        return CATALOG.reduce(
            (accum, { id, price }) =>{
                const index = products.findIndex((product) => id === product.id);
                
                if (index !== -1) {
                    const product = products[index];
                    const total = price * product.amount;
                    return accum + total - this.calcSale(id, product, price);
                 }
                 else {
                    return accum;
                 }
            },
            0
        )
    }

    calcSale(id, product, price) {
        const saleIndex = SALES_PRODUCTS.findIndex((product) => id === product.id);
        if (saleIndex === -1) {
            return 0;
        }

        const saleProduct = SALES_PRODUCTS[saleIndex];

        const saleCount = Math.trunc(product.amount / saleProduct.each);
        const sale = price * saleProduct.each * (saleProduct.sale * saleCount);

        return Math.ceil(sale);
    }

    handleAddProduct(id) {
        const products = localStorageUtil.getProducts();
        
        let isSuccess = false;
        const index = products.findIndex((product) => id === product.id);
        
        if (index === -1) {
            const newProduct = { id, amount: 1 }
            products.push(newProduct);
            isSuccess = true;
        } else {
            const product = products[index];
            products.splice(index, 1, { ...product, amount: product.amount + 1 });
            isSuccess = true;
        }
        if (!isSuccess) {
            return;
        }

        localStorageUtil.setProducts(products);
        headerPage.render(productUtil.calcShoppingSum(products));
    }

    handleRemoveProduct(id) {
        const products = localStorageUtil.getProducts();

        let isSuccess = false;
        const index = products.findIndex((product) => id === product.id);
        
        if (index === (-1)) {
            isSuccess = false;
        } else {
            const product = products[index];

            if(product.amount <= 1) {
                products.splice(index, 1);
            } else {
                products.splice(index, 1, { ...product, amount: product.amount - 1 });
            }
            isSuccess = true;
        }
        if (!isSuccess) {
            return;
        }

        localStorageUtil.setProducts(products);
        headerPage.render(productUtil.calcShoppingSum(products));
    }
}

const productUtil = new ProductUtil();

