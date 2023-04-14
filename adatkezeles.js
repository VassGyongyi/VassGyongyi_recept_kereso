import { adatList } from "./adat.js";
import { rendezBarmiSzerint } from "./rendezesSzures.js";
const segedList = [{}];
const segedList2 = [{}];

let ART3 = $("#listaPage");

export function useApiData(data) {
  let l = data.hits.length;
  let txt4 = `<div div="wrapper">
  <div class="card col-3 offset-1" style="width: 18rem;">
    <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.hits[0].recipe.label}</h5>
    <p class="card-text">${data.hits[0].recipe.source}</p>
    <a href="${data.hits[0].recipe.url}" target="_blank" class="btn btn-primary">Recept</a>
    <button class="btn btn-primary">Kedvenc</button>
   </div>
  </div>
  </div>
`;

  for (let i = 1; i < l; i++) {
    txt4 += `<div div="wrapper">
  <div class="card col-3 offset-1" style="width: 18rem;">
    <img src="${data.hits[i].recipe.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.hits[i].recipe.label}</h5>
    <p class="card-text">${data.hits[i].recipe.source}</p>
    <a href="${data.hits[i].recipe.url}" target="_blank" class="btn btn-primary">Recept</a>
    
   </div>
  </div>
  </div>
`;
  }

  return txt4;
}

export function osszeallit(data) {
  let rendezettList;
  let l = data.hits.length;
  let txtproba;
  for (let i = 0; i < l; i++) {
    let roundCal = Math.round(`${data.hits[i].recipe.calories}`);
    let obj = {
      label: data.hits[i].recipe.label,
      calories: roundCal,
      cuisineType: data.hits[i].recipe.cuisineType[0],
    };
    segedList.push(obj);
  }

  rendezettList = rendezBarmiSzerint(segedList, "label");

  if (rendezettList) {
    txtproba = `<table id=tabla class="table table-striped table-hover "><thead><tr><th id="rendLabel">Recept</th><th id="rendCalories">Kalória</th><th id="rendCuisineType">Eredet</th></tr></thead><tbody>`;
    for (let i = 1; i < rendezettList.length; i++) {
      txtproba += '<tr scope="row">';
      txtproba += `<td>${rendezettList[i].label}</td>`;
      txtproba += `<td>${rendezettList[i].calories}</td><td>${rendezettList[i].cuisineType}</td><td class=last><button type="button" class="btn btn-secondary btn-sm kedvBtn">Kedvencekhez ad</button></td>`;
    }
  }
  txtproba += `</tr></tbody></table>`;

  return txtproba;
}

export function osszeallitLista(data) {
  let rendezettList2;
  let l = data.hits.length;
  let txtLista;
  for (let i = 0; i < l; i++) {
    let roundCal = Math.round(`${data.hits[i].recipe.calories}`);
    let obj = {
      label: data.hits[i].recipe.label,
      calories: roundCal,
      
    };
    segedList2.push(obj);
  }
  console.log(segedList2);
  rendezettList2 = rendezBarmiSzerint(segedList2, "calories");
  console.log(rendezettList2);
  if (rendezettList2) {
    txtLista = `<div id=listaPage><h1 class="display-2">Kalória szerinti lista</h1></div><div><ol class="list-group list-group-numbered">`;
    for (let i = 1; i < rendezettList2.length; i++) {
      txtLista += `<class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto">
      <div class="fw-bold">${rendezettList2[i].label}</div> ${rendezettList2[i].calories}</div></li>`;
    }
  }
  txtLista += `</ol></div>`;

  return txtLista;
}
let caloriButton = $("#kaloria");
caloriButton.on("click", () => {
  ART3.append(osszeallitLista());
});

