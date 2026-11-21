// WhatsApp номериңди ушул жерге жаз
const whatsappNumber = "996XXXXXXXXX";

// Автоунаалардын маалыматтары
let cars = [
  {
    id: 1,
    name: "BMW M5",
    brand: "BMW",
    price: 45000,
    year: 2022,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    description: "Күчтүү мотор, спорттук дизайн."
  },
  {
    id: 2,
    name: "Mercedes-Benz E-Class",
    brand: "Mercedes",
    price: 38000,
    year: 2021,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    description: "Комфорттуу жана люкс автоунаа."
  },
  {
    id: 3,
    name: "Toyota Camry",
    brand: "Toyota",
    price: 25000,
    year: 2022,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    description: "Үй-бүлөгө ылайыктуу ишенимдүү унаа."
  },
  {
    id: 4,
    name: "Tesla Model 3",
    brand: "Tesla",
    price: 30000,
    year: 2023,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
    description: "Заманбап электр унаасы."
  },
  {
    id: 5,
    name: "BYD Song Plus",
    brand: "BYD",
    price: 22000,
    year: 2023,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
    description: "Заманбап үй-бүлөлүк кроссовер."
  }
];

let favorites = [];
let comparison = [];
let currentCars = [...cars];

// Унааларды көрсөтүү
function displayCars(list) {
  const grid = document.getElementById("carsGrid");

  if (list.length === 0) {
    grid.innerHTML = "<p>Унаа табылган жок.</p>";
    return;
  }

  grid.innerHTML = list.map(car => `
    <div class="car-card">
      <img src="${car.image}" alt="${car.name}"
           onerror="this.src='https://placehold.co/600x400?text=Car'">

      <div class="car-info">
        <h3>${car.name}</h3>
        <p>${car.year} | ${car.brand}</p>
        <p class="price">$${car.price.toLocaleString()}</p>

        <div class="card-buttons">
          <button onclick="showDetails(${car.id})">Толук маалымат</button>

          <button class="fav"
            onclick="toggleFavorite(${car.id})">
            ❤️
          </button>

          <button onclick="addComparison(${car.id})">
            ⚖️
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// Издөө жана фильтр
function filterCars() {
  const search = document.getElementById("search")
    .value.toLowerCase();

  const brand = document.getElementById("brandFilter").value;
  const price = document.getElementById("priceFilter").value;

  const filtered = cars.filter(car => {
    const matchesSearch =
      car.name.toLowerCase().includes(search);

    const matchesBrand =
      !brand || car.brand === brand;

    const matchesPrice =
      !price || car.price <= Number(price);

    return matchesSearch && matchesBrand && matchesPrice;
  });

  currentCars = filtered;
  displayCars(filtered);
}

document.getElementById("search")
  .addEventListener("input", filterCars);

document.getElementById("brandFilter")
  .addEventListener("change", filterCars);

document.getElementById("priceFilter")
  .addEventListener("change", filterCars);

// Сүйүктүүлөр
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  alert("Сүйүктүүлөр жаңыртылды!");
}

function showFavorites() {
  const result = cars.filter(car =>
    favorites.includes(car.id)
  );

  currentCars = result;
  displayCars(result);

  document.getElementById("cars").scrollIntoView();
}

// Салыштыруу
function addComparison(id) {
  if (comparison.includes(id)) {
    alert("Бул унаа салыштырууда бар!");
    return;
  }

  if (comparison.length >= 3) {
    alert("Эң көп 3 унааны салыштырууга болот!");
    return;
  }

  comparison.push(id);
  alert("Унаа салыштырууга кошулду!");
}

function showComparison() {
  const selected = cars.filter(car =>
    comparison.includes(car.id)
  );

  if (selected.length < 2) {
    alert("Салыштыруу үчүн кеминде 2 унаа танда!");
    return;
  }

  const body = document.getElementById("modalBody");

  body.innerHTML = `
    <h2>Унааларды салыштыруу</h2>
    ${selected.map(car => `
      <div>
        <h3>${car.name}</h3>
        <p>Марка: ${car.brand}</p>
        <p>Жылы: ${car.year}</p>
        <p>Баасы: $${car.price}</p>
      </div>
      <hr>
    `).join("")}
  `;

  document.getElementById("carModal").style.display = "flex";
}

// Толук маалымат
function showDetails(id) {
  const car = cars.find(item => item.id === id);

  document.getElementById("modalBody").innerHTML = `
    <img src="${car.image}" alt="${car.name}">
    <h2>${car.name}</h2>
    <p>Маркасы: ${car.brand}</p>
    <p>Жылы: ${car.year}</p>
    <p class="price">$${car.price.toLocaleString()}</p>
    <p>${car.description}</p>

    <br>
    <button class="main-btn"
      onclick="contactWhatsApp(${car.id})">
      WhatsApp аркылуу байланышуу
    </button>
  `;

  document.getElementById("carModal").style.display = "flex";
}

// WhatsApp заказ
function contactWhatsApp(id) {
  const car = cars.find(item => item.id === id);

  const message = `Саламатсызбы! ${car.name} унаасына кызыгып жатам. Толук маалымат бериңиз.`;

  if (whatsappNumber.includes("X")) {
    alert("Алгач script.js ичиндеги WhatsApp номериңди өзгөрт!");
    return;
  }

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

// Терезени жабуу
function closeModal() {
  document.getElementById("carModal").style.display = "none";
}

// Бардык унааларды көрсөтүү
function showAllCars() {
  currentCars = [...cars];
  displayCars(cars);
  document.getElementById("cars").scrollIntoView();
}

// Жаңы унаа кошуу
function openAddForm() {
  document.getElementById("addModal").style.display = "flex";
}

function closeAddForm() {
  document.getElementById("addModal").style.display = "none";
}

document.getElementById("addCarForm")
  .addEventListener("submit", function(e) {
    e.preventDefault();

    const newCar = {
      id: Date.now(),
      name: document.getElementById("newName").value.trim(),
      brand: document.getElementById("newBrand").value.trim(),
      price: Number(document.getElementById("newPrice").value),
      year: Number(document.getElementById("newYear").value),
      image: document.getElementById("newImage").value.trim(),
      description: "Жаңы кошулган автоунаа."
    };

    if (
      !newCar.name ||
      !newCar.brand ||
      !newCar.image ||
      newCar.price <= 0 ||
      newCar.year < 1900
    ) {
      alert("Маалыматтарды туура толтур!");
      return;
    }

    cars.push(newCar);
    displayCars(cars);

    this.reset();
    closeAddForm();

    alert("Унаа ийгиликтүү кошулду!");
  });

// Караңгы жана жарык режим
document.getElementById("themeBtn")
  .addEventListener("click", function() {
    document.body.classList.toggle("dark");

    this.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

// Баштапкы көрсөтүү
displayCars(cars);