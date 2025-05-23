//console.log("%c\n     Always trust the     \n\n%c███████╗███╗ ╔███╗███████╗\n██═════╝████ ████║██╔════╝\n███████ ███╚█╝███║█████╗\n╚════██╗███╔══███║██╔══╝\n███████║███║  ███║███████╗\n╚══════╝╚══╝  ╚══╝╚══════╝\n\n%c   SAO • TECH SOLUTIONS   \n", "font-size:15px; color:white; background:#226109;", "font-size:15px; color:#226109", "font-size:15px; color:white; background:#226109;")
const url = "/js/destinations.json";

//Menu
document.querySelector('a.menu-toggle').addEventListener('click', function() {
  document.querySelector('nav > ul').classList.toggle('active-menu');
});

//Document Title
function title() {
  if(window.location.pathname != "/" && window.location.pathname != "/index.html") {
    let lastBreadcrumb = document.querySelector("ul.breadcrumb > li:last-child");
    if (lastBreadcrumb) {
      document.title = document.title + " • " + lastBreadcrumb.innerText;
    }
  }
}

//Gallery
function gallery() {
  let bannerImages = document.querySelectorAll("#welcome div.gallery > img")
  let currentPosition = 0;
  let lastPosition = bannerImages.length;

  setInterval(function() {
    currentPosition++
    if(currentPosition == lastPosition) {
      currentPosition = 0;
    }
    bannerImages.forEach((img, index) => {
      if(index == currentPosition) {
        img.dataset.show = "true";
        img.style.opacity = 1;
      }else {
        img.dataset.show = "false";
        img.style.opacity = 0;
      }
    });
  }, 6000);
}

//Image Grid
/*6 Images Grid*/
// let selected = ["São Paulo", "Uyuni", "Taj Mahal","Buenos Aires", "Edimburgh", "Punta Cana"]
// let highlight = ["Buenos Aires"];

/*12 Images Grid*/
let selected = ["São Paulo", "Uyuni", "Taj Mahal", "Krakow", "Phi Phi Islands", "Buenos Aires", "Salto Angel", "Athens", "Lima", "Dublin", "Edimburgh", "Punta Cana"]
let highlight = ["Taj Mahal", "Edimburgh"];
function imageGrid() {
  fetch(url).then(response => response.json()).then(data => {
    if(window.location.pathname == "/" || window.location.pathname == "/index.html") {
      document.querySelector("#destinations > .destinations").textContent = "";
      data.forEach((destination, index) => {
        selected.forEach((select, index) => {
          if(select.includes(destination.city)) {
            let img = document.createElement("img");
            document.querySelector("#destinations > .destinations").appendChild(img);
            img.src = destination.src;
            img.alt = destination.city + " in " + destination.country;
            img.dataset.country = destination.country;
            img.dataset.city = destination.city;
            img.dataset.continent = destination.continent;
            
            /*justhighlight.forEach((h, i) => {
            });*/
            if(selected.length > 6) {
              if(highlight[0].includes(destination.city)) {
                img.classList.add("highlight");
              }
              if(highlight[1].includes(destination.city)) {
                img.classList.add("downlight");
              }
            }
            if(selected.length == 6) {
              //grid-template-rows
              document.querySelector("#destinations > div.destinations").style.gridTemplateRows = "repeat(3, 1fr)";
              if(highlight[0].includes(destination.city)) {
                img.classList.add("highlight");
              }
            }
          }
        });
      });
    }
  }).catch((err) => document.querySelector("#destinations > .destinations").textContent = "Failed to load destinations images.");
}

//Destinations Page
function destinations(ppr) {
  if(window.location.pathname == "/destinations.html" || window.location.pathname == "/destinations-city.html") {
    document.querySelector("#destinations div.destinationsList").textContent = "";
    ppr.forEach((destination, index) => {
      let article = document.createElement("article");
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");
      let picture = document.createElement("picture");
      let img = document.createElement("img");
      let h2 = document.createElement("h2");
      let p = document.createElement("p");
      let a = document.createElement("a");
      let a2 = document.createElement("a");
      let clearfix = document.createElement("div");
      
      document.querySelector("#destinations div.destinationsList").appendChild(article);
      article.appendChild(div1);
      div1.appendChild(picture);
      picture.appendChild(img);
      picture.appendChild(a2);
      a2.appendChild(img);
      article.appendChild(div2);
      div2.appendChild(h2);
      div2.appendChild(p);
      div2.appendChild(a);
      document.querySelector("#destinations div.destinationsList").appendChild(clearfix);

      img.src = destination.src;
      img.alt = destination.city + " in " + destination.country;
      h2.textContent = destination.city;
      p.textContent = destination.about;
      a.textContent = "Read More";
      a.href = "/destinations-city.html?city=" + destination.city;
      a2.href = "/destinations-city.html?city=" + destination.city;
      clearfix.classList.add("clearfix");
    });
  }
}
//Filter
function filterList() {
  fetch(url).then(response => response.json()).then(data => {
    if(window.location.pathname == "/destinations.html") {
      let jsonDestination = data;
      destinations(jsonDestination);
  
      let totalProducts = jsonDestination;
      let europe = jsonDestination.filter((d) => d.continent == "Europe");
      let asia = jsonDestination.filter((d) => d.continent == "Asia");
      let southAmerica = jsonDestination.filter((d) => d.continent == "South America");
      let caribbean = jsonDestination.filter((d) => d.continent == "Caribbean");
  
      document.querySelector("label[for='all'] > span").textContent = totalProducts.length.toString().padStart(2, "0");
      document.querySelector("label[for='europe'] > span").textContent = europe.length.toString().padStart(2, "0");
      document.querySelector("label[for='asia'] > span").textContent = asia.length.toString().padStart(2, "0");
      document.querySelector("label[for='southamerica'] > span").textContent = southAmerica.length.toString().padStart(2, "0");
      document.querySelector("label[for='caribbean'] > span").textContent = caribbean.length.toString().padStart(2, "0");
  
      document.addEventListener("click", function(e) {
        if(e.target.name == "continent") {
          if(e.target.id == "all") {
            destinations(totalProducts);
            document.querySelector("#list > div.destinationsResults > h2").textContent = "All Destinations";
          }else if(e.target.id == "europe") {
            destinations(europe);
            document.querySelector("#list > div.destinationsResults > h2").textContent = "Europe Destinations";
          }else if(e.target.id == "asia") {
            destinations(asia);
            document.querySelector("#list > div.destinationsResults > h2").textContent = "Asia Destinations";
          }else if(e.target.id == "southamerica") {
            document.querySelector("#list > div.destinationsResults > h2").textContent = "South America Destinations";
            destinations(southAmerica);
          }else if(e.target.id == "caribbean") {
            document.querySelector("#list > div.destinationsResults > h2").textContent = "Caribbean Destinations";
            destinations(caribbean);
          }
        }
      });
    }
  }).catch((err) => document.querySelector("#destinations > p").textContent = "Failed to load destinations list. Please, try again later.\n\n" + err);
}

//Destination Single Page
function destinationsSingle() {
  fetch(url).then(response => response.json()).then(data => {
    if(window.location.pathname == "/destinations-city.html") {
      let jsonDestination = data;
      let currentCity = jsonDestination.filter((d) => d.city == new URLSearchParams(window.location.search).get('city'));
      if(currentCity.length > 0) {
        currentCity.forEach((city, index) => {
          //Breadcrumb
          document.querySelector("ul.breadcrumb > li:last-child").textContent = city.city
          //Main Banner
          document.querySelector("div.image-profile > img").src = city.src;
          //Seigthseeing + Type of Tourism Bubbles
          document.querySelector("ul.spots").innerHTML = "";
          city.sightseen.forEach((type, index) => {
            let li = document.createElement("li");
            document.querySelector("ul.spots").appendChild(li);
            li.textContent = type;
          });
          city.typeOfTourism.forEach((type, index) => {
            let li = document.createElement("li");
            document.querySelector("ul.spots").appendChild(li);
            li.textContent = type;
          });

          //Review Bar and Stars
          let score = (100*city.review)/5
          document.querySelector(".review div.review-bar").style.width = score.toString() + "%";
          document.querySelector(".review span").innerText = city.review;
          //city name
          document.querySelector("div.destination-description > h1").textContent = city.city;
          document.querySelector("div.destination-description > p").innerHTML = city.description;
          //price
          if(city.salePrice > 0) {
            document.querySelector("span.price-was").textContent = "$" + city.price.toLocaleString();
            document.querySelector("span.price-total").textContent = "$" + city.salePrice.toLocaleString();
          }else {
            document.querySelector("span.price-was").remove();
            document.querySelector("span.price-total").textContent = "$" + city.price.toLocaleString();
          }

          //Included
          document.querySelector("aside").textContent = "";
          function includes(src, include) {
            let p = document.createElement("p");
            let i = document.createElement("i");
            let img = document.createElement("img");
            let span = document.createElement("span");
            document.querySelector("aside").appendChild(p);
            p.appendChild(i);
            i.appendChild(img);
            p.appendChild(span);
            img.src = src;
            img.alt = include;
            span.textContent = include;
          }
          if(city.includes.ticket === true) {
            includes("images/icon-plane.png", "Flight Tickets Included");
          }
          if(city.includes.accommodation === true) {
            includes("images/icon-hotel.png", "Hotel Included");
          }
          if(city.includes.meal === true) {
            includes("images/icon-meal.png", "Meal Included");
          }
          if(city.includes.excursions > 0) {
            let number = city.includes.excursions + " excursions & visits";
            includes("images/icon-excursions.png", number);
          }
          if(city.includes.days > 0) {
            let number = city.includes.days + " days";
            includes("images/icon-calendar.png", number);
          }

          //Find More in the Continent
          document.querySelector("#list > div > h2 > span").textContent = city.continent;
          let currentContinent = city.continent;
          let continentFilter = jsonDestination.filter((d) => d.continent == currentContinent);
          continentFilter = continentFilter.filter((c) => c.city !== new URLSearchParams(window.location.search).get('city'))
          if(continentFilter.length > 0) {
            continentFilter.forEach((ccc, index) => {
              if(ccc.city != city.city) {
                destinations(continentFilter);
              }
            });
          }else {
            document.querySelector("#list").remove()
          }
        });
      }else {
        document.querySelector(".destinationProfile").textContent = "Sorry. Destination not found."
      }
    }
  }).catch((err) => document.querySelector("#list").textContent = "Failed to load destinations list. Please, try again later.\n\n" + err);
}

//Form Validation
function formValidation() {
  if(window.location.pathname == "/contact.html") {
    document.querySelector("#contact > form").addEventListener("submit", function(e) {
      let errors = [];
      let nameField = document.querySelector("input[name='name']");
      let emailField = document.querySelector("input[name='email']");
      let phoneField = document.querySelector("input[name='phone']");
      let messageField = document.querySelector("textarea[name='message']");
    
      function g_validateMail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
      if(nameField.value == "") {
        errors.push(nameField.dataset.requiredMessage)
      }
      if(emailField.value == "") {
        errors.push(emailField.dataset.requiredMessage);
      }
      if(!emailField.value == "" && !g_validateMail(emailField.value)) {
        errors.push(emailField.dataset.requiredInvalid);
      }
      if(phoneField.value == "") {
        errors.push(phoneField.dataset.requiredMessage)
      }
      if(messageField.value == "") {
        errors.push(messageField.dataset.requiredMessage)
      }
    
      if(errors.length > 0) {
        e.preventDefault();
        if(document.querySelector("#contact > form > div.required")) {
          document.querySelector("#contact > form > div.required").remove()
        }
    
        let required = document.createElement("div");
        let unList = document.createElement("ul");
        document.querySelector("#contact > form").appendChild(required);
        required.appendChild(unList);
        required.classList.add("required");
        errors.forEach((error, index) => {
          let list = document.createElement("li");
          unList.appendChild(list);
          list.textContent = error;
        });
      }
      if(errors.length <= 0) {
        e.preventDefault();
        if(document.querySelector("#contact > form > div.required")) {
          document.querySelector("#contact > form > div.required").remove()
        }
        let required = document.createElement("div");
        let p = document.createElement("p");
        document.querySelector("#contact > form").appendChild(required);
        required.classList.add("required");
        required.classList.add("success");
        required.appendChild(p)
        p.textContent = "Thank you! Your message has been sent. We will contact you in a moment.";
      }
    });
  }
}

//Footer
function footer() {
  let date = new Date()
  document.querySelector("body > main > footer > p:nth-child(1)").textContent = "© " + date.getFullYear() + " All Rights Reserved";
}

title();
gallery();
imageGrid();
filterList();
destinationsSingle();
formValidation();
footer();
