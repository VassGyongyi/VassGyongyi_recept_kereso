export function rendezBarmiSzerint(lista, kulcs) {
    let rendezettLista = lista.sort(function(a, b) {
        if (a[kulcs] < b[kulcs]) {
          return -1;
        }
        if (a[kulcs] > b[kulcs]) {
          return 1;
        }
        return 0;
      });
      console.log(rendezettLista)
      return rendezettLista;
      
    }
