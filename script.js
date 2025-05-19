const cart = [];
const cartList = document.getElementById("cart");
const commentInput = document.getElementById("comment");

document.querySelectorAll(".item button").forEach(button => {
  button.addEventListener("click", e => {
    const itemDiv = e.target.parentElement;
    const title = itemDiv.dataset.title;
    const price = parseInt(itemDiv.dataset.price);
    cart.push({ title, price });

    const li = document.createElement("li");
    li.textContent = `${title} — ${price}₽`;
    cartList.appendChild(li);
  });
});

document.getElementById("submit").addEventListener("click", () => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const comment = commentInput.value || "—";

  const data = {
    items: cart,
    total: total,
    comment: comment
  };

  Telegram.WebApp.sendData(JSON.stringify(data));
  Telegram.WebApp.close();
});


const tg = window.Telegram.WebApp;
tg.expand(); // раскрываем окно WebApp

document.querySelector('#submit-btn').addEventListener('click', () => {
    const cartItems = Array.from(document.querySelectorAll('.cart-item')).map(el => el.textContent);
    const comment = document.querySelector('#comment').value;

    const orderData = {
        items: cartItems,
        comment: comment
    };

    tg.sendData(JSON.stringify(orderData));
});
