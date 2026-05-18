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

if (localStorage.getItem("account") != null) {
    account = JSON.parse(localStorage.getItem("account"));
    document.getElementById("a_account").innerHTML = "Carrello(" + account.cart.length+")";
    console.log(1)
}else{
    document.getElementById("a_account").innerHTML = "Registrati";
    console.log(2)
}

    


function updateLocalStorage(){
    localStorage.setItem("account", JSON.stringify(account));
}

function creaUtente(){
    let valido = true;

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
    } else {
        nome.classList.remove("input-error");
    }

    if(!REGEX_NOME.test(cognome.value.trim())){
        cognome.classList.add("input-error");
        valido = false;
    } else {
        cognome.classList.remove("input-error");
    }

    if(!REGEX_INDIRIZZO.test(indirizzo.value.trim())){
        indirizzo.classList.add("input-error");
        valido = false;
    } else {
        indirizzo.classList.remove("input-error");
    }

    if(!REGEX_CAP.test(cap.value.trim())){
        cap.classList.add("input-error");
        valido = false;
    } else {
        cap.classList.remove("input-error");
    }


    if(!REGEX_EMAIL.test(email.value.trim())){
        email.classList.add("input-error");
        valido = false;
    } else {
        email.classList.remove("input-error");
    }

    if(!REGEX_PASSWORD.test(password.value)){
        password.classList.add("input-error");
        valido = false;
    } else {
        password.classList.remove("input-error");
    }

    if(valido){
        infos.name = nome.value.trim();
        infos.lastname = cognome.value.trim();
        infos.streetname = indirizzo.value.trim();
        infos.zip = cap.value.trim();
        infos.email = email.value.trim();
        infos.password = password.value;
        
        setTimeout(() => {
            localStorage.setItem("account", JSON.stringify(infos));
            if(localStorage.getItem("logins") != null){
                let totalAccount = JSON.parse(localStorage.getItem("logins"));
                totalAccount.push(infos);
                localStorage.setItem("logins", JSON.stringify(totalAccount));
            }else{
                let totalAccount = [];
                totalAccount.push(infos);
                localStorage.setItem("logins", JSON.stringify(totalAccount));
            }
            window.location.href="../index.html"
        }, 1000);


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



function customCSV(){
    
}
