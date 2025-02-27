let title = document.getElementById('title')

let ads = document.getElementById('ads')
let price = document.getElementById('price')
let discount =document.getElementById('discount')
let taxes = document.getElementById('taxes')

let total = document.getElementById('TOTAL')

let count = document.getElementById('count')

let category = document.getElementById('category')

let create =document.getElementById('create')

let search = document.getElementById('search')
let searchTitle = document.getElementById('searchTitle')
let searchCategory = document.getElementById('searchCategory')

 let mood = 'create'
 let temp  // global 
 
function getTotal(){
    if(price.value != 0){
        let result = (+price.value +  +ads.value + +taxes.value )- +discount.value
        total.innerHTML = `Total  ${result}`
         total.style.background = "#28a745"
    }
    else {
        total.innerHTML = '';
        total.style.background = "red"; 
    }
}

// create product 
let dataProduct
 if(localStorage.product !=null){
    dataProduct= JSON.parse(localStorage.product)
 }
 else{
    dataProduct = []
 }

create.onclick= function createProduct(){
    let newProduct = {
        price: price.value,
        ads  :ads.value,
        title:title.value,
        discount: discount.value,
        taxes:taxes.value ,
        count:count.value,
        category:category.value,
        total:total.innerHTML
    }
    if(title.value != '' && price.value != '' && category.value != '' && newProduct.count <100){
        if(mood === 'create'){
            if(newProduct.count > 1){
                for( let i = 0; i < newProduct.count ; i++){
                    dataProduct.push(newProduct)
                }
             }
             else{
                dataProduct.push(newProduct)
             }
         }
         else{ dataProduct[temp] = newProduct
            mood == 'create'
            create.innerHTML = "create"
            count.style.display = "block"
    
         }
         clearData()
    }
    
     
    
    // localStorage data ->string
    localStorage.setItem('product' , JSON.stringify(dataProduct))
  
    showData()
}
//clear inputs
function clearData(){
    price.value = ''
    ads.value= ''
    title.value = ''
   discount.value = ''
    taxes.value = ''
   count.value= ''
    category.value = ''
    total.innerHTML = ''
}


// read data
function showData(){
    let table = ''
    for(i=0 ; i< dataProduct.length ; i++){
        table +=  `
        <tr>
        <td data-label="id">${i}</td>
        <td data-label="TITLE">${dataProduct[i].title}</td>
        <td data-label="PRICE">${dataProduct[i].price}</td>
        <td data-label="ADS">${dataProduct[i].ads}</td>
        <td data-label="DISCOUNT">${dataProduct[i].discount}</td>
        <td data-label="TOTAL">${dataProduct[i].total}</td>
        <td data-label="CATEGORY">${dataProduct[i].category}</td>
        <td ><button  onclick="UPDATE(${i} )"  id="update">Update</button></td>
        <td><button  onclick="deleteProduct(${i})"  id="delete">Delete</button></td>
    </tr> `
    }
    document.getElementById('tbody').innerHTML = table

    // deleteAll = document.getElementById('deleteAll')
    // if (dataProduct.length > 0) {
    //     deleteAll.style.display = 'block';
    // } else {
    //     deleteAll.style.display = 'none';
    // }
}
showData()
 // delete product
function deleteProduct(i){
    dataProduct.splice(i,1)
    localStorage.product=JSON.stringify(dataProduct)
    showData()
}


//delete All
function deleteAll(){

    localStorage.clear()
    dataProduct.splice(0)
    showData()
}

 //count 
 function UPDATE(i){
    title.value = dataProduct[i].title
    price.value = dataProduct[i].price
    ads.value= dataProduct[i].ads
    discount.value = dataProduct[i].discount
    taxes.value    = dataProduct[i].taxes
    category.value = dataProduct[i].category
    count.style.display = "none"
    create.innerHTML= "Update"
    getTotal()
    mood='update'
    temp=i
    scroll({
        top: 0 ,
        behavior : 'smooth'
    })

 }







//search
let searchMood = 'title'
 function searchProduct(id){
    search = document.getElementById('search')
   if(id == 'searchTitle'){
    searchMood = 'title'
    search.placeholder = "Search By Title"
   }
   else{
    searchMood = 'category'
    search.placeholder = "Search By Category"
   }
search.focus()
showData()
 }

function searchData(value){
    let table =''
    value = value.toLowerCase();
     if (searchMood === 'title'){
        for (let i =0; i < dataProduct.length ; i++){
            if(dataProduct[i].title.toLowerCase() .includes(value)){
                table +=  `
                            <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button  onclick="UPDATE(${i} )"  id="update">Update</button></td>
                            <td><button  onclick="deleteProduct(${i})"  id="delete">Delete</button></td>
                        </tr> `
                
            }
        
        }}

    else{ 
        for(let i= 0 ; i<dataProduct.length ;i++){
            if (dataProduct[i].category.toLowerCase().includes(value)){
                table += `<tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button  onclick="UPDATE(${i} )"  id="update">Update</button></td>
                <td><button  onclick="deleteProduct(${i})"  id="delete">Delete</button></td>  
                </tr>`
            }
        }}
        document.getElementById('tbody').innerHTML = table
        }
     

