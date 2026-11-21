const products = [
  {id:1,name:"POCO C71 4/128GB",brand:"POCO",category:"phone",price:12890,old:14990,discount:14,image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"},
  {id:2,name:"iPhone 15 Pro",brand:"Apple",category:"phone",price:74900,old:82900,discount:10,image:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"},
  {id:3,name:"Samsung Galaxy S24",brand:"Samsung",category:"phone",price:58900,old:64900,discount:9,image:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500"},
  {id:4,name:"Xiaomi Redmi Note",brand:"Xiaomi",category:"phone",price:18900,old:21900,discount:14,image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"},
  {id:5,name:"MacBook Air",brand:"Apple",category:"laptop",price:89900,old:99900,discount:10,image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"},
  {id:6,name:"HP Laptop 15",brand:"HP",category:"laptop",price:52900,old:57900,discount:9,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"},
  {id:7,name:"Lenovo IdeaPad",brand:"Lenovo",category:"laptop",price:45900,old:49900,discount:8,image:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"},
  {id:8,name:"Samsung Galaxy Tab",brand:"Samsung",category:"accessory",price:28900,old:31900,discount:9,image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"},
  {id:9,name:"AirPods Pro",brand:"Apple",category:"audio",price:17900,old:19900,discount:10,image:"https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500"},
  {id:10,name:"Sony Headphones",brand:"Sony",category:"audio",price:12900,old:14900,discount:13,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"},
  {id:11,name:"JBL Speaker",brand:"JBL",category:"audio",price:6900,old:7900,discount:12,image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"},
  {id:12,name:"Samsung Watch",brand:"Samsung",category:"watch",price:14900,old:16900,discount:12,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"},
  {id:13,name:"Apple Watch",brand:"Apple",category:"watch",price:29900,old:33900,discount:12,image:"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"},
  {id:14,name:"Xiaomi Power Bank",brand:"Xiaomi",category:"power",price:3450,old:3990,discount:14,image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500"},
  {id:15,name:"ACEFAST Power Bank",brand:"ACEFAST",category:"power",price:1650,old:1990,discount:17,image:"https://images.unsplash.com/photo-1609592806596-b43bada2f0c4?w=500"},
  {id:16,name:"iPhone Charger",brand:"Apple",category:"accessory",price:2500,old:2990,discount:16,image:"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500"},
  {id:17,name:"Gaming Controller",brand:"Sony",category:"gaming",price:7900,old:8900,discount:11,image:"https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500"},
  {id:18,name:"PlayStation 5",brand:"Sony",category:"gaming",price:59900,old:64900,discount:8,image:"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500"},
  {id:19,name:"Samsung TV",brand:"Samsung",category:"tv",price:49900,old:54900,discount:9,image:"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500"},
  {id:20,name:"Computer Monitor",brand:"Samsung",category:"accessory",price:18900,old:21900,discount:14,image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"}
];

let cart = JSON.parse(localStorage.getItem("mgCart") || "[]");
let favorites = JSON.parse(localStorage.getItem("mgFavorites") || "[]");
let orders = JSON.parse(localStorage.getItem("mgOrders") || "[]");
let activeCategory = "all";

const $ = id => document.getElementById(id);
const money = value => value.toLocaleString("ru-RU") + " сом";

function saveData() {
  localStorage.setItem("mgCart", JSON.stringify(cart));
  localStorage.setItem("mgFavorites", JSON.stringify(favorites));
  localStorage.setItem("mgOrders", JSON.stringify(orders));
}

function openModal(id) {
  $(id).classList.add("show");
}

function closeModal(id) {
  $(id).classList.remove("show");
}

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => closeModal(button.dataset.close));
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) modal.classList.remove("show");
  });
});

function renderProducts() {
  const query = $("searchInput").value.toLowerCase().trim();
  const min = Number($("minPrice").value) || 0;
  const max = Number($("maxPrice").value) || Infinity;
  const selectedBrands = [...document.querySelectorAll('input[name="brand"]:checked')].map(x => x.value);
  const discountOnly = $("discountOnly").checked;

  let list = products.filter(p => {
    const matchesQuery = (p.name + " " + p.brand).toLowerCase().includes(query);
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesPrice = p.price >= min && p.price <= max;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const matchesDiscount = !discountOnly || p.discount > 0;

    return matchesQuery && matchesCategory && matchesPrice && matchesBrand && matchesDiscount;
  });

  const sort = $("sortSelect").value;

  if (sort === "low") list.sort((a,b) => a.price - b.price);
  if (sort === "high") list.sort((a,b) => b.price - a.price);
  if (sort === "name") list.sort((a,b) => a.name.localeCompare(b.name));

  $("productCount").textContent = `${list.length} товар`;

  const grid = $("productGrid");
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = '<div class="empty">Товар табылган жок 😔</div>';
    return;
  }

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageArea = document.createElement("div");
    imageArea.className = "product-image";

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;
    img.loading = "lazy";
    img.onerror = () => {
      img.src = "https://placehold.co/400x300?text=MARKET+GO";
    };

    imageArea.appendChild(img);

    if (p.discount) {
      const discount = document.createElement("span");
      discount.className = "discount";
      discount.textContent = "-" + p.discount + "%";
      imageArea.appendChild(discount);
    }

    const heart = document.createElement("button");
    heart.className = "heart" + (favorites.includes(p.id) ? " active" : "");
    heart.textContent = favorites.includes(p.id) ? "♥" : "♡";
    heart.setAttribute("aria-label", "Избранное");
    heart.addEventListener("click", () => toggleFavorite(p.id));
    imageArea.appendChild(heart);

    const brand = document.createElement("p");
    brand.className = "product-brand";
    brand.textContent = p.brand;

    const name = document.createElement("h3");
    name.textContent = p.name;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = money(p.price);

    const old = document.createElement("span");
    old.className = "old-price";
    old.textContent = money(p.old);
    price.appendChild(old);

    const monthly = document.createElement("p");
    monthly.className = "monthly";
    monthly.textContent = "◉ Бөлүп төлөө мүмкүнчүлүгү";

    const buy = document.createElement("button");
    buy.className = "buy-btn";
    buy.textContent = "🛒 Себетке кошуу";
    buy.addEventListener("click", () => addToCart(p.id));

    card.append(imageArea, brand, name, price, monthly, buy);
    grid.appendChild(card);
  });
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
  } else {
    favorites.push(id);
  }

  saveData();
  renderProducts();
  renderFavorites();
}

function renderFavorites() {
  const area = $("favoriteItems");
  area.innerHTML = "";

  const list = products.filter(p => favorites.includes(p.id));

  if (!list.length) {
    area.innerHTML = '<p class="empty">Избранное азырынча бош.</p>';
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "mini-card";

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;

    const name = document.createElement("p");
    name.textContent = p.name;

    const price = document.createElement("b");
    price.textContent = money(p.price);

    const button = document.createElement("button");
    button.className = "buy-btn";
    button.textContent = "Себетке кошуу";
    button.onclick = () => addToCart(p.id);

    card.append(img, name, price, button);
    area.appendChild(card);
  });
}

function addToCart(id) {
  const item = cart.find(x => x.id === id);

  if (item) item.quantity++;
  else cart.push({id, quantity:1});

  saveData();
  renderCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(x => x.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(x => x.id !== id);
  }

  saveData();
  renderCart();
}

function renderCart() {
  $("cartCount").textContent = cart.reduce((sum,x) => sum + x.quantity, 0);

  const area = $("cartItems");
  area.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    area.innerHTML = '<p class="empty">Себетиңиз бош.</p>';
  }

  cart.forEach(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return;

    total += p.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-row";

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;

    const info = document.createElement("div");
    info.className = "cart-info";
    info.textContent = p.name;

    const small = document.createElement("small");
    small.textContent = money(p.price);
    info.appendChild(small);

    const quantity = document.createElement("div");
    quantity.className = "quantity";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.onclick = () => changeQuantity(p.id, -1);

    const count = document.createElement("span");
    count.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.onclick = () => changeQuantity(p.id, 1);

    quantity.append(minus, count, plus);

    const remove = document.createElement("button");
    remove.className = "remove-btn";
    remove.textContent = "✕";
    remove.onclick = () => changeQuantity(p.id, -item.quantity);

    row.append(img, info, quantity, remove);
    area.appendChild(row);
  });

  $("totalPrice").textContent = money(total);
}

// Издөө жана фильтрлер
$("searchInput").addEventListener("input", renderProducts);
$("searchBtn").addEventListener("click", renderProducts);
$("sortSelect").addEventListener("change", renderProducts);
$("minPrice").addEventListener("input", renderProducts);
$("maxPrice").addEventListener("input", renderProducts);
$("discountOnly").addEventListener("change", renderProducts);

document.querySelectorAll('input[name="category"]').forEach(input => {
  input.addEventListener("change", () => {
    activeCategory = input.value;
    renderProducts();
  });
});

document.querySelectorAll('input[name="brand"]').forEach(input => {
  input.addEventListener("change", renderProducts);
});

$("resetFilters").onclick = () => {
  activeCategory = "all";
  document.querySelector('input[name="category"][value="all"]').checked = true;
  document.querySelectorAll('input[name="brand"]').forEach(x => x.checked = false);
  $("minPrice").value = "";
  $("maxPrice").value = "";
  $("discountOnly").checked = false;
  $("searchInput").value = "";
  $("sortSelect").value = "popular";
  renderProducts();
};

$("catalogBtn").onclick = () => {
  document.querySelector(".sidebar").scrollIntoView({behavior:"smooth"});
};

// Себет жана избранное
$("cartBtn").onclick = () => {
  renderCart();
  openModal("cartModal");
};

$("favoritesBtn").onclick = () => {
  renderFavorites();
  openModal("favoritesModal");
};

// Аккаунттын демо режими
let registering = false;

function updateAccount() {
  const user = JSON.parse(localStorage.getItem("mgUser") || "null");

  $("accountForm").hidden = !!user;
  $("switchAccount").hidden = !!user;
  $("logoutBtn").hidden = !user;

  $("profileInfo").textContent = user
    ? `Саламатсызбы, ${user.name}! Аккаунт: ${user.email}`
    : "";
}

$("accountBtn").onclick = () => openModal("accountModal");

$("switchAccount").onclick = () => {
  registering = !registering;
  $("accountName").hidden = !registering;
  $("accountNumber").hidden = !registering;
  $("accountName").required = registering;
  $("accountNumber").required = registering;
  $("accountTitle").textContent = registering ? "Катталуу" : "Аккаунтка кирүү";
  $("accountSubmit").textContent = registering ? "Катталуу" : "Кирүү";
  $("switchAccount").textContent = registering
    ? "Аккаунтуңуз барбы? Кирүү"
    : "Аккаунтуңуз жокпу? Катталуу";
  $("accountMessage").textContent = "";
};

$("accountName").hidden = true;

$("accountForm").onsubmit = event => {
  event.preventDefault();

  const name = $("accountName").value.trim();
  const email = $("accountEmail").value.trim().toLowerCase();
  const password = $("accountPassword").value;

  if (registering) {
    if (!name) {
      $("accountMessage").textContent = "Атыңызды жазыңыз.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("mgUsers") || "[]");

    if (users.some(x => x.email === email)) {
      $("accountMessage").textContent = "Бул email катталган.";
      return;
    }

    users.push({name, email});
    localStorage.setItem("mgUsers", JSON.stringify(users));
    localStorage.setItem("mgUser", JSON.stringify({name, email}));
  } else {
    const users = JSON.parse(localStorage.getItem("mgUsers") || "[]");
    const user = users.find(x => x.email === email);

    if (!user) {
      $("accountMessage").textContent = "Бул email менен аккаунт табылган жок. Катталыңыз.";
      return;
    }

    localStorage.setItem("mgUser", JSON.stringify(user));
  }

  $("accountMessage").textContent = "Ийгиликтүү!";
  $("accountForm").reset();
  updateAccount();
};

$("logoutBtn").onclick = () => {
  localStorage.removeItem("mgUser");
  $("accountMessage").textContent = "Аккаунттан чыктыңыз.";
  updateAccount();
};

// Дарек
$("addressBtn").onclick = () => {
  $("addressInput").value = localStorage.getItem("mgAddress") || "";
  openModal("addressModal");
};

$("saveAddress").onclick = () => {
  const address = $("addressInput").value.trim();

  if (!address) {
    $("addressMessage").textContent = "Даректи жазыңыз.";
    return;
  }

  localStorage.setItem("mgAddress", address);
  $("addressMessage").textContent = "Дарек сакталды!";
};

// Заказдар
$("ordersBtn").onclick = () => {
  renderOrders();
  openModal("ordersModal");
};

function renderOrders() {
  const area = $("ordersList");
  area.innerHTML = "";

  if (!orders.length) {
    area.textContent = "Азырынча заказ жок.";
    return;
  }

  orders.slice().reverse().forEach(order => {
    const div = document.createElement("div");
    div.className = "cart-row";
    div.textContent = `${order.date} — ${money(order.total)} — ${order.status}`;
    area.appendChild(div);
  });
}

// Заказды WhatsApp менен жөнөтүү
$("checkoutBtn").onclick = () => {
  if (!cart.length) {
    alert("Себетиңиз бош!");
    return;
  }

  const address = localStorage.getItem("mgAddress") || "Дарек көрсөтүлгөн жок";

  const lines = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    return `${p.name} — ${item.quantity} даана — ${money(p.price * item.quantity)}`;
  });

  const total = cart.reduce((sum,item) => {
    const p = products.find(x => x.id === item.id);
    return sum + p.price * item.quantity;
  }, 0);

  const message = `Саламатсызбы! MARKET GO заказ:\n${lines.join("\n")}\nЖалпы: ${money(total)}\nДарек: ${address}`;

  const phone = "996504553304";

  if (phone.includes("X")) {
    alert("script.js ичиндеги WhatsApp номерин дүкөндүн номери менен алмаштырыңыз.");
    return;
  }

  orders.push({
    date: new Date().toLocaleString("ky-KG"),
    total,
    status: "WhatsApp аркылуу жөнөтүлдү"
  });

  saveData();
  renderOrders();

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

$("languageBtn").onclick = () => {
  alert("Азырынча кыргызча версия. Орусча жана англисче котормону кийин кошобуз.");
};

// Баштапкы жүктөө
updateAccount();
renderProducts();
renderCart();
renderFavorites();