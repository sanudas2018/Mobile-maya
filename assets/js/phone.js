//START error handel Function
document.getElementById('error').style.display='none';
const error = (action,message) => {
   const errorDiv = document.getElementById('error')
   const error = document.getElementById('message');
   errorDiv.style.display = action;
   error.innerText = message;
}
//END error handel Function

// START SPINNER handel Function
document.getElementById('spinner').style.display='none';
const spinner = (action) => {
   const errorDiv = document.getElementById('spinner')
   errorDiv.style.display = action;
}
// END SPINNER handel Function

//ALL MAIN search button and single phone button received 
const main = document.getElementById('search-result');
const main2 = document.getElementById('single-phone');
const showAllDiv = document.getElementById('show-all-div');
const spinnerMain = document.getElementById('spinner');
document.getElementById('all-phone').style.display='none';


//START show all phone 
document.getElementById('show-all-div').style.display='none';
const allPhoneShowButton = (action) => {
   const morePhone = document.getElementById('show-all-div');
   morePhone.style.display= action;
  
};

//START search button Action
const searchButton = () => {
   const input = document.getElementById('search-field');
   const inputValue = input.value;
   const inputValueLower = inputValue .toLowerCase();

   if(inputValueLower === ''){
      
      error('block','Please do not leave the field blank');
      main.textContent ='';
      main2.textContent= '';
      showAllDiv.textContent = '';
      spinnerMain.textContent = '';
   }else if(!isNaN(inputValueLower)){
      error('block','Please Give A String value');
      main.textContent ='';
      spinnerMain.textContent = '';
   }else if(inputValueLower <= 0){
      error('block','Please Only use String value');
      main.textContent ='';
      spinnerMain.textContent = '';
   }else{
      main.textContent ='';
      const url = `https://openapi.programming-hero.com/api/phones?search=${inputValueLower}`;

         fetch(url)
         .then(Response => Response.json())
         .then(data => phoneDisplay(data.data))
         error('none','');

   }

   input.value= '';
   spinner('block');
};

// Fast 20 search-result display
const phoneDisplay = (phoneAll) => {
   
   // get 20 up value 
   // allPhoneShow(phoneAll);

   // slice 20 vlaue 
   const only20Value = phoneAll.slice(0, 20);
   // console.log(only20Value);

   if(only20Value.length == 0){
      error('block','Sorry, NO PHONE FOUND');
      showAllDiv.textContent = '';
      spinnerMain.textContent ='';
      main2.textContent = '';
   }else{
      
      main2.textContent ='';
      document.getElementById('all-phone').style.display='block';
      const main = document.getElementById('search-result');
      
      for(const phone of only20Value){
            // console.log(phone);
            const div = document.createElement('div')
            div.classList.add('col');
            div.innerHTML =`
               
            <div class="card round-card body-card shadow">
               <img style="height:300px" src='${phone.image}' class="card-img-top w-50 mx-auto pt-3" alt="sorry not a image">
               <div class="row col-lg-12">
               <div class="card-body ms-4">
                  <h5 class="card-title text-center mb-0">${phone.phone_name}</h5>
                  <p  class="card-text text-center mb-1">${phone.brand}</p>

                  <div class="text-center">
                     <button onclick="phoneDetails('${phone.slug}')" class="btn button-style w-50 text-center" >Detail</button>                 
                  </div>

               </div>
               </div>
            </div>
   
            `;
            main.appendChild(div);
            allPhoneShowButton('block');
            spinner('none');

      }
   }
   
};
//END Fast 20 search-result display 

// START 20 UP PHONE SHOW search-result display 
/* const allPhoneShow = (phoneAllShow) => {
   
   console.log(phoneAllShow)
   
   if(phoneAllShow?.length == 0){
      console.log('valu pachi na')
   }else{
      // console.log(phoneAllShow)
      const button = document.getElementById('show-all');
      button.addEventListener('click', () => {
         const main = document.getElementById('search-result');
         main.textContent = '';
         main2.textContent ='';
         console.log(phoneAllShow);
         for(const phoneAll of phoneAllShow){
               // console.log(phone);
               const div = document.createElement('div')
               div.classList.add('col');
               div.innerHTML =`
                  
               <div class="card round-card body-card shadow">
                  <img style="height:300px" src='${phoneAll.image}' class="card-img-top w-50 mx-auto pt-3" alt="sorry not a image">
                  <div class="row col-lg-12">
                  <div class="card-body ms-4">
                     <h5 class="card-title text-center">${phoneAll.phone_name}</h5>
                     <p class="card-text text-center">${phoneAll.brand}</p>
                     <div class="text-center">
      
                        <button onclick="phoneDetails('${phoneAll.slug}')" class="btn button-style w-50 text-center" >Detail</button>
                        
      
                     </div>
                  </div>
                  </div>
               </div>
      
               
                  
               `;
               main.appendChild(div);
               allPhoneShowButton('none');
               
               
      
         }
      })
   }
      

   
}; */
// END ALL PHONE SHOW search-result display 


//START ONLY SINGLE PHONE DETAILS
const phoneDetails = (brand) => {

   const url = `https://openapi.programming-hero.com/api/phone/${brand}`;
   fetch(url)
      .then(Response => Response.json())
      .then(data => singlePhoneDetails(data.data))
      
   
};

const singlePhoneDetails = (singlePhone) => {
   
   const main2 = document.getElementById('single-phone');
   main2.textContent = '';
   
   const div = document.createElement('div');
   div.classList.add('row');
   
   div.innerHTML = `
 
   <div class="col-lg-4">
   
      <div class="card p-2 round-card shadow-single w-100 h-100">
         <img src='${singlePhone.image}'
            class="card-img-top mx-auto w-100 h-100" alt="sorry not a image">
         <div class="card-body">
            <h5 class="card-title text-center mt-2">Name: ${singlePhone.name}</h5>
            <p class="card-text text-center p-1"><strong>ReleaseDate: </strong>${singlePhone.releaseDate ?
               singlePhone.releaseDate:`NO Release Date Found`}</p>
         </div>
      </div>
   </div>

   <div class="col-lg-8">
      <!-- all detail phone  -->
      <div class="card p-2 round-card shadow-single w-100 h-100">
      <div class="table-responsive">
         <table class="table table-dark table-hover">
            <thead>
               <tr>
                  <th scope="col">Specification</th>
                  <th scope="col">Detail</th>

               </tr>
            </thead>
            <tbody class="font-size">
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
                  <td colspan="2">
                     <table class="table table-dark table-hover">
                        <tr>
                           <th scope="row">WLAN</th>
                           <td>${singlePhone?.others?.WLAN ?
                              singlePhone.others.WLAN: 'NO VALUE FOUND'}</td>
                        </tr>
                        <tr>
                           <th scope="row">Bluetooth</th>
                           <td>${singlePhone?.others?.Bluetooth ?
                              singlePhone.others.Bluetooth: 'NO VALUE FOUND'}</td>
                        </tr>
                        <tr>
                           <th scope="row">GPS</th>
                           <td>${singlePhone?.others?.GPS ?
                              singlePhone.others.GPS: 'NO VALUE FOUND'}</td>
                        </tr>
                        <tr>
                           <th scope="row">NFC</th>
                           <td>${singlePhone?.others?.NFC ?
                              singlePhone.others.NFC: 'NO VALUE FOUND'}</td>
                        </tr>
                        <tr>
                           <th scope="row">Radio</th>
                           <td>${singlePhone?.others?.Radio ?
                              singlePhone.others.Radio: 'NO VALUE FOUND'}</td>
                        </tr>
                        <tr>
                           <th scope="row">USB</th>
                           <td>${singlePhone?.others?.USB ?
                              singlePhone.others.USB: 'NO VALUE FOUND'}</td>
                        </tr>
                     </table>
                  
                  </td>


               </tr>



            </tbody>
         </table>
         </div>
      </div>
   </div>
  
 
      `;

   main2.appendChild(div);
   spinner('none');
   

};

//START ONLY SINGLE PHONE DETAILS


