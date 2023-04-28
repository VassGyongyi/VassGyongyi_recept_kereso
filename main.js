import {receptek} from "./adat.json"
import {osszeallit, osszeallit2} from "./adatkezeles.js";
//import { rendezBarmiSzerint } from "./rendezesSzures.js";
let kartyak;
let tablazat;
let ARTICLE;
  $(function () {
    let url = "./adat.json";
    betolt(url, megjelenit);
    //rendezBarmiSzerint(RECEPTLISTA,RECEPTLISTA.kor, -1);
    ARTICLE = $("article");
    
    const GOMB = $(".torol");
    GOMB.on("click", function(event) {
      let index = GOMB.index($(this));
      egerEsemeny(event, index);
    });
  

//TODO:új recept rögzítése   
    //const SUBMIT = $("#rogzites");
    //SUBMIT.on("click", ujRecept);
    
  });
  
  function betolt(url, callbackFv) {
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        callbackFv(data);
      })
      .catch((err) => console.log(err));
  } 
  
function megjelenit(adatok){

kartyak = $("section.kartyak");
tablazat =$("section.tablazat");
kartyak.html(osszeallit(adatok));
tablazat.html(osszeallit2(adatok));
}

// törlés funkció TODO:nincs kész
function egerEsemeny(event, i) {
  const GOMB = $(event.target);
  GOMB.parent().remove();
  delete adatok[i];
  let tablazat = $("article table");
  tablazat.html(tablazatOsszeallit(adatok));
}

/* function torlesGomb() {
  const TR = document.querySelectorAll("tr");

  for (let index = 0; index < RECEPTLISTA.length; index++) {
    const TD = document.createElement("td");
    const TORLES = document.createElement("button");
    TORLES.innerText = "Törlés";
    TR[index].appendChild(TD);
    TD.appendChild(TORLES);
    TORLES.addEventListener("click", function () {
      torlesFunkcio(index);
    });
  }
}

function torlesFunkcio(index) {
  RECEPTISTA.splice(index, 1);
  kartyak.innerHTML =osszeallit(RECEPTLISTA);
  tablazat.innerHTML=osszeallit2(RECEPTLISTA);
  torlesGomb(RECEPTISTA);
}
 */
function ujRecept() {
  const receptek = {};
  const ADAT = $("input");

  //szedd össze az űrlap adatait,
  //tegyük bele egy objektumba
  //fűzzük hozzá a listához

 //console.log("Vauka");
  const NevInputElem = document.querySelector("#neve");
  receptek.név = NevInputElem.value;

  const KorInputElem = document.querySelector("#eredet");
  receptek.eredet = KorInputElem.value;

  const FajtaInputElem = document.querySelector("#fogás");
 receptek.fogás = FajtaInputElem.value;

  const LabaInputElem = document.querySelector("#kalória");
  receptek.kalória = LabaInputElem.value;
 

  kartyak.innerHTML =osszeallit(ADAT);
  tablazat.innerHTML=osszeallit2(ADAT);
  torlesGomb();
}
