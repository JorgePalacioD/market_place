window.addEventListener('DOMContentLoaded', getApi())

function getApi() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => data.forEach(element => createProducts(element)))

}

function createProducts(product) {
  const cardProduct = document.createElement('button');
  cardProduct.classList.add('card-products');

  const product_card = document.createElement('div');
  product_card.classList.add('product-card');

  const img = document.createElement('img');
  img.src = product.image;

  const product_title = document.createElement('h2');
  product_title.textContent = product.title;


  const priceAndRating = document.createElement('div');
  priceAndRating.classList.add("price-and-rating");

  const price = document.createElement('span');
  price.classList.add('price');
  price.textContent = `Price: $${product.price}`;

  const rating = document.createElement('i');
  rating.classList.add('fa', 'fa-star');
  for (let i = 0; i < product.rating; i++) {
    rating.innerHTML += '<i class=" fa fa-star"></i>'
  }


  cardProduct.addEventListener('click', function () {
    showModal(product);
  });
  function showModal(product) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';

    const productTitle = document.createElement('h2');
    productTitle.textContent = product.title;

    const productImage = document.createElement('img');
    productImage.src = product.image;

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: $${product.price}`;

    const productRating = document.createElement('p');
    productRating.textContent = `Rating: ${product.rating}`;

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(productTitle);
    modalContent.appendChild(productImage);
    modalContent.appendChild(productPrice);
    modalContent.appendChild(productRating);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Agregar evento de clic al botón de cierre del modal
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    // Mostrar el modal
    modal.style.display = 'block';
  }

  cardProduct.appendChild(product_card);
  product_card.appendChild(img);
  product_card.append(product_title);
  priceAndRating.appendChild(price);
  priceAndRating.appendChild(rating);

  document.querySelector('.contenido').appendChild(cardProduct)
}

