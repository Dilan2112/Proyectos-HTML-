const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const buyButtonContainer = document.querySelector('.buy-button-container');
const cartEmpty = document.querySelector('.cart-empty');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartTotal = document.querySelector('.cart-total');
const rowProduct = document.querySelector('.row-product');

const allProducts = [];

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const productsList = document.querySelector('.container-items');

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.closest('.item');
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('.price').textContent,
        };

        const existingProduct = allProducts.find(p => p.title === infoProduct.title);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            allProducts.push(infoProduct);
        }

        showHTML();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.closest('.cart-product');
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        const index = allProducts.findIndex(p => p.title === title);
        allProducts.splice(index, 1);

        showHTML();
    }
});

const showHTML = () => {
    if (allProducts.length === 0) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
        buyButtonContainer.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
        buyButtonContainer.classList.remove('hidden');
    }

    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');
    
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;
    
        rowProduct.append(containerProduct);
    
        // Convertir el precio a número eliminando el símbolo de la moneda y los separadores de miles
        const priceNum = parseFloat(product.price.replace(/[^\d.]/g, ''));
        total += product.quantity * priceNum;
        totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total.toLocaleString()}`;
    countProducts.innerText = totalOfProducts;

    // Ocultar el botón de compra si el carrito está vacío
    if (allProducts.length === 0) {
        buyButtonContainer.classList.add('hidden');
    } else {
        buyButtonContainer.classList.remove('hidden');
    }
};

// Redireccionar a la página del formulario de pago cuando se hace clic en el botón de compra
buyButtonContainer.addEventListener('click', () => {
    // Verificar si el carrito está vacío antes de redireccionar
    if (allProducts.length === 0) {
        alert('El carrito está vacío. Añada productos antes de proceder al pago.');
    } else {
        window.location.href = 'Formulario/Formulario.de.pago.html';
    }
});
