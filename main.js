let shop = document.getElementById("shop");
let ShopItemData = [
  {
    id: "jsndcp",
    name: "casual shirt",
    price: 45,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg",
  },
  {
    id: "iudjhsc",
    name: "Office shirt",
    price: 100,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
  {
    id: "ieorncdfij",
    name: "t shirt",
    price: 25,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg",
  },
  {
    id: "whdcjsdbvs",
    name: "mens suit",
    price: 300,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg",
  },
];

let basket = [];
basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = ShopItemData.map((x) => {
    let { id, desc, img, name, price } = x;
    let search = basket.find((x) => x.id === id) || [];
    return `
    <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price}</h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash"></i>
            <div id=${id} class="quantity">${
      search.item === undefined ? 0 : search.item
    }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>
    `;
  }).join(""));
};
generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
  console.log(basket);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
  console.log(basket);
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
