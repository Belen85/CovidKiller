import './styles.scss';

import { vaccins } from './src/data';

// Check console if script.js works on console
console.log('belen');

// Check on console if data is well received
console.log(vaccins);

// Select la div with id app
const app = document.getElementById('app');
// Check on console what app shows
console.log(app);
console.log(vaccins[0].Image);

// Check if a image is shown on screen
// app.innerHTML = `<img src="/${vaccins[0].Image}"/>`;

// Insertion of the structure of the html
app.innerHTML = `<h1>Covid Killer Clinique</h1>
                <header>
                <button>Classer par prix</button>
                <button class="nonApprouves">Vaccins non approuvés</button>
                </header>
                <main id="app1" class="main-container"></main>
                <h1>Panier</h1>
                <footer id="app2"></footer><div id="app3"></div>`;

// Select la div with id app1 -> content of main
const app1 = document.getElementById('app1');

// Create function to show content in HTML of all vaccins
function populateList(arr, selector) {
  let mainContainer = '';
  for (let k = 0; k < arr.length; k++) {
    // console.log(arr[k]);
    let divCard = `<div id="${k}" class="card">`;
    let divCardContent = '';
    let divCardImage = '';
    // eslint-disable-next-line guard-for-in
    for (const key in arr[k]) {
      if (key === 'Image') {
        divCardImage += `<img src="/${arr[k][key]}">`;
      } else {
        divCardContent += `<p><b>${key}: </b> ${arr[k][key]}</p>`;
      }
    }
    divCard += `${divCardImage}${divCardContent}
    <label for="quantity">Quantity: </label>
    <input type="number" id="quantity${k}" name="quantity" min="1" max=${arr[k].Quantite}>
    <button id="${k}" class="reserver">Reserver</button></div>`;
    mainContainer += divCard;
  }

  selector.innerHTML = `${mainContainer}<div class="card card-empty"></div><div class="card card-empty"></div>`;
  // console.log(mainContainer);
}

// Call function populateList()
populateList(vaccins, app1);

// Create function to show content in HTML of all vaccins non approuvées
function populateListNonApprouvees(arr, selector) {
  let mainContainer = '';
  for (let k = 0; k < arr.length; k++) {
    // console.log(arr[k]);
    let divCard = `<div id="${k}" class="card">`;
    let divCardContent = '';
    let divCardImage = '';
    if (arr[k].Approuve === 'non') {
    // eslint-disable-next-line guard-for-in
      for (const key in arr[k]) {
        if (key === 'Image') {
          divCardImage += `<img src="/${arr[k][key]}">`;
        } else {
          divCardContent += `<p><b>${key}: </b> ${arr[k][key]}</p>`;
        }
      }
      divCard += `${divCardImage}${divCardContent}
      <label for="quantity">Quantity: </label>
      <input type="number" id="quantity${k}" name="quantity" min="1" max=${arr[k].Quantite}>
      <button id="${k}" class="reserver">Reserver</button></div>`;
      mainContainer += divCard;
    }
  }
  selector.innerHTML = `${mainContainer}<div class="card card-empty"></div><div class="card card-empty"></div>`;
  // console.log(mainContainer);
}

// Creation of variable "panier"
const panier = [];

// Select la div with id app2 -> content of footer
const app2 = document.getElementById('app2');

// Select la div with id app3 -> content of button commander
const app3 = document.getElementById('app3');

// AddeventListener on app

function clickDone(event) {
  const el = event.target;
  const index = el.id;
  if (el.matches('button')) {
    // Lorsque l'utilisateur clique sur "cacher les vaccins non approuvés"
    if (el.classList.contains('nonApprouves')) {
      el.classList.remove('nonApprouves');
      el.classList.add('approuves');
      populateListNonApprouvees(vaccins, app1);
    } else if (el.classList.contains('approuves')) {
      el.classList.remove('approuves');
      el.classList.add('nonApprouves');
      populateList(vaccins, app1);
      // Lorsqu'un utilisateur clique sur le bouton "réserver" d'une carte de vaccin
    } else if (el.classList.contains('reserver')) {
      el.classList.remove('reserver');
      // console.log(el);
      // console.log(index);
      // le bouton "réserver" de ce vaccin devient `disabled`
      el.outerHTML = `<button id="${index}" disabled>Reserver</button></div>`;
      const nomIdInput = `quantity${index}`;
      const divInput = document.getElementById(nomIdInput);
      const divInputValue = document.getElementById(nomIdInput).value;
      const divInputValueNumber = parseInt(divInputValue, 10);
      const divInputMin = document.getElementById(nomIdInput).min;
      const divInputMinNumber = parseInt(divInputMin, 10);
      const divInputMax = document.getElementById(nomIdInput).max;
      const divInputMaxNumber = parseInt(divInputMax, 10);
      // console.log(divInput);
      console.log(typeof (divInputValueNumber));
      console.log(typeof (divInputMinNumber));
      console.log(typeof (divInputMaxNumber));
      console.log(divInputValueNumber <= divInputMaxNumber);
      console.log(divInputValueNumber >= divInputMinNumber);
      // l'input de quantité disparaît de la carte
      divInput.outerHTML = '';
      // eslint-disable-next-line max-len
      // le vaccin apparaît dans la commande du `footer`, avec la quantité demandée (ex: Tozinameran x3)
      if (!panier.includes(vaccins[index])
      && divInputValueNumber <= divInputMaxNumber
      && divInputValueNumber >= divInputMinNumber) {
        panier.push(vaccins[index]);
        console.log(panier);
        app2.innerHTML += `<div id="${index}" class="card">
        <p>
        <b>${vaccins[index].Nom} x ${divInputValue}</b>
        </p>
        </div>`;
        app3.innerHTML = '<button class="commander">Commander</button>';
      }
      // panier.push(vaccins[index]);

      // Lorsqu'un utilisateur clique sur "passer la commande"
    } else if (el.classList.contains('commander')) {
      app.innerHTML = '<p>La commande a bien été enregistrée</p>';
    }
  }
}

app.addEventListener('click', clickDone);
