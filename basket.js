"use strict";

const cartIconWrap = document.querySelector('.cartIconWrap');
const basketCounter = cartIconWrap.querySelector('span');

const basketEl = document.querySelector('.basket');
const basketTotal = basketEl.querySelector('.basketTotal');
const basketTotalValue = basketTotal.querySelector('.basketTotalValue');

cartIconWrap.addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }

    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;

    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 }
    }

    basket[id].count++;

    basketCounter.textContent = getTotalBasketCount();
    basketTotal.textContent = getTotalBasketPrice();

    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, p) => acc + p.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket).reduce((acc, p) => acc + p.price * p.count, 0);
}

function renderProductInBasket(productId) {
    const RowEl = basketEl.querySelector(`.basketRow[data-id="${productId}"]`);
    if (!RowEl) {
        renderNewProductInBasket(productId);
        return;
    }

    const product = basket[productId];

    RowEl.querySelector('.productCount').textContent = product.count;

    RowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count);
}

function renderNewProductInBasket(id) {
    const el = basket[id];
    const productRow = `
      <div class="basketRow" data-id="${id}">
        <div>${el.name}</div>
        <div>
          <span class="productCount">${basket[id].count}</span> шт.
        </div>
        <div>$${el.price}</div>
        <div>
          $<span class="productTotalRow">${(el.price * el.count)}</span>
        </div>
      </div>
      `;
    basketTotal.insertAdjacentHTML("beforebegin", productRow);
}