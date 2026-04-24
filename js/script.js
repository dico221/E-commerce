let account;

if (localStorage.getItem("account") === null) {
    account = {
        users: [],
        session: {}, 
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

function loginUtente(email, password){
    account.users.forEach(element => {
        if(element.email == email && element.password == password){
            account.session = element;
            updateLocalStorage();

        }
    });
    
}

function creaUtente(nome,cognome,indirizzo,cap,email,password){

}