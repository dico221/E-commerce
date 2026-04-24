let account;

if (localStorage.getItem("account") === null) {
    account = {
        session: [], 
        cart: [],
        orders: []
    };
    updateLocalStorage();
    console.log("localhost inizializzato");
} else {
    account = JSON.parse(localStorage.getItem("account"));
}

function updateLocalStorage(){
    localStorage.setItem("account", JSON.stringify(account));
}

function creaUtente(nome,cognome,indirizzo,cap,email,password){

}