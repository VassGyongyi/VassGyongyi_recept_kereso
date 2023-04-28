export function osszeallit(lista) {
  let txt = `<div class="container">`;

  for (let index = 0; index < lista.length; index++) {
    for (const key in lista) {
      lista[key];
    }

    txt += `<div class= "card col-3 offset-1" style="width: 18rem;">`;

    txt += ` <div><h3 class="card-title">Recept</h3>`;
    for (const kulcs in lista[index]) {
      txt += `<p class="card-text">${lista[index][kulcs]}</p>`;
    }
    txt += `</div><div class="torolDiv"><button class="torolBtn">Törlés</button></div></div>`;
  }
  txt += `</div>`;

  return txt;
}

export function osszeallit2(lista) {
  let txt2="";
  txt2 += `<div class = "container">`;
  txt2 += `<div class="tabla"><table class="table table-striped table-hover"><tr><th>recept</th><th>eredete</th><th>fogás típusa</th><th>kalória</th></tr>`;
  
   for (let index = 0; index < lista.length; index++) {
    txt2 += `<tr>`;
    for (const kulcs in lista[index]) {
      txt2 += `<td>${lista[index][kulcs]}</td>`;
    }
    txt2 += `</tr>`;
  }
  txt2 += `</table>`;
  txt2 += `</div>`;

  return txt2;
}
