const menu = document.getElementById("icon_menu");
const modal_navbar = document.getElementById("modal_navbar")
const img_close = document.getElementById("img_close")

menu.addEventListener("click", () => {
    setTimeout(() => {
        modal_navbar.style.display = "block";
    }, 500);
});
img_close.addEventListener(("click"), () => {
    setTimeout(() => {
        modal_navbar.style.display = "none";
    }, 500);
});
//---------------------------------------------------------------//
const logo_filter = document.getElementById("logo_filter")
const modal_filter = document.getElementById("modal_filter")
const close_filter = document.getElementById("close_filter")

logo_filter.addEventListener(("click"), () => {
    setTimeout(() => {
        modal_filter.style.display = "block";
    }, 500);
});
close_filter.addEventListener(("click"), () => {
    setTimeout(() => {
        modal_filter.style.display = "none";
    }, 500);
});
//--------------------------------------------------------------//
const img_add = document.querySelectorAll(".img_add")
const filter_option = document.querySelectorAll(".check")
let cont = 0;

img_add.forEach((item, i) => {
    img_add[i].addEventListener(("click"), (e) => {
        if (cont === 0) {
            e.target.attributes[0].nodeValue = "./ASSET/less.png";
            cont++;
            filter_option[i].classList.add("activo");
        } else {
            e.target.attributes[0].nodeValue = "./ASSET/add.png";
            cont = 0;
            filter_option[i].classList.remove("activo");
        }
    });
});
//-------------------------------------------------------------------//
const shopping = document.getElementById("shopping_cart");
const shopping_container = document.getElementById("shopping_container");
shopping.addEventListener(("click"), () => {
    setTimeout(() => {
        shopping_container.classList.toggle("active_cart");
    }, 500);
    rendershoppingcart(shopping_container);
})


