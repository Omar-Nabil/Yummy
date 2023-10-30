let userName = document.getElementById('name'); 
let userPhone = document.getElementById('phone'); 
let userPassword = document.getElementById('password'); 
let userEmail = document.getElementById('email'); 
let userAge = document.getElementById('age'); 
let userRepassword = document.getElementById('repassword');
let submitBtn = document.getElementById('submitBtn');

let hiddenInnerWidth = $('.hidden').innerWidth();

$('nav').css('left', -hiddenInnerWidth);

$(function() {

    $('.lds-spinner').fadeOut(1000, 
        () => {
            $('#loading').animate({top:'-100%'}, 1000,
            () => {
                $('body').css('overflow', 'auto')
            }
        )  
        }  
    ) 


    $('.showLinks').click(function () { 
        if(parseInt($('nav').css('left')) === 0) {
            $('nav').animate({left: -hiddenInnerWidth});
            $('.showLinks').attr('class', 'showLinks fa-solid fa-bars fa-2xl align-self-center');
            $('.links').css('display', 'none');
        }
        else {
            $('nav').animate({left: '0'});
            $('.showLinks').attr('class', 'showLinks fa-solid fa-x fa-2xl align-self-center');
            $('.links').slideDown(2000);
        }
    });

    userName.addEventListener('input', nameValidation);
    userPassword.addEventListener('input', passwordValidation);
    userPhone.addEventListener('input', phoneValidation);
    userEmail.addEventListener('input', emailValidation);
    userAge.addEventListener('input', ageValidation);
    userRepassword.addEventListener('input', repasswordValidation);

    userName.addEventListener('input', validInputs);
    userPassword.addEventListener('input', validInputs);
    userPhone.addEventListener('input', validInputs);
    userEmail.addEventListener('input', validInputs);
    userAge.addEventListener('input', validInputs);
    userRepassword.addEventListener('input', validInputs);

    
})

let nameRegx = /^\w{1,}$/ig;
let passRegx = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/ig;
let phoneRegx = /^01(0|1|2|5)\w{8}$/ig;
let emailRegx = /^[a-zA-z0-9]{1,}@[a-zA-z]{1,6}\.[a-zA-z]{1,3}$/ig;
let ageRegx = /^[1-9][0-9]?$/ig;

function nameValidation(e) {
    if(e.target.value.match(nameRegx)) {
        document.getElementsByClassName('alert')[0].classList.add('d-none');
        return true;
    }
    else {
        document.getElementsByClassName('alert')[0].classList.remove('d-none');
        return false;
    }
}

function passwordValidation(e) {
    if(e.target.value.match(passRegx)) {
        document.getElementsByClassName('alert')[2].classList.add('d-none');
        return true;
    }
    else {
        document.getElementsByClassName('alert')[2].classList.remove('d-none');
        return false;
    }
}
function phoneValidation(e) {
    if(e.target.value.match(phoneRegx)) {
        document.getElementsByClassName('alert')[1].classList.add('d-none');
        return true;
    }
    else {
        document.getElementsByClassName('alert')[1].classList.remove('d-none');
        return false;
    }
}
function emailValidation(e) {
    if(e.target.value.match(emailRegx)) {
        document.getElementsByClassName('alert')[3].classList.add('d-none');
        return true;
    }
    else {
        document.getElementsByClassName('alert')[3].classList.remove('d-none');
        return false;
    }
}
function ageValidation(e) {
    if(e.target.value.match(ageRegx)) {
        document.getElementsByClassName('alert')[4].classList.add('d-none');
        return true;
    }
    else {
        document.getElementsByClassName('alert')[4].classList.remove('d-none');
        return false;
    }
}
function repasswordValidation(e) {
    console.log(userPassword.value, "  ", userRepassword.value);
    if(userPassword.value === "" || userRepassword.value === "")
        return false;
    else if(userPassword && e.target.value === userPassword.value) {
        document.getElementsByClassName('alert')[5].classList.add('d-none');
        return true;
    } else {
        document.getElementsByClassName('alert')[5].classList.remove('d-none');
        return false;
    }
}

let alerts = document.getElementsByClassName('alert');

function displayNone() {
    if(userAge.value === '' || userEmail.value === '' || userName.value === '' || userPhone.value === '' || 
    userPassword.value === '' || userRepassword.value === '')
        return false;
    for(let i=0; i<alerts.length; i++) {
        if(window.getComputedStyle(alerts[i]).display === 'block')
            return false;
    }
    return true;
}

function validInputs() {
    if(displayNone()) {
        submitBtn.parentElement.classList.remove('opacity-50');
        submitBtn.classList.add('btn' , 'btn-danger' )
    } else {
        submitBtn.parentElement.classList.add('opacity-50');
        submitBtn.classList.remove('btn' , 'btn-danger' )
    }
}
// make sure that all of alerts is d-none
