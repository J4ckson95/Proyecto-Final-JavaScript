document.addEventListener("DOMContentLoaded", cargainicial);
const shoppingcart = JSON.parse(sessionStorage.getItem("shoppingcart")) || [];

function cargainicial() {
    getData();
    rendershoppingcart();
}
const getData = async () => {
    try {
        const response = await fetch("./data.json")
        const BD = await response.json()
        showProducts(BD)
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
            if (activo.length > 0) {
                if (activo[0].attributes.id.nodeValue == "size") {
                    let checks = [...document.getElementsByClassName("size")];
                    checks.forEach((item, i) => {
                        if (item.checked) {
                            let filter = item.value;
                            let newBD = BD.filter(item => item.size == filter);
                            store.innerHTML = "";
                            showProducts(newBD);
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
                                    showProducts(newBD);
                                    break;
                                case "Menor":
                                    newBD = BD.sort((a, b) => a.price - b.price);
                                    store.innerHTML = "";
                                    showProducts(newBD);
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
                            showProducts(newBD);
                        }
                    })
                }
            }
        });
        modal_filter.style.display = "none";
    });
}

const showProducts = (newBD) => {
    const store = document.getElementById("store");
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
        product.querySelector("button").addEventListener(("click"), (e) => {
            addcarrito(e.target.id, newBD);
            rendershoppingcontainer();
        })
    });
    renderProducts(newBD);
};

const addcarrito = (id, BD) => {
    const producID = parseInt(id);
    let product = BD.find(product => product.id === producID);
    let productcar = shoppingcart.some(product => product.id === producID);
    if (productcar) {
        productcar.cantidad++;
    } else {
        product.cantidad = 1;
        shoppingcart.push(product);
    }
    sessionStorage.setItem("shoppingcart", JSON.stringify(shoppingcart));
    rendershoppingcart()
}
const rendershoppingcart = () => {
    let notification = document.getElementById("notification");
    if (shoppingcart.length > 0) {
        notification.textContent = shoppingcart.length;
        notification.style.display = "block";
    } else {
        notification.style.display = "none";
    }
}
const rendershoppingcontainer = () => {
    const shopping_container = document.getElementById("shopping_container");
    shopping_container.innerHTML = "";
    shoppingcart.forEach((product) => {
        let box = document.createElement("li");
        box.classList.add("box")
        box.innerHTML = `
        <img class="box_img" src="${product.img}">
            <div>
                <h4>${product.name}</h4>
                <p>${new Intl.NumberFormat("es-Co").format(product.price)}</p>
            </div>
        <img id="${product.id}"class="delate" src="./ASSET/icon-delete.svg">`;
        shopping_container.appendChild(box);
        box.querySelector(".delate").addEventListener(("click"), (e) => {
            delateprodut(e.target.id)
        })
    });
    let button = document.createElement("div")
    button.innerHTML = `
    <hr>
    <button>PAGAR</button>`;
    shopping_container.appendChild(button);
};

const delateprodut = (id) => {
    let producId = parseInt(id);
    let productDelate = shoppingcart.find(item => item.id === producId);
    shoppingcart.splice(shoppingcart.indexOf(productDelate), 1);
    sessionStorage.setItem("shoppingcart", JSON.stringify(shoppingcart));
    rendershoppingcontainer();
    rendershoppingcart();
}