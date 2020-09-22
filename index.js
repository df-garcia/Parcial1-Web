const URL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let products = [];
let order = [];
let addToCartButtons = [];

fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    products = data;
    menuHandler("Burguers");
  });

menuHandler = (menuSection) => {
  let sectionName = document.getElementById("section-title");
  let sectionContent = document.getElementById("section-content");
  let sectionNameReplace = menuSection;
  let sectionContentReplace = "";
  let newMenu = products.filter((el) => {
    return el.name === menuSection;
  });
  newMenu[0].products.map((item, index) => {
    sectionContentReplace += `<div class="col-sm-6 col-md-4 col-xl-3">
                                <div class="card">
                                    <img 
                                      class="card-img-top" 
                                      src="${item.image}" 
                                      alt="Menu image" 
                                    />
                                    <div class="card-body">
                                        <h5 class="card-title">
                                          ${item.name}
                                        </h5>
                                        <p class="card-text">
                                          ${item.description}
                                        </p>
                                        <b class="card-text">
                                          $${item.price}
                                        </b>
                                        <div>
                                            <br />
                                            <button 
                                              id=${
                                                menuSection.replace(/ /g, "") +
                                                "_" +
                                                index
                                              } 
                                              class="btn btn-dark add-to-cart-button"
                                              >
                                                Add To cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
  });
  sectionName.innerHTML = sectionNameReplace;
  sectionContent.innerHTML = sectionContentReplace;
  addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  bindAddToCartButtons();
};

const placeOrderHandler = () => {
  let sectionName = document.getElementById("section-title");
  let sectionContent = document.getElementById("section-content");
  let sectionNameReplace = "Order Detail";
  let sectionContentReplace = "";

  if (order.length == 0) {
    sectionContentReplace = `<p>Add items to the cart!</p>`;
  } else {
    let totalAmount = 0;
    sectionContentReplace = `<table class="table table-striped" id="cart-summary">
                              <thead>
                                <tr>
                                  <th scope="col">Item</th>
                                  <th scope="col">Qty.</th>
                                  <th scope="col">Description</th>
                                  <th scope="col">Unit Price</th>
                                  <th scope="col">Amount</th>
                                </tr>
                              </thead>
                              <tbody>`;
    order.map((item, index) => {
      sectionContentReplace += `<tr>
                                  <td><strong>${index + 1}</strong></td>
                                  <td>${item.quantity}</td>
                                  <td>${item.name}</td>
                                  <td>${item.price}</td>
                                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>`;
      totalAmount += item.price * item.quantity;
    });
    sectionContentReplace += `</tbody>
                              </table>
                              <p id="total">Total: <span>$${totalAmount.toFixed(2)}</span></p>
                              <hr />
                              <div id="order-buttons">
                                <button type="button" id="cancel-btn" data-toggle="modal" data-target="#confirmationModal" class="btn btn-outline-info cancel-btn">Cancel</button>
                                <button type="button" id="confirm-btn" class="btn btn-outline-dark confirm-btn">Confirm Order</button>
                            </div>`;
  }
  sectionName.innerHTML = sectionNameReplace;
  sectionContent.innerHTML = sectionContentReplace;
  bindManageOrderButtons();
};

const renderCart = () => {
  let cartItems = document.getElementById("items");
  if (order.length > 0) {
    cartItems.innerHTML = order.length + " Items";
  } else {
    cartItems.innerHTML = "Add some items";
  }
};

const addItemToCartHandler = (event) => {
  let id = event.target.getAttribute("id");
  let [menuSection, menuId] = id.split("_");
  if (menuSection === "DrinksandSides") {
    menuSection = "Drinks and Sides";
  }
  let actualMenu = products.filter((el) => {
    return el.name === menuSection;
  });
  let actualProduct = actualMenu[0].products[menuId];
  let productInOrder = order.find(
    (element) => element.name === actualProduct.name
  );
  if (productInOrder) {
    productInOrder.quantity++;
  } else {
    let newProduct = {
      ...actualProduct,
      quantity: 1,
    };
    order.push(newProduct);
  }
  renderCart();
  $(".toast").toast("show");
};

const cancelOrderHandler = () => {
  order = [];
  renderCart();
  menuHandler("Burguers");
  $("#confirmationModal").modal("hide");
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
document.getElementById("cart-placeholder").addEventListener("click", () => {
  placeOrderHandler();
});
const bindManageOrderButtons = () => {
  if (order.length > 0) {
    document
      .getElementById("modal-cancel-btn")
      .addEventListener("click", () => {
        cancelOrderHandler();
      });
    document.getElementById("confirm-btn").addEventListener("click", () => {
      console.log(order);
    });
  }
};
const bindAddToCartButtons = () => {
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      addItemToCartHandler(evt);
    });
  });
};
