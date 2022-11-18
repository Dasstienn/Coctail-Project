import getData from "./data.js"

const ourData = getData()

function refresh() {


  const mainContainer = document.querySelector('.main-section')
  const container = document.querySelector('.section-center')
  const btnContainer = document.querySelector(".buttons")
  const cart = document.getElementById("cart")
  let cartTotal = cart.dataset.totalitems
  let newCartTotal = parseInt(cartTotal)

  let filtered = []

  const body = document.querySelector("body")
  const oldBody = body.innerHTML

  const oldMainContainer = mainContainer.innerHTML


  // 1st Step:
  // Display all coctails using function renderData()
  // Deadline Tuesday 8th November after class
  function renderData(arr) {
    for (let item of arr) {
      container.innerHTML += `
      <article class="menu-item">
      <img src="${item.strDrinkThumb}" class="photo" alt="${item.strDrink}" id="${item.idDrink}" />
          <div class="item-info">
              <div>
                  <h2>${item.strDrink}</h2>
              </div>
              <p class="item-text">${item.strAlcoholic}</p>
              <div class="page-wrapper">
                  <button id="addtocart" class="add-cart filter-btn" data-id="${item.idDrink}">Add To Cart<span class="cart-item"></span></button>
              </div>
          </div>
      </article>
      `

      const cartBtns = document.querySelectorAll(".add-cart")
      cartBtns.forEach(btn => {
        btn.addEventListener("click", addToCart)
      })

      function addToCart(e) {
        newCartTotal++
        e.target.classList.add("sendtocart")
        setTimeout(function () {
          e.target.classList.remove('sendtocart');
          cart.classList.add('shake');
          cart.dataset.totalitems = newCartTotal
          setTimeout(function () {
            cart.classList.remove('shake');
          }, 500)
        }, 1000)
      }


      // 3rd Step:
      // Display each cocktail individually once clicked
      const images = document.querySelectorAll(".photo")
      images.forEach(image => {
        image.addEventListener('click', displayOne)
      })

      function transition() {
        const image = document.createElement("img")
        image.classList.add("transition-gif")
        image.src = "https://cdn.dribbble.com/users/1541584/screenshots/5496900/cocktail.gif"
        body.innerHTML = ""
        body.appendChild(image)
      }

      function displayOne(e) {
        body.innerHTML = ""
        const currentId = e.target.id
        const currentItem = (passedId) => {
          return arr.filter(item => item.idDrink === passedId)[0]
        }
        const container = document.createElement("div")
        const ourItem = currentItem(currentId)

        container.classList.add("chosen-item")
        function showCoctail() {
          body.innerHTML = ""
          body.classList.add("selected-body")
          body.appendChild(container)
          container.innerHTML += `
          <img src="${ourItem.strDrinkThumb}" class="chosen-photo" alt="${ourItem.strDrink}" id="${ourItem.idDrink}" />
              <div class="item-info">
                  <div>
                      <h2>${ourItem.strDrink}</h2>
                      <p >${ourItem.strInstructions}</p>
                  </div>
                  <p class="item-text">${ourItem.strAlcoholic}</p>
                  <button class="add-cart" data-id="${ourItem.idDrink}">Add To Cart</button>
              </div>
          `
          const goBack = document.createElement("button")
          goBack.classList.add("go-back-btn")
          goBack.innerText = "Go Back"
          container.appendChild(goBack)
          goBack.addEventListener("click", toHome)
          goBack.id = "btn-back";
        }
        setTimeout(showCoctail, 2000)
        transition()
      }
    }
  }
  function toHome(arr) {
    body.innerHTML = oldBody
    body.classList.remove("selected-body")
    refresh()
  }


  // 2nd Step:
  // Select categories functionality
  function renderButtons(arr) {

    // create categories of coktails
    const categories = arr.reduce((values, item) => {
      if (!values.includes(item.strCategory)) {
        values.push(item.strCategory)
      }
      return values
    }, ["all"])


    // create category buttons
    const categoryBtns = categories.map(category => {
      return `<button class="filter-btn" type="button" data-category="${category}">${category}</button>`
    }).join("")

    btnContainer.innerHTML = categoryBtns


    // selecting all category buttons and adding click event listener
    const buttons = btnContainer.querySelectorAll('.filter-btn')
    // const buttons = document.querySelectorAll('.filter-btn')
    buttons.forEach(button => {
      button.addEventListener('click', filterCategories)
    })

    let currentBtn = document.querySelector('.filter-btn')
    currentBtn.classList.add("active-btn")

    function filterCategories(e) {
      container.innerHTML = ""

      // remove active btn class from our defult-btn
      currentBtn.classList.remove('active-btn')
      currentBtn = e.target
      // e.target is the current button
      e.target.classList.add('active-btn')

      let category = e.target.dataset.category
      if (category === 'all') {
        filtered = arr
      } else {
        filtered = arr.filter(item => item.strCategory === category)
      }
      renderData(filtered)
    }
  }


  // 4th Step:
  // Search cocktail functionality
  const searchInput = document.getElementById("search-coctail")

  function renderSearch(arr) {
    searchInput.addEventListener('keyup', () => {
      container.innerHTML = ""
      let searched = searchInput.value.toLowerCase()
      if (searched !== '') {
        filtered = ourData.filter(item => item.strDrink.slice(0, searched.length).toLowerCase() === searched)
      } else {
        filtered = arr
      }

      if (searched !== '' && filtered.length === 0) {
        container.innerHTML = `<h3 class="nothing-found">Nothing Found</h3>`
      } else {
        renderData(filtered)
      }

    })
  }

  renderData(ourData)
  renderButtons(ourData)
  renderSearch(ourData)

  const shop = document.getElementById("shop")
  shop.addEventListener("click", renderShop)

  function renderShop() {
    mainContainer.innerHTML = oldMainContainer
    refresh()
  }

  const about = document.getElementById("about")
  about.addEventListener("click", renderTeam)
  function renderTeam() {
    mainContainer.innerHTML = ""
    mainContainer.innerHTML = `
                <div class="team">
                  <img class="team-img" src="https://i.gifer.com/Cs0R.gif">
                  <div class="team-list">
                      <h3>Our Team</h3>
                      <p>Aiturgan</p>
                      <p>Dastan</p>
                      <p>Jacob</p>
                      <p>Kamila</p>
                      <p>Natalia</p>
                      <p>Zarina</p>
                  </div>
                </div>
    `
  }

}

refresh()