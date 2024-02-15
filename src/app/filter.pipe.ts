import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterStatus: string) {

    if(value=="" || filterStatus==""){
      return value
    }

    let resultData: Array<any> = [];

    filterStatus = filterStatus.toLowerCase().replace(' ','')
    // console.log("filterStatus:" + filterStatus)
    
    if(filterStatus.startsWith('tag:')){
      let searchValue = filterStatus.replace('tag:','')
      for(let aux of value){
        if(aux.tag){
          if(aux.tag.toLowerCase().replace(' ','').includes(searchValue)){
            resultData.push(aux);
          }
        }
      }
      return resultData;
    }
    else if(filterStatus.startsWith('texto:') || filterStatus.startsWith('conteúdo:') || filterStatus.startsWith('content:')){
      //Poesquisa por conteudo
      let searchValue = filterStatus.replace('texto:','')
      // console.log("searchValue:" + searchValue)
      for(let aux of value){
        if(aux.text.toLowerCase().includes(searchValue)){
          resultData.push(aux);
        }
      }
      // console.log("resultData:" , resultData)
      return resultData;
    }
    else{
      //Pesquisa por titulo
      let searchValue = filterStatus.replace(' ','')
      for(let aux of value){
        if(aux.title.toLowerCase().replace(' ','').includes(searchValue)){
          resultData.push(aux);
        }
      }
      return resultData;
    }
    
  }

}