// error handel Function
document.getElementById('error').style.display='none';
const error = (action,message) => {
   const errorDiv = document.getElementById('error')
   const error = document.getElementById('message');
   errorDiv.style.display = action;
   error.innerText = message;
}
// error handel Function
const main = document.getElementById('search-result');
const searchButton = () => {
   const input = document.getElementById('search-field');
   const inputValue = input.value;
   if(inputValue === ''){
      error('block','Please do not leave the field blank');
      main.textContent ='';
   }else if(!isNaN(inputValue)){
      error('block','Please Give A String value');
      main.textContent ='';
   }else if(inputValue <= 0){
      error('block','Please Only use String value');
      main.textContent ='';
   }else{
      main.textContent ='';
      const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;

         fetch(url)
         .then(Response => Response.json())
         .then(data => phoneDisplay(data.data))
         error('none','');
         
      
   }

   input.value= '';
};

// const itemFind = products.find(product  => product.color == 'black');
// search-result
const phoneDisplay = (phoneAll) => {
   // console.log(phoneAll)
   const only20Value = phoneAll.slice(0, 3);
   // console.log(only20Value);

   if(only20Value.length == 0){
      error('block','Sorry, NO PHONE FOUND');
   }
   main2.textContent ='';
   const main = document.getElementById('search-result');
   for(const phone of only20Value){
         // console.log(phone);
         const div = document.createElement('div')
         div.classList.add('col');
         div.innerHTML =`
            
         <div class="card roundcard bodycard shadow">
            <img style="height:300px" src='${phone.image}' class="card-img-top w-50 mx-auto pt-3" alt="sorry not a image">
            <div class="row col-lg-12">
            <div class="card-body ms-4">
               <h5 class="card-title text-center">${phone.phone_name}</h5>
               <p class="card-text text-center">${phone.brand}</p>
               <div class="text-center">
                  <button onclick="phoneDetails('${phone.slug}')" class="btn button-style w-50 text-center">Detail</button>
               </div>
            </div>
            </div>
         </div>

            
         `;
         main.appendChild(div);
     

   }
};

const phoneDetails = (brand) => {
   // console.log(brand)
   // https://openapi.programming-hero.com/api/phone/
   // main.textContent ='';
   const url = `https://openapi.programming-hero.com/api/phone/${brand}`;
   fetch(url)
      .then(Response => Response.json())
      .then(data => singlePhoneDetails(data.data))

};
const main2 = document.getElementById('single-phone');
const singlePhoneDetails = (singlePhone) => {
   console.log(singlePhone);
   
   const main2 = document.getElementById('single-phone');
   main2.textContent = '';
   const div = document.createElement('div');
   div.classList.add('col-lg-6');
   div.classList.add('col-sm-12');
   div.classList.add('mx-auto');

   div.innerHTML = `
   <div class="card p-3 roundcard shadowsingle">
   <img style="height:350px; width:300px" src='${singlePhone.image}' class="card-img-top mx-auto" alt="sorry not a image">
   <div class="card-body">
     <h5 class="card-title text-center">Name: ${singlePhone.name}</h5>
     <p class="card-text text-center">ReleaseDate: ${singlePhone.releaseDate ? singlePhone.releaseDate:`NO Release Date Found`}</p>

     <!-- all detail phone  -->
     <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">Specification</th>
            <th scope="col">Detail</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Brand</th>
            <td>${singlePhone.brand}</td>
          </tr>
          <tr>
            <th scope="row">Display Size</th>
            <td>${singlePhone.mainFeatures.displaySize}</td>
          </tr>
          <tr>
            <th scope="row">Chip set</th>
            <td>${singlePhone.mainFeatures.chipSet}</td>
          </tr>
          <tr>
            <th scope="row">Memory</th>
            <td>${singlePhone.mainFeatures.memory}</td>
          </tr>
          <tr>
            <th scope="row">Storage</th>
            <td>${singlePhone.mainFeatures.storage}</td>
          </tr>
          

          
        </tbody>
      </table>

     <!-- .....................  -->
     <div class="d-grid gap-2 mx-auto">
        <a href="index.html" class="btn button-style" type="button">Back</a>
     </div>
    
   </div>
 </div>
   `;

   main.appendChild(div);
   



};
