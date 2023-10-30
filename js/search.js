// main Page 
let hiddenInnerWidth = $('.hidden').innerWidth();

$('nav').css('left', -hiddenInnerWidth);

$('.lds-spinner').css('display', 'none');
$('#loadingsearch').css('top', '100%');

$(function() {
    

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

    let homeDiv = document.getElementById('home');

    async function getMealsByLetter(letter) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let result = await response.json();
        
        return result.meals;
    }
    async function getMealsByName(name) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        let result = await response.json();
        
        return result.meals;
    }
    let inputOne = document.getElementById('inputOne');
    let inputTwo = document.getElementById('inputTwo');
    inputOne.addEventListener('input', () => {
        $('.lds-spinner').css('display', 'block');
        $('#loadingsearch').css('top', '20%');
        $('body').css('overflow', 'hidden');
        homeDiv.innerHTML = '';
        getMealsByName(inputOne.value).then((data) => {
            $('.lds-spinner').fadeOut(1000, 
                () => {
                    $('#loadingsearch').animate({top:'100%'}, 1000,
                        () => {
                            $('body').css('overflow', 'auto')
                        }
                    ) 
                } 
            )
            for(let i=0; i<data.length; i++) {
                homeDiv.innerHTML += `
                    <div class="main" onclick="productDetails(${data[i].idMeal})">
                        <div class="first" id="${data[i].idMeal}">
                            <img class="w-100 rounded-2" src=${data[i].strMealThumb} alt="">
                        </div>
                        <div class="second">
                            <h1 class="text mx-1">${data[i].strMeal.split(" ").slice(0,2).join(" ")}</h1>
                        </div>
                    </div>
                `;
            }
        })
        $('#home').ready(() => {
            console.log(33);
        })
    })
    inputTwo.addEventListener('input', () => {
        $('.lds-spinner').css('display', 'block');
        $('#loadingsearch').css('top', '20%');
        $('body').css('overflow', 'hidden');
        homeDiv.innerHTML = '';
        getMealsByLetter(inputTwo.value).then((data) => {
            $('.lds-spinner').fadeOut(1000, 
                () => {
                    $('#loadingsearch').animate({top:'100%'}, 1000,
                        () => {
                            $('body').css('overflow', 'auto')
                        }
                    )  
                }  
            )
            for(let i=0; i<data.length; i++) {
                homeDiv.innerHTML += `
                    <div class="main" onclick="productDetails(${data[i].idMeal})">
                        <div class="first" id="${data[i].idMeal}">
                            <img class="w-100 rounded-2" src=${data[i].strMealThumb} alt="">
                        </div>
                        <div class="second">
                            <h1 class="text mx-1">${data[i].strMeal.split(" ").slice(0,2).join(" ")}</h1>
                        </div>
                    </div>
                `;
            }
        })
    })
    // main Page

})
async function getMealById(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let result = await response.json();
    
    return result.meals;
}
function productDetails(productId) {
    window.scrollTo(0, 0);
    $('.lds-spinner').css('display', 'block');
    $('#loadingsearch').css('top', '0%');
    $('body').css('overflow', 'hidden')
    getMealById(productId).then((data)=> {
        $('.lds-spinner').fadeOut(1000, 
            () => {
                $('#loadingsearch').animate({top:'100%'}, 1000,
                    () => {
                        $('body').css('overflow', 'auto')
                    }
                )
            }
        )

        let topics =  document.createElement('ul');
        topics.classList.add('list-unstyled', 'd-flex', 'g-2' ,'flex-wrap');
        if(data[0].strTags !== null) {
            let tagsArr = data[0].strTags.split(",");
            for(let i=0; i<tagsArr.length; i++) {
                let li = document.createElement('li');
                li.classList.add('alert', 'alert-secondary', 'm-2', 'p-1');
                li.textContent = tagsArr[i];
                topics.appendChild(li);
            }
        }



        let remove = document.getElementById('home');
        let product = document.getElementById('producte');
        let Recipes = document.createElement('ul');
        Recipes.classList.add('list-unstyled', 'd-flex', 'g-2' ,'flex-wrap')
        for (let i = 1; i <= 20; i++) {
            const measure = data[0][`strMeasure${i}`];
            const ingredient = data[0][`strIngredient${i}`];
            if (measure && ingredient) {
                let li = document.createElement('li');
                li.classList.add('alert', 'alert-info', 'm-2', 'p-1');
                li.textContent = measure + ingredient;
                Recipes.appendChild(li);
            }
        }
        remove.classList.add('d-none');

        product.innerHTML = `
            <div class="container">
                <div class="row ms-auto">
                    <div class="col-md-4 col-sm-1 py-4">
                        <div class="p-2">
                            <img src="${data[0].strMealThumb}" class="w-100 rounded-2 mb-3" alt="">
                            <h1>${data[0].strMeal.split(" ").slice(0,3).join(" ")}</h1>
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-1 py-3">
                        <div class="p-3">
                            <h4>Instructions</h4>
                            <p>${data[0].strInstructions}</p>
                            <h3>Area : ${data[0].strArea}</h3>
                            <h3>Category : ${data[0].strCategory}</h3>
                            <h3 class="mb-2" id="refe">Recipes :</h3>
                            <h1 id="tag">Tags :</h1>
                            <a href="${data[0].strSource}" class="btn btn-success">Sourse</a>
                            <a href="${data[0].strYoutube}" class="btn btn-danger mx-2">Youtube</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        let x = document.getElementById('refe');
        let tag = document.getElementById('tag');
        tag.after(topics);
        x.after(Recipes);
        product.classList.remove('d-none');
        let z = document.getElementById('inputs');
        z.classList.add('d-none');
    })
}

