let closer = document.querySelector("#closer");

closer.onclick = () => {
    closer.style.display = "none";
    navbar.classList.remove("active");
    cart.classList.remove("active");
    loginForm.classList.remove("active");

}

let navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = () => {
    closer.style.display = "block";
    navbar.classList.toggle("active");
}

let cart = document.querySelector(".cartBox");
document.querySelector("#cart-btn").onclick = () => {
    closer.style.display = "block";
    cart.classList.toggle("active");
}

let loginForm = document.querySelector(".login-form");
document.querySelector("#login-btn").onclick = () => {
    closer.style.display = "block";
    loginForm.classList.toggle("active");
}

// Email validation 
function validation(){
    var userName = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cPassword").value;
    var emailId = document.getElementById("email").value;

    var usercheck = /^[A-Za-z. ]{3,30}$/;
    var passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,19}$/ ;
    var emailCheck = /^[A-Za-z_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/ ;

    if(usercheck.test(userName)){
        document.getElementById('userError').innerHTML = " ";
    }else{
        document.getElementById('userError').innerHTML = " Username is invalid";
        return false;
    }
    if(passCheck.test(password)){
        document.getElementById('passError').innerHTML = " ";
    }else{
        document.getElementById('passError').innerHTML = " Invalid password";
        return false;
    }
    if(emailCheck.test(emailId)){
        document.getElementById('emailError').innerHTML = " ";
    }else{
        document.getElementById('emailError').innerHTML = " Invalid Email Address";
        return false;
    }

    if(cpassword.match(password)){
        document.getElementById('cpassError').innerHTML = " ";
    }else{
        document.getElementById('cpassError').innerHTML = " ppassword is not matching";
        return false;
    }
}

// login and registration
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });
});
// login data store in local storage 
function login() {
    var email = document.getElementById("emailid").value;
    var password = document.getElementById("pass").value;
    console.log(email, password);
    authDetails = { "email": email, "password": password }
    localStorage.setItem("detail", JSON.stringify(authDetails));
}

function login(){
    window.location.href= "../pages/Shop.html"  
}

window.onload = function () {
    //cart box
    const iconShopping = document.querySelector('.iconShopping');
    const cartBox = document.querySelector('.cartBox');
    iconShopping.addEventListener("click", function () {
        cartBox.classList.add('active');
    });

    const addToCartBtn = document.getElementsByClassName("addToCart");
    let items = [];
    for (let i = 0; i < addToCartBtn.length; i++) {
        addToCartBtn[i].addEventListener("click", function (e) {
            if (typeof (Storage) !== "undefined") {
                let item = {
                    id: i + 1,
                    name: e.target.parentElement.children[0].textContent,
                    price: e.target.parentElement.children[1].textContent,
                    no: 1
                };
                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.no = data.no + 1;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items))
                    window.location.reload();

                }
            } else {
                alert(" Local Storage is not working")
            }
        });
    }

    // adding data to cart 
    const iconShoppingP = document.querySelector(".iconShopping p");
    let no = 0
    JSON.parse(localStorage.getItem("items")).map(data => {
        no = no + data.no
    });
    iconShoppingP.innerHTML = no;


    // adding cartbox data 
    const cardBoxTable = cartBox.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>sr no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
	if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<tr><td colspan="5">No items found</td></tr>'
	}else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
			tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
		});
	}
	cardBoxTable.innerHTML = tableData;
}