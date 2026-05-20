let account;
/*
account = {
        name: "",
        lastname: "",
        streetname: "",
        zip: "",
        email: "",
        password: "",
        cart: [],
        orders: [],
        csv
};
logins = {
    accounts: [account]
}
*/

function updateLoginAccount(account2){

    let logins = JSON.parse(localStorage.getItem("logins"));

    let i = logins.findIndex(element =>
        element.email === account2.email
    );

    if(i != -1){

        logins[i] = account2;
        localStorage.setItem("logins", JSON.stringify(logins));
    }
}

if (localStorage.getItem("account") != null) {
    account = JSON.parse(localStorage.getItem("account"));
    let num = 0;
    for (let i = 0; i < account.cart.length; i++) {
        num+=account.cart[i][1]
        
    }
    document.getElementById("a_account").innerHTML = "Carrello(" + num+")";
    document.getElementById("logout-text").innerHTML = "Esci";
    console.log(1)
}else{
    document.getElementById("a_account").innerHTML = "Registrati";
    document.getElementById("logout-text").innerHTML = "";
    console.log(2)
}

if(localStorage.getItem("csv") == null){
    loadCSV();
}

    

function logUserIn() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let logins = JSON.parse(localStorage.getItem("logins")) || [];

    let auth = logins.find(element =>
        element.email === email.trim() &&
        element.password === password.trim()
    );

    if(auth){

        localStorage.setItem("account", JSON.stringify(auth));
        window.location.href = "../index.html";document.getElementById("input-error").innerHTML = "";

    }else{

        document.getElementById("input-error").innerHTML = "Email o Password sbagliate";
    }
}

function creaUtente(){

    let valido = true;

    let logins = JSON.parse(localStorage.getItem("logins")) || [];

    let infos = {
        name: "",
        lastname: "",
        streetname: "",
        zip: "",
        email: "",
        password: "",
        cart: [],
        orders: []
    };

    let nome = document.getElementById("nome");
    let cognome = document.getElementById("cognome");
    let indirizzo = document.getElementById("indirizzo");
    let cap = document.getElementById("cap");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    const REGEX_NOME = /^[\p{L}][\p{L}'\- ]{1,49}$/u;
    const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const REGEX_INDIRIZZO = /^[\p{L}0-9\s.,'\/#\-]{5,100}$/u;
    const REGEX_CAP = /^[A-Za-z0-9\s\-]{3,10}$/;

    if(!REGEX_NOME.test(nome.value.trim())){

        nome.classList.add("input-error");

        valido = false;

    }else{

        nome.classList.remove("input-error");
    }

    if(!REGEX_NOME.test(cognome.value.trim())){

        cognome.classList.add("input-error");

        valido = false;

    }else{

        cognome.classList.remove("input-error");
    }

    if(!REGEX_INDIRIZZO.test(indirizzo.value.trim())){

        indirizzo.classList.add("input-error");

        valido = false;

    }else{

        indirizzo.classList.remove("input-error");
    }

    if(!REGEX_CAP.test(cap.value.trim())){

        cap.classList.add("input-error");

        valido = false;

    }else{

        cap.classList.remove("input-error");
    }

    if(!REGEX_EMAIL.test(email.value.trim())){

        email.classList.add("input-error");

        valido = false;

    }else{

        email.classList.remove("input-error");

        logins.forEach(element => {

            if(element.email === email.value.trim()){

                valido = false;

                alert("Email già associata ad un account");

                email.classList.add("input-error");
            }
        });
    }

    if(!REGEX_PASSWORD.test(password.value)){

        password.classList.add("input-error");

        valido = false;

    }else{

        password.classList.remove("input-error");
    }

    if(valido){

        infos.name = nome.value.trim();
        infos.lastname = cognome.value.trim();
        infos.streetname = indirizzo.value.trim();
        infos.zip = cap.value.trim();
        infos.email = email.value.trim();
        infos.password = password.value;

        logins.push(infos);
        localStorage.setItem("logins", JSON.stringify(logins));
        localStorage.setItem("account", JSON.stringify(infos));

        window.location.href = "../index.html";
    }
}

function accountPage(){
    if (localStorage.getItem("account") === null) {
        window.location.href = "./accounts/registrazione.html"
    }
    else {
        window.location.href = "./accounts/cart.html"
    }
}

function showPass(id, checkbox) {
    const input = document.getElementById(id);

    if (checkbox.checked) {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

function logout(){
    if(localStorage.getItem("account") != null){
        localStorage.removeItem("account");
        window.location.href = "./index.html";
    }
}


function loadCSV(){

    let fileCsv = localStorage.getItem("csv");

    if(fileCsv != null){

        console.log(1);

    }else{

        console.log(2);

        fetch("./csv/default.csv")
            .then(res => res.text())
            .then(csv => {

                localStorage.setItem("csv", csv);
        });
    }
}

function customCSV() {
    const csv = prompt("inserisci il contenuto del csv:");

    if (csv != null) {
        localStorage.setItem("csv", csv);
        console.log("CSV salvato e pronto per il parsing.");
    }
}

function resetCSV(){
    localStorage.removeItem("csv")
    loadCSV()
}


function aggiungiCarrello(id, quantita){

    let account = JSON.parse(localStorage.getItem("account"));
    if(account != null){
        let qta = Number(document.getElementById(quantita).value);
        let dup = false;
        for(let i = 0; i < account.cart.length; i++){
            if(Number(id) === Number(account.cart[i][0])){
                account.cart[i][1] += qta;
                dup = true;
                break;
            }
        }
        if(!dup){
            account.cart.push([Number(id), qta]);
        }
        localStorage.setItem("account", JSON.stringify(account));
        updateLoginAccount(account);
        let num = 0;
        for (let i = 0; i < account.cart.length; i++) {
            num+=account.cart[i][1]
        
        }
        document.getElementById("a_account").innerHTML = "Carrello(" + num+")";
        console.log(account.cart);
    }
}
    
