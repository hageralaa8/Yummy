//get all variable
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
//awel ma abd2 el page
$(window).ready(function () {
    searchByName("")
    $("#loading-screen").fadeOut(500, function () {
        // return scrollbar b3d m anfz el finction
        $("body").css("overflow", "visible");
    });
})
//sidenav bar
function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 500) //aft7 elna

    $(".open-close-icon").removeClass("fa-align-justify");//remove open icone 
    $(".open-close-icon").addClass("fa-x")//add close icone

    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
}
//function close sideNav
function closeSideNav() {
    let sidebarInnerWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({ left: -sidebarInnerWidth }, 500)  //awel m aft7 bi7sel animate 

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    $(".links li").animate({ top: 300 }, 500)
}
closeSideNav()

$(".side-nav-menu i.open-close-icon").click(() => {
    // if condition cheak 3la lwa left=0 ya3ny bra anfz el close wla la anfz eno yo5rg
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

//function azher meals fe search lma akteb letter div + img + layer + h3

function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


//------------------------------------Page Search-----------------------------------------
// show Search Inputs
function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}
// fetch searchByName Inputs
async function searchByName(term) {
    closeSideNav() //awel m abd2 aktb yanfzly fuction closeSideNav
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`) //fetch data
    response = await response.json() //return data

    // response.meals ? displayMeals(response.meals) : displayMeals([]) //shart condition ? eli gow if: else
    if (response.meals) //lw fe response azahro lw la ab3t empty array
    {
        displayMeals(response.meals)
    }
    else {
        displayMeals([])
    }
    $(".inner-loading-screen").fadeOut(300)

}
// fetch searchByFLetterInputs
async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300) //yazher awel maft7 loading opacity(1) fe 300ml<0.5 Second 

    term == "" ? term = "a" : "";//lma adwr 3la haga b first letter bta3ha lw l2aet azhro lw delete letter still screen loading btlf, lw haw2fha en lw term fady ab3tly el hagat eli first a
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    if (response.meals) //lw fe response azahro lw la ab3t empty array
    {
        displayMeals(response.meals)
    }
    else {
        displayMeals([])
    }
    $(".inner-loading-screen").fadeOut(300) //a5fy loading 3s opacity(0)

}
//---------------------------------- page category----------------------------------------
//fetch data Categories
async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}

//azher div Categories
function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
//  api(strCategoryDescription).split space ben kol kelma w el tanya. slice bta5od (array0-20). join batl3hom mn array return Description 3ady mn8ir "" 

}
//fetch data CategoryMeals lma click 3la category , displayMeals

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20)) //btsht8l 3la array bt5od mnha el rakm eli ana 3aizah start 0-20 hatrg3ly l7d fen mn b3d 0

    $(".inner-loading-screen").fadeOut(300)

}
//------------------------------------ page area--------------------------------------------
//fetch data Area

async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals); //array feha all area

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}

//azher data Area

function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}
//fetch data AreaMeals lma click 3la area , displayAreaMeals

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
//------------------------------------ page Ingredients--------------------------------------------

//fetch data Ingredients

async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

//azher data Ingredients
function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
//  api(strDescription).split space ben kol kelma w el tanya. slice bta5od (array0-20) return mn start 0 l7d 20. join batl3hom mn array return Description 3ady mn8ir "" ''

}
//fetch data IngredientsMeals lma click 3liha, displaytIngredientsMeals

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20)) //btsht8l 3la array bt5od mnha el rakm eli ana 3aizah start 0-20 hatrg3ly l7d fen mn b3d 0
    $(".inner-loading-screen").fadeOut(300)

}
//------------------------------------ page Contact--------------------------------------------
function showContacts() {
    rowData.innerHTML = `  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control"
                    placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    "Special characters and numbers not allowed"
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="text" class="form-control"
                    placeholder="Enter Your Email">
                <div id="emailAlert"class="alert alert-danger w-100 mt-2 d-none">
                    "Email not valid *exemple@yyy.zzz"
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control"
                    placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    " Enter valid Phone Number"
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="text" class="form-control"
                    placeholder="Enter Your age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    " Enter valid age"
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation()" type="text" class="form-control"
                    placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    " Enter valid password *Minimum eight characters, at least one letter and one
                    number:*"
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" onkeyup="inputsValidation()" type="text" class="form-control"
                    placeholder="Enter Your Name">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    "Enter valid repassword "
                </div>
            </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3" disabled >Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")

    //foucs-->7atit el mouse gwa el input w abd2 aktb

document.getElementById("nameInput").addEventListener("focus", function() {
    // (da5lt gwa el input aktb )
    nameInputTouched = true
})
//arrow functions nafs tari2t nameInput
document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})
}

//validition 
//hai7sel haga lma foucs 3la input lma tkon b true
let nameInputTouched = false;//msh wa2fa gwa el input ,aw baktb s7 fe input--> msh haizher alert bl error
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            //lw baktb s7 ha5fy  alert el error
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            // lw baktb 8lt azher alert bl error
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }
    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)//add attr true eli hwa sha8lo 
    }
}

function nameValidation() {
    //test-->cheak valid
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return ( document.getElementById("repasswordInput").value ==( document.getElementById("passwordInput").value))
}
//--------------------------------------page MealDetails------------------------------------------
//fetch data MealDetails 
async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}


//azher displayMealDetails
function displayMealDetails(meal) {

    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}
