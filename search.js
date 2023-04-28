import { adatList, favorList } from "./adat.js";
import { useApiData, osszeallit, osszeallitLista } from "./searchAdatkezeles.js";
import { rendezBarmiSzerint } from "./rendezesSzures.js";
const CLIENT_ID = "104917961012311745144";
const API_KEY = "57dab50b4082eb64cdd00c120d18044a92953eee";
window.addEventListener("load", init);
let ART = $("article");
let ART2 = $("#favoritePage");
let ART3 = $("#listaPage");
let inData = "";

let favorButton = $("#favorite");
favorButton.on("click", () => {
  megjelenitKedvenc();
});
let caloriButton = $("#kaloria");
caloriButton.on("click", () => {
  ART3.append(osszeallitLista());
});


function init() {
  let searchButton = $("#search");
  searchButton.on("click", () => {
    inData = $(".form-control").val();
    sendApiRequest();
  });
}

async function sendApiRequest() {
  let APP_ID = "f283ef7a";
  let APP_KEY = "8673ac5e5cc63a4c96bb109ba1eb0a66";
  let response = await fetch(
    `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${inData}`
  );
  //console.log(response);

  let data = await response.json();
  console.log(data);
  let mainPage = $("#content");
  mainPage.html(useApiData(data));
  mainPage.append(osszeallit(data));
  mainPage.append(osszeallitLista(data));

  tarol(data, adatList);

  let kedvButton = $(".kedvBtn");
  const buttonCount = kedvButton.length;
  for (let i = 0; i < buttonCount; i++) {
    kedvButton.eq(i).on("click", () => {
      tarolKedvenc(data, i);
    });
  }
}

function tarol(data, lista) {
  let aktList = [{}];
  let l = data.hits.length;

  for (let index = 0; index < l; index++) {
    aktList[index] = `${data.hits[index].recipe.label}`;
  }

  lista.push(aktList);
}

function tarolKedvenc(data, id) {
  const nBtn = $(".last");
  let elem = {
    key: `${data.hits[id].recipe.label},${data.hits[id].recipe.url}`,
  };

  let aktList = [{}];

  for (let index = 0; index < data.hits.length; index++) {
    aktList[index] = `${data.hits[id].recipe.label}`;

    window.localStorage.setItem("elem", JSON.stringify(elem));
    aktList[0] = `${data.hits[id].recipe.label}`;

    //console.log(aktList[index]);
  }
}
function megjelenitKedvenc() {
  let CLIENT_ID = "104917961012311745144";
  let API_KEY = "57dab50b4082eb64cdd00c120d18044a92953eee";
  let SHEET_TITLE = "receptek";
  const SPREDSHEET_ID = "1e1SwSDsJ0aHAPIv0WwBdOlhJCoPK6SdD6rcudH7lSYg";
  let SHEET_RANGE = "E13:F23";
  //kiveszem a tárolt elemet a localStorage-ből
  if (localStorage.getItem("elem") !== null) {
    //  van tárolt érték
    let kiElem = localStorage.getItem("elem");
    let visszaElem = JSON.parse(kiElem);
    console.log(visszaElem);
    let visszaElemek = visszaElem.key.split(",");
    console.log(visszaElemek);
    let txtKedvencTabla = `<table class="table table-striped table-hover"><thead><tr><th>Recept</th></tr></thead><tbody>`;

    txtKedvencTabla += '<tr scope="row">';
    txtKedvencTabla += `<td>${visszaElemek[0]}<br> ${visszaElemek[1]}</td><td class=last></td><td id="txtCella"><p>Hozzáadod a kedvenceidhez?</p></td><td><button type="button" class="btn btn-secondary btn-sm" id="igenBtn">Igen</button></td><td><button type="button" class="btn btn-secondary btn-sm" id="megsemBtn">Mégsem</button></td>`;
    ART2.append(txtKedvencTabla);

    console.log(visszaElem);
    
    let igenButton = $("#igenBtn");
    igenButton.on("click", () => {
      console.log("valami")
      //sheethezAd();
    });
    
    let megsemButton = $("#megsemBtn");
    megsemButton.on("click", () =>{
      txtKedvencTabla =``
      ART2.html(txtKedvencTabla);
    })
  } else {
    // nincs tárolt érték
    ART2.html(`<h2 class="lead">Nem választottál ki receptet!</h2>`);
  }
  localStorage.clear();
}



// TODO:Bejelentkezés az API használatához ___nincs kész
function sheethezAd() {
  console.log("katt2");
  gapi.load("client:auth2", () => {
    gapi.client
      .init({
        apiKey: "57dab50b4082eb64cdd00c120d18044a92953eee",
        clientId: "104917961012311745144",
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
        scope: "https://www.googleapis.com/auth/spreadsheets",
      })
      .then(() => {
        // Hozzáférés a goggle sheets API-hoz
        console.log("valami");
        gapi.client.sheets.spreadsheets.values
          .update({
            spreadsheetId: "1e1SwSDsJ0aHAPIv0WwBdOlhJCoPK6SdD6rcudH7lSYg",
            range: "receptek!A1:B2", // A hely, ahol a tartalmat be akarjuk illeszteni
            valueInputOption: "USER_ENTERED", // A beillesztett adatok formátuma
            values: [["új leves", "új forrás"]],
          })
          .then(
            (response) => {
              console.log(`${response.result.updatedCells} cell updated.`);
            },
            (response) => {
              console.error(`Error: ${response.result.error.message}`);
            }
          );
      });
  });
}
