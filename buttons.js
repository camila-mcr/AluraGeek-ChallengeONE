console.log("Conectado.");

const buttons = [
    document.getElementById("login_button_index"),
    document.getElementById("banner_button"),
    document.getElementById("button_addProduct"),
    document.getElementById("adminMenu_button")
];


const buttonActions = {
    login_button_index: () => {redirect("login.html")},
    banner_button: () => {document.location.href = "#category_console"},
    button_addProduct: () => {redirect("addProduct.html")},
    adminMenu_button: () => {redirect("admin.html")},
};

console.log("buttons: ", buttons);


buttons.filter((button) => { return button != null}).forEach((button)=>{
    button.addEventListener("click", (button) => {
        const buttonId = button.target.id;
        if(buttonActions[buttonId]){
            buttonActions[buttonId]();
            console.log("click");
        };
    });
});




function redirect(screen){
    window.location.href = screen;
};



