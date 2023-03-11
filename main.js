document.addEventListener("DOMContentLoaded", cargainicial);
const shoppingcart = [];
const BD = [
    {
        id: 1,
        name: "TENIS ADIDAS GRAND COURT CLOUDFOAM LIFESTYLE COURT COMFORT",
        brand: "ADIDAS",
        size: 40,
        price: 329999,
        img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/39d54ad8ba0b41d589e3af5c0117c68c_9366/Tenis_adidas_Grand_Court_Cloudfoam_Lifestyle_Court_Comfort_Blanco_HP9417_01_standard.jpg"
    },
    {
        id: 2,
        name: "NikeCourt Zoom Pro",
        brand: "NIKE",
        size: 38,
        price: 254950,
        img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c6b6b783-d9e2-4626-a40a-c15af4b5e2cf/nikecourt-zoom-pro-zapatillas-de-tenis-tierra-batida-csvPDm.png"
    },
    {
        id: 3,
        name: "ZAPATILLA DE TENIS PADEL HOMBRE PRO OPEN",
        brand: "WILSON",
        size: 39,
        price: 299950,
        img: "https://www.hectortenis.com/wp-content/uploads/2021/12/pro-ope.png"
    },
    {
        id: 4,
        name: "TENIS COURTJAM CONTROL PARA TENIS",
        brand: "ADIDAS",
        size: 40,
        price: 429950,
        img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8602f84a50e9461b9891af1d01265bcb_9366/Tenis_CourtJam_Control_para_Tenis_Blanco_HQ8468_01_standard.jpg"
    },
    {
        id: 5,
        name: "NikeCourt Air Zoom Vapor 9.5 Tour Premium",
        brand: "NIKE",
        size: 39,
        price: 1019950,
        img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/94eb686a-b427-45ec-9026-d81a893f3ae6/nikecourt-air-zoom-vapor-9-5-tour-zapatillas-de-tenis-FHQMB0.png"
    },
    {
        id: 6,
        name: "RUSH PRO 4.0 MEN'S TENNIS SHOE",
        brand: "WILSON",
        size: 40,
        price: 646990,
        img: "https://www.wilson.com/en-us/media/catalog/product/W/R/WRS328600__d16eef0bf16c239bccdf6e5d48123c7c.png?dpr=2&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=1556%2C1900&bg-color=f5f5f5"
    },
    {
        id: 7,
        name: "KAOS MIRAGE MEN'S TENNIS SHOE",
        brand: "WILSON",
        size: 38,
        price: 809950,
        img: "https://www.wilson.com/en-us/media/catalog/product/W/R/WRS327430__f2e68fa660941be2fc32b43e6eda049d.png?dpr=2&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=1556%2C1900&bg-color=f5f5f5"
    },
    {
        id: 8,
        name: "NikeCourt Vapor Lite",
        brand: "NIKE",
        size: 39,
        price: 356990,
        img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f0e7e1ff-94a5-4432-837e-0e0839e8aee4/nikecourt-vapor-lite-zapatillas-de-tenis-de-pista-rapida-1LlTpc.png"
    },
    {
        id: 9,
        name: "TENIS ADVANTAGE",
        brand: "ADIDAS",
        size: 40,
        price: 1436990,
        img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dcc92021513a4b6b99d1aed700b3252c_9366/Tenis_Advantage_Blanco_GW9161_01_standard.jpg"
    }
];
function cargainicial() {
    renderProducts();
    rendershoppingcart();
}

const renderProducts = () => {
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
const rendershoppingcart = () => {
    let notification = document.getElementById("notification");
    let shoppingcart = JSON.parse(sessionStorage.getItem("shoppingcart"));
    if (shoppingcart) {
        notification.textContent = shoppingcart.length;
        notification.style.display = "block";
    }
}