window.addEventListener("DOMContentLoaded", getApi());

function getApi() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => data.forEach((element) => createProducts(element)));
}

function createProducts(product) {
  const cardProduct = document.createElement("button");
  cardProduct.classList.add("card-products");

  const product_card = document.createElement("div");
  product_card.classList.add("product-card");

  const img = document.createElement("img");
  img.src = product.image;

  const product_title = document.createElement("h2");
  product_title.textContent = product.title;

  const priceAndRating = document.createElement("div");
  priceAndRating.classList.add("price-and-rating");

  const price = document.createElement("span");
  price.classList.add("price");
  price.textContent = `Price: $${product.price}`;

  const rating = document.createElement("i");
  rating.classList.add("fa", "fa-star");
  for (let i = 0; i < product.rating; i++) {
    rating.innerHTML += '<i class=" fa fa-star"></i>';
  }

  cardProduct.addEventListener("click", function () {
    showModal(product);
  });

  function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, mostrar una alerta
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este artículo ya está en tu carrito de compras!",
      });
      existingProduct.quantity += quantity; // Sumar cantidad al producto existente
    } else {
      cart.push({ ...product, quantity: quantity });
      Swal.fire({
        icon: "success",
        title: "¡Correcto!",
        text: "Este artículo fue agregado al carrito de compras!",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  }

  function showModal(product) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.innerHTML = "&times;";

    const productTitle = document.createElement("h2");
    productTitle.textContent = product.title;

    const productImage = document.createElement("img");
    productImage.src = product.image;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.price}`;

    const productRating = document.createElement("p");
    productRating.textContent = `Category: ${product.category}`;

    const productDescription = document.createElement("h2");
    productDescription.textContent = `Description: ${product.description}`;

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = 1; // Valor inicial de la cantidad
    quantityInput.min = 1; // Valor mínimo permitido
    quantityInput.classList.add("quantity-input");

    const carrito = document.createElement("button");
    carrito.classList.add("comprar");
    carrito.innerHTML = "Add to cart";
    carrito.addEventListener("click", function () {
      addToCart(product, parseInt(quantityInput.value));
    });

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(productTitle);
    modalContent.appendChild(productImage);
    modalContent.appendChild(productPrice);
    modalContent.appendChild(productRating);
    modalContent.appendChild(productDescription);
    modalContent.appendChild(quantityInput);
    modalContent.appendChild(carrito);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Agregar evento de clic al botón de cierre del modal
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Mostrar el modal
    modal.style.display = "block";
  }

  cardProduct.appendChild(product_card);
  product_card.appendChild(img);
  product_card.append(product_title);
  priceAndRating.appendChild(price);
  priceAndRating.appendChild(rating);

  document.querySelector(".contenido").appendChild(cardProduct);
}

// Get the cart modal and close button elements
const cartModal = document.getElementById("cart-modal");
const closeButton = document.querySelector(".close");

// Get the shopping cart image element (assuming it has an ID like "shopping-cart")
const shoppingCartImage = document.getElementById("shopping-cart");

// Event listener for opening the cart modal when the shopping cart image is clicked
shoppingCartImage.addEventListener("click", function () {
  cartModal.style.display = "block"; // Show the modal
  updateCartDisplay(); // Update the cart display (function from previous example)
});

// Event listener for closing the cart modal when the close button is clicked
closeButton.addEventListener("click", function () {
  cartModal.style.display = "none"; // Hide the modal
});

// Function to update cart display

function updateCartDisplay() {
  const cartItemsList = document.getElementById("cart-items-list"); // Replace with your cart UI element ID
  cartItemsList.innerHTML = ""; // Clear previous items

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsList.innerHTML = "<li>Your cart is empty</li>";

    return;
  }

  let total = 0;
  cart.forEach((product) => {
    const itemHTML = `
      <li>
        ${product.title}
         x ${product.quantity} - 
         $${product.price * product.quantity}
      </li>
    `;
    cartItemsList.innerHTML += itemHTML;
    total += product.price * product.quantity;
  });

  const cartTotalElement = document.getElementById("cart-total");
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}
