
const appRoot = document.getElementById('app-root');

/*
write your code here

list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();
get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/



const appHeader = document.createElement('h1');
appHeader.textContent = `Countries Search`
appRoot.appendChild(appHeader)
const form = document.createElement('form');
form.classList.add('form-container')
const formText = document.createElement('p')
formText.classList.add('description')
formText.innerText = 'Please choose the type of search:'
form.appendChild(formText)
const optionsContainer = document.createElement('div')
optionsContainer.classList.add('option-container')
form.appendChild(optionsContainer)






function formView(){
    const searchOptions = ['By Region', 'By Language']
    appRoot.appendChild(form)
     searchOptions.forEach((item, i) => {
        let label = document.createElement('label'); 
        label.innerText = item; 
        let input = document.createElement('input'); 
        input.type = 'radio',
        input.name = 'option',
        input.onclick = getOptionValue()
        input.value = searchOptions[i]
        optionsContainer.appendChild(label)
        label.appendChild(input)
     })

}



function getOptionValue (){

  type = document.querySelectorAll(`[name='option']:checked`)
  for(let option of type.values()){
    if (option.value === 'By Region'){
        countriesData = externalService.getRegionsList()
        countriesData.unshift('Select value')
      
    }
    if(option.value === 'By Language'){
        countriesData = externalService.getLanguagesList()
        countriesData.unshift('Select value')
    }
  
    let select = document.createElement('select');
    select.classList.add('select-quary')
    slectContainer.appendChild(select)
    countriesData.forEach((item, i) => {
      let option = document.createElement('option');
      option.setAttribute('value', countriesData[i]);
      let optionText = document.createTextNode(item);
     select.appendChild(option)
     option.append(optionText)

     
     tableGenerator(select)

     

    })

   
  }
}







function tableGenerator(select){
          select.addEventListener('change',() => {


            let collection = select.selectedOptions;
            let output = '';
   
            for (let i = 0; i < collection.length; i++) {
              output += collection[i].value;
          
            }
            dispayTable = document.getElementsByTagName('table')
           
            let checkIfTableExist = '';
            for (let i = 0; i < dispayTable.length; i++) {
              checkIfTableExist += dispayTable[i].innerHTML;
             
              if(checkIfTableExist.length > 0){
                dispayTable[i].parentNode.removeChild(dispayTable[i])
              }

         
            }


            table(output)
         dddd = document.getElementById('label-text')
         dddd.innerText=''
         
           })
      }





function selectOption(){
    form.addEventListener('change', () => {
        getOptionValue()
        selectRemove = document.querySelector('select') 
      if(selectRemove.length> 0){
        selectRemove.remove()
      }
  

    })
    


 
}
selectOption()






function appConstructor(){
    formView()
    let select = document.createElement('select');
    let option = document.createElement('option');
     slectContainer = document.createElement('div')
     selectText = document.createElement('p')
    selectText.classList.add('description')
    slectContainer.classList.add('select-container')
    slectContainer.setAttribute('id', 'select-wraper')
    selectText.innerText = 'Please choose search query:'
    appRoot.appendChild(slectContainer)
    slectContainer.appendChild(selectText)
    slectContainer.appendChild(select)
    select.appendChild(option)
    option.innerText = 'Select value'

  labelText = document.createElement('p')
  labelText.setAttribute('id', 'label-text')
  labelText.innerText = 'No items, please choose search query'
  appRoot.insertAdjacentElement('beforeend', labelText)
}
appConstructor()






function table(output){
  type = document.querySelectorAll(`[name='option']:checked`)
  for(let option of type.values()){
    if (option.value === 'By Region'){
        data = externalService.getCountryListByRegion(`${output}`)
      
    }
    if(option.value === 'By Language'){
        data = externalService.getCountryListByLanguage(`${output}`)
    }
  }

  
    btn = document.createElement('button')
    btn.innerText = 'Click'
   
     headers = [`Country name`, 'Flag','World region',`Area`,'Capital','Languages']



    let table = document.createElement('table') 
    table.setAttribute('id', 'table-container');
    let headerRow = document.createElement('tr')
    
    headers.forEach((headerText, i) => {
     
         let header = document.createElement('th');
         header.classList.add(`table-header`)
         header.classList.add(`table-header-${i}`)

         let btn1 = document.createElement('button')
         btn1.classList.add(`header-btn-countries`)
         btn1.classList.add(`header-btn-countries-${i}`)
         btn1.setAttribute('id', `btn-countries-change-${i}`)
         btn1.innerText = '↕'
         header.appendChild(btn1)

         let btn2 = document.createElement('button')
         btn2.classList.add(`header-btn-area`)
         btn2.classList.add(`header-btn-area-${i}`)
         btn2.setAttribute('id', `btn-area-change-${i}`)
         btn2.innerText = '↕'
         header.appendChild(btn2)

        let textNode = document.createTextNode(headerText)
        header.appendChild(textNode)
        headerRow.appendChild(header)


        let countrieRow = 0 
        btn1.addEventListener('click',() => {
          sortTable(countrieRow)
       
        })
let areaRow = 3
        btn2.addEventListener('click',() => {
          sortTableNumbers(areaRow)
        
        })
    })
    

    table.appendChild(headerRow)

    data.forEach(item => {
      
        let row = document.createElement('tr');
        row.classList.add('table-row')
         item.languages = Object.values(item.languages)
        Object.values(item).forEach(text => {
item.flagURL = ''
      
            let cell = document.createElement('td');
            let textNode = document.createTextNode(`${text}`)
            cell.appendChild(textNode)
            row.appendChild(cell)
         
    
        })

        table.appendChild(row)




    })


    selectOption(table)
    appRoot.appendChild(table)
}









function sortTable(n) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById('table-container');
  switching = true;

  dir = 'asc';

  while (switching) {
   
    switching = false;
    rows = table.rows;
   
    for (i = 1; i < rows.length - 1; i++) {
     
      shouldSwitch = false;
    
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];

      let togleArrowCountry = document.getElementById('btn-countries-change-0')
      let togleArrowArea = document.getElementById('btn-area-change-3')
   
      if (dir === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         
        
          togleArrowCountry.innerText = '↑'
          togleArrowArea.innerHTML = '↕'
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          togleArrowCountry.innerText = '↓'
          togleArrowArea.innerHTML = '↕'
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
     
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
     
      switchcount ++;
    } else {
     
      if (switchcount === 0 && dir === 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}




function sortTableNumbers(n) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById('table-container');
  switching = true;
  dir = 'asc';
  while (switching) {

    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
   
      shouldSwitch = false;

      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
    


      let togleArrowArea = document.getElementById('btn-area-change-3')
      let togleArrowCountry = document.getElementById('btn-countries-change-0')

    if (dir === 'asc') {
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        togleArrowArea.innerText = '↑'
        togleArrowCountry.innerHTML = '↕'
        shouldSwitch = true;
        break;
      }
    } else if (dir === 'desc') {
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        togleArrowArea.innerText = '↓'
        togleArrowCountry.innerHTML = '↕'
        shouldSwitch = true;
        break;
      }
    }
    }

    if (shouldSwitch) {

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
     
      if (switchcount === 0 && dir === 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}