const URL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let products = [];
let order = [];

fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    products = data;
  });

menuHandler = (menuSection) => {
  sectionName = document.getElementById("section-title");
  sectionContent = document.getElementById("section-content");
  sectionNameReplace = menuSection;
  sectionContentReplace = "";
  var newMenu = products.filter(function (el) {
    return el.name === menuSection;
  });
  newMenu[0].products.map((item) => {
    sectionContentReplace += `<div class="col-sm-3">
                                <div class="card">
                                    <img class="card-img-top" src="${item.image}" alt="Menu image">
                                    <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text">${item.description}</p>
                                    <b class="card-text">$${item.price}</b>
                                    <div><br /><button onclick=addItemHandler(${item}) class="btn btn-dark">Add To cart</button></div>
                                    </div>
                                </div>
                            </div>`;
  });
  sectionName.innerHTML = sectionNameReplace;
  sectionContent.innerHTML = sectionContentReplace;
};

const addItemHandler = (item) => {
  products.push(item);
  console.log(products);
};

document.getElementById("burgers").addEventListener("click", () => {
  menuHandler("Burguers");
});
document.getElementById("tacos").addEventListener("click", () => {
  menuHandler("Tacos");
});
document.getElementById("salads").addEventListener("click", () => {
  menuHandler("Salads");
});
document.getElementById("desserts").addEventListener("click", () => {
  menuHandler("Desserts");
});
document.getElementById("drinks").addEventListener("click", () => {
  menuHandler("Drinks and Sides");
});
