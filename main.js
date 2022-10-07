let elBody = document.querySelector(".code");
let elName = document.querySelector(".name")
let elMoney = document.querySelector(".money")
let elToSumm = document.querySelector(".to__summ")
let elData = document.querySelector(".data")
let local = window.localStorage.getItem("token");

let token = [];

if (local) {
  token = JSON.parse(local)
}


async function getData(url) {
  try {
    let firstData = await fetch(url)
    let { data } = await firstData.json();

    token = data;

    localStorage.setItem("token", JSON.stringify(token));
  }
  catch (error) {
    console.log('error');
  }
}

getData("https://pressa-exem.herokuapp.com/api-49");


function render(token) {

  elBody.innerHTML = ''

  for (let i = 0; i < token.length; i++) {
    let newTr = document.createElement("tr")
    let newThCode = document.createElement("th")
    let newThName = document.createElement("td")
    let newThWord = document.createElement("td")
    let newThMoney = document.createElement("td")
    let newThData = document.createElement("td")
    let newThBookmark = document.createElement("td")

    // Code
    newThCode.textContent = token[i].Code;

    // Name
    newThName.textContent = token[i].CcyNm_UZ;

    // Word
    newThWord.textContent = token[i].Ccy;

    // Money
    newThMoney.textContent = token[i].Diff;

    // Data
    newThData.textContent = token[i].Date;

    // Create button
    // let ellabel = document.createElement("label")

    // let elinp = document.createElement("input")
    // elinp.type = "checkbox"

    // let elbtn = document.createElement("button")
    // elbtn.textContent = 'go'

    // ellabel.append(elinp, elbtn)
    // newThBookmark.append(ellabel)

    // Appand all to tr
    newTr.append(newThCode, newThName, newThWord, newThMoney, newThData, newThBookmark)
    elBody.append(newTr)

  }
}

// Sort

let sortArr = [...token];

let sort = document.querySelector(".sort");

sort.addEventListener("change", () => {
  sortArr.sort((a, b) => {
    if ((a.Diff * 1) > (b.Diff * 1)) return 1;
    if ((a.Diff * 1) < (b.Diff * 1)) return -1;
    return 0;
  })

  if (sort.value === "expensive") {
    render(sortArr.reverse())
  }
  else if (sort.value === "cheap") {
    render(sortArr)
  }
})

// Search

let inpSearch = document.querySelector(".inpt");

inpSearch.addEventListener("input", () => {
  let inputValue = inpSearch.value.trim() * 1;
  let filterData = sortArr.filter(token => token.Diff > inputValue);

  render(filterData);
})

// Modal

let modal = localStorage.getItem("modal");

let modalBtn = document.querySelector(".modal__btn");

setTimeout(() => {
  if(!modal){{
    modalBtn.click();
    localStorage.setItem("modal", JSON.stringify("modal"))
  }}
}, 5000);
render(token);


window.addEventListener("load", ()=> {
  let loader = document.querySelector(".load")

  loader.classList.add("d-none");

  // loader.addEventListener("")
})
