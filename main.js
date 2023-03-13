document.addEventListener("DOMContentLoaded", cargainicial);
const shoppingcart = [];

function cargainicial() {
    getData();
    renderProducts();
    rendershoppingcart();
}
const getData = async () => {
    try {
        const response = await fetch("./data.json")
        const BD = await response.json()
        renderProducts(BD);
    } catch (Error) {
        alert("Error en la matrix")
    }
}
const renderProducts = (BD) => {
    const store = document.getElementById("store");
    const buttons = document.querySelectorAll("button");
    let modal_filter = document.getElementById("modal_filter")
    buttons.forEach((item, i) => {
        buttons[i].addEventListener("click", () => {
            let activo = document.getElementsByClassName("activo");
            if (activo[0].attributes.id.nodeValue == "size") {
                let checks = [...document.getElementsByClassName("size")];
                checks.forEach((item, i) => {
                    if (item.checked) {
                        let filter = item.value;
                        let newBD = BD.filter(item => item.size == filter);
                        store.innerHTML = "";
                        showProducts(newBD, store);
                    }
                })
            }
            if (activo[0].attributes.id.nodeValue == "price") {
                let checks = [...document.getElementsByClassName("price")];
                checks.forEach((item, i) => {
                    if (item.checked) {
                        let filter = item.value;
                        let newBD;
                        switch (filter) {
                            case "Mayor":
                                newBD = BD.sort((a, b) => b.price - a.price);
                                store.innerHTML = "";
                                showProducts(newBD, store);
                                break;
                            case "Menor":
                                newBD = BD.sort((a, b) => a.price - b.price);
                                store.innerHTML = "";
                                showProducts(newBD, store);
                                break;
                        }
                    }
                })
            }
            if (activo[0].attributes.id.nodeValue == "brand") {
                let checks = [...document.getElementsByClassName("brand")];
                checks.forEach((item, i) => {
                    if (item.checked) {
                        let filter = item.value;
                        let newBD = BD.filter(item => item.brand == filter);
                        store.innerHTML = "";
                        showProducts(newBD, store);
                    }
                })
            }
        });
        modal_filter.style.display = "none";
    });
    showProducts(BD, store);
}

const showProducts = (newBD, store) => {
    newBD.forEach((item) => {
        let product = document.createElement("div");
        product.classList.add("container");
        product.innerHTML = `
            <img src="${item.img}">
            <div>
                <h3>${item.name}</h3>
                <p>${new Intl.NumberFormat("es-Co").format(item.price)}</p>
                <button id="${item.id}"> Añadir al Carrito </button>
            </div>`;
        store.appendChild(product);
        product.querySelector("button").addEventListener(("click"), () => {
            addcarrito(item.id)
        })
    });
};

const addcarrito = (id) => {
    let product = BD.find(product => product.id === id);
    let productcar = shoppingcart.find(product => product.id === id);
    if (productcar) {
        productcar.cantidad++;
    } else {
        product.cantidad = 1;
        shoppingcart.push(product);
    }
    sessionStorage.setItem("shoppingcart", JSON.stringify(shoppingcart));
    rendershoppingcart()
}
const rendershoppingcart = (shopping_container) => {
    let notification = document.getElementById("notification");
    let shoppingcart = JSON.parse(sessionStorage.getItem("shoppingcart"));
    if (shoppingcart) {
        notification.textContent = shoppingcart.length;
        notification.style.display = "block";
    }
    console.log(shoppingcart);
}