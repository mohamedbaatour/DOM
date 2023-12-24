const items = [
  {
    id: 1,
    name: "Predator Helios 300",
    price: 1200,
    quantity: 0,
    liked: false,
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81g7AiqWrtL.jpg",
  },
  {
    id: 2,
    name: "RTX 4090",
    price: 2000,
    quantity: 0,
    liked: false,
    image: "https://apibackend.megapc.tn//uploads/gallerie/1665750872496.webp",
  },
];

function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceElement = document.getElementById("total-price");
  let totalPrice = 0;

  cartContainer.innerHTML = "";

  items.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("card");

    const productImage = document.createElement("img");
    productImage.src = item.image;
    productImage.alt = item.name;
    productImage.classList.add("product-image");

    const quantityControls = document.createElement("div");
    const quantityPlusBtn = document.createElement("button");
    const quantityMinusBtn = document.createElement("button");
    quantityPlusBtn.textContent = "+";
    quantityMinusBtn.textContent = "-";
    quantityControls.appendChild(quantityMinusBtn);

    const quantityText = document.createElement("span");
    quantityText.id = `item-${item.id}-quantity`;
    quantityText.textContent = ` ${item.quantity} `;
    quantityControls.appendChild(quantityText);

    quantityControls.appendChild(quantityPlusBtn);

    const likeBtn = document.createElement("button");
    likeBtn.innerHTML = item.liked ? "❤️" : "🤍";
    likeBtn.classList.add("like-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#10006;";
    deleteBtn.classList.add("delete-btn");

    itemContainer.appendChild(deleteBtn);
    itemContainer.appendChild(likeBtn);
    itemContainer.appendChild(productImage);
    itemContainer.appendChild(document.createElement("br"));
    itemContainer.appendChild(document.createTextNode(item.name));
    itemContainer.appendChild(document.createElement("br"));
    itemContainer.appendChild(
      document.createTextNode(`$${item.price.toFixed(2)}`)
    );
    itemContainer.appendChild(document.createElement("br"));
    itemContainer.appendChild(quantityControls);
    itemContainer.appendChild(document.createElement("br"));

    if (item.quantity > 0) {
      itemContainer.appendChild(
        document.createTextNode(`$${(item.price * item.quantity).toFixed(2)}`)
      );
    }

    quantityPlusBtn.addEventListener("click", () => {
      item.quantity++;
      totalPrice += item.price;
      updateTotalPrice();
      updateQuantityText(item.id, item.quantity);
    });

    quantityMinusBtn.addEventListener("click", () => {
      if (item.quantity > 0) {
        item.quantity--;
        totalPrice -= item.price;
        updateTotalPrice();
        updateQuantityText(item.id, item.quantity);
      }
    });

    likeBtn.addEventListener("click", () => {
      item.liked = !item.liked;
      likeBtn.innerHTML = item.liked ? "❤️" : "🤍";
    });

    deleteBtn.addEventListener("click", () => {
      deleteItem(item.id);
      renderCart();
    });

    cartContainer.appendChild(itemContainer);
  });

  function updateTotalPrice() {
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  function updateQuantityText(itemId, newQuantity) {
    const quantityText = document.querySelector(
      `#cart-container #item-${itemId}-quantity`
    );
    if (quantityText) {
      quantityText.textContent = ` ${newQuantity} `;
    }
  }

  function deleteItem(itemId) {
    const index = items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      totalPrice -= items[index].price * items[index].quantity;
      items.splice(index, 1);
      updateTotalPrice();
    }
  }
}

renderCart();
