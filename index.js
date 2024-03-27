document.addEventListener('DOMContentLoaded', function() {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const productsList = document.querySelector('.container-items');
    const rowProduct = document.querySelector('.row-product');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartTotal = document.querySelector('.cart-total');
    const cartEmpty = document.querySelector('.cart-empty');
    const btnComprar = document.querySelector('.btn-comprar');
    const btnWhatsApp = document.querySelector('.btn-whatsapp'); // Nuevo: Agregar el botón de WhatsApp

    let allProducts = [];

    btnCart.addEventListener('click', function() {
        containerCartProducts.classList.toggle('hidden-cart');
    });

    productsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-add-cart')) {
            const product = event.target.closest('.item');
            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h2').textContent,
                price: parseFloat(product.querySelector('.price').textContent.replace('$', '').replace(/,/g, '')),
            };
    
            const exists = allProducts.some(function(p) {
                return p.title === infoProduct.title;
            });
    
            if (exists) {
                allProducts.forEach(function(p) {
                    if (p.title === infoProduct.title) {
                        p.quantity++;
                    }
                });
            } else {
                allProducts.push(infoProduct);
            }

            showHTML();
        }  
    });
    
    rowProduct.addEventListener('click', function(event) {
        if (event.target.classList.contains('icon-close')) {
            const productTitle = event.target.parentElement.querySelector('.titulo-producto-carrito').textContent;
            allProducts = allProducts.filter(function(p) {
                return p.title !== productTitle;
            });

            showHTML();
        }
    });

    function showHTML() {
        rowProduct.innerHTML = '';
    
        let total = 0;
        let totalOfProducts = 0;
    
        allProducts.forEach(function(product) {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');
    
            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">$${(product.price * product.quantity).toLocaleString()}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-close">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            `;
    
            rowProduct.append(containerProduct);
    
            total += product.price * product.quantity;
            totalOfProducts += product.quantity;
        });
    
        valorTotal.innerText = `$${total.toLocaleString()}`;
        countProducts.innerText = totalOfProducts;

        // Ocultar el mensaje de carrito vacío cuando haya productos en el carrito
        if (allProducts.length > 0) {
            cartEmpty.classList.add('hidden');
            rowProduct.classList.remove('hidden');
            cartTotal.classList.remove('hidden');
        }
    }
    

    btnComprar.addEventListener('click', function() {
        if (allProducts.length === 0) {
            alert('El carrito está vacío. Añade productos antes de proceder al pago.');
        } else {
            window.location.href = 'Formulario de pago.html';
        }
    });

    // Nuevo: Agregar la funcionalidad del botón de WhatsApp
    btnWhatsApp.addEventListener('click', function() {
        // Reemplaza '1234567890' con el número de WhatsApp al que deseas redirigir
        window.location.href = 'https://api.whatsapp.com/send?phone=3114156844';
    });
});
