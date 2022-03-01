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
const main2 = document.getElementById('single-phone');

// show all phone 
document.getElementById('btn-show-more-phone').style.display='none';
const allPhoneShowButton = (action) => {
   const morePhone = document.getElementById('btn-show-more-phone');
   morePhone.style.display= action;
  
};



//START fast search button 
const searchButton = () => {
   const input = document.getElementById('search-field');
   const inputValue = input.value;
   const inputValueLower = inputValue .toLowerCase();
   console.log(inputValueLower)
   if(inputValueLower === ''){
      error('block','Please do not leave the field blank');
      main.textContent ='';
   }else if(!isNaN(inputValueLower)){
      error('block','Please Give A String value');
      main.textContent ='';
   }else if(inputValueLower <= 0){
      error('block','Please Only use String value');
      main.textContent ='';
   }else{
      main.textContent ='';
      const url = `https://openapi.programming-hero.com/api/phones?search=${inputValueLower}`;

         fetch(url)
         .then(Response => Response.json())
         .then(data => phoneDisplay(data.data))
         error('none','');

   }

   input.value= '';
};
const allPhoneShow = (phoneAllShow) => {
   const button = document.getElementById('show-all');

   button.addEventListener('click', () => {
      const main = document.getElementById('search-result');
      main.textContent = '';
      

      main2.textContent ='';
      // const main = document.getElementById('search-result');
      
      for(const phone of phoneAllShow){
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
            allPhoneShowButton('block');
            
   
      }
   })
   
};



// const itemFind = products.find(product  => product.color == 'black');
// search-result
const phoneDisplay = (phoneAll) => {
   // console.log(phoneAll)
   allPhoneShow(phoneAll)
   const only20Value = phoneAll.slice(0, 3);
   // console.log(only20Value);
   // const allPhoneShowValue = phoneAll

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
         allPhoneShowButton('block');
         

   }
};
//END fast search button 

const phoneDetails = (brand) => {

   const url = `https://openapi.programming-hero.com/api/phone/${brand}`;
   fetch(url)
      .then(Response => Response.json())
      .then(data => singlePhoneDetails(data.data))
   
};

const singlePhoneDetails = (singlePhone) => {
   console.log(singlePhone);
   console.log(singlePhone.others);
  
   
   const main2 = document.getElementById('single-phone');
   main2.textContent = '';
   
   const div = document.createElement('div');
   div.classList.add('row');

   
   div.innerHTML = `
   
   <div class="col-lg-4">
   <div class="card p-2 roundcard shadowsingle w-100 h-100">
      <img src='${singlePhone.image}'
         class="card-img-top mx-auto w-100 h-75" alt="sorry not a image">
      <div class="card-body">
         <h5 class="card-title text-center">Name: ${singlePhone.name}</h5>
         <p class="card-text text-center">ReleaseDate: ${singlePhone.releaseDate ?
            singlePhone.releaseDate:`NO Release Date Found`}</p>
      </div>
   </div>
</div>

<div class="col-lg-8">
   <!-- all detail phone  -->
   <div class="card p-2 roundcard shadowsingle w-100 h-100">
   <div class="table-responsive">
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
            <tr>
               <th scope="row">Sensors</th>
               <td>${singlePhone.mainFeatures.sensors}</td>
            </tr>
            <tr>
               <th scope="row">Others</th>

               <td style="word-spacing: 5px;">${singlePhone?.others?.WLAN ?
                  singlePhone.others.WLAN: 'NO VALUE FOUND'}, ${singlePhone?.others?.Bluetooth ?
                  singlePhone.others.Bluetooth: 'NO VALUE FOUND'}, ${singlePhone?.others?.GPS ?
                  singlePhone.others.GPS: 'NO VALUE FOUND'}, ${singlePhone?.others?.NFC ?
                  singlePhone.others.NFC: 'NO VALUE FOUND'}, ${singlePhone?.others?.Radio ?
                  singlePhone.others.Radio: 'NO VALUE FOUND'}, ${singlePhone?.others?.USB ?
                  singlePhone.others.USB: 'NO VALUE FOUND'}</td>




            </tr>



         </tbody>
      </table>
   </div>
   </div>
</div>
   `;

   main2.appendChild(div);
   
   



};




