let invoiceCard = document.querySelectorAll(".invoice");
const invoiceOuterContainer = document.querySelector(".invoices");
const invoiceContainer = document.querySelector(".invoice-Container");
const invoiceBody = document.querySelector(".invoice-body");
const descriptionContainer = document.querySelector(".Invoice-description");
const formContainer = document.querySelector(".form-container");
const formScroll = document.querySelector(".form");
const itemName = document.getElementsByClassName("item-list-name");
const itemQty = document.getElementsByClassName("item-list-qty");
const itemPrice = document.getElementsByClassName("item-list-price");
const itemTotal = document.getElementsByClassName("item-list-total");
let counter = 0;
const lightAndDarkToggle = document.querySelector(".LightAndDarkSwitch");
const url = "starter-code/data.json";
let res;
let globalId;
let listItems = (name,quantity,price,total) =>{
    return{name,quantity,price,total};
};

// test doms
const testArr = [];
let currobj;

function reqData(){
    fetch(url)
       .then(res=>res.json())
       .then(data=>{
           res = data;
        localStorage.setItem("data", JSON.stringify(res))

        // calling renderJobs function to render each job using
          data.forEach(current => {
            renderInvoice(current);
        });
        
       })
       .catch((error)=>{
          console.error(error);
       })};

       let data = JSON.parse(localStorage.getItem("data"));

       const invoiceDomElements = {
        invoiceCounter : document.querySelector(".counter"),
        filterStatus : document.querySelector("#status"),
        newInvoiceBtn : document.querySelector(".newInvoice"),
        containerForInvoices : document.querySelector(".invoices"),
        invoiceCard : invoiceCard
    }

    invoiceDomElements.invoiceCounter.innerHTML = counter;

    function switchTheme(event){
        if(event.target.checked){
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.style.transition = "all 2s"
            localStorage.setItem('theme', 'dark');
            console.log("checked")
        } else{
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.style.transition = "all 2s"
            localStorage.setItem('theme', 'light');
            console.log("not checked")
        }
    
        
    }

    lightAndDarkToggle.addEventListener('change', switchTheme);

    
 
function idGenerator (){
    let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let numbers = [0,1,2,3,4,5,6,7,8,9];
    let id = "";
    for(let i = 0; i<2; i++){
    let index = [Math.floor((Math.random()*letters.length))];
    id += letters[index];
    }
    for(let i = 0; i<4; i++){
        let index = [Math.floor((Math.random()*numbers.length))];
        id += numbers[index];
        }
        return id;
}


    


const formDomElements = {
    fromAddress : document.querySelector(".form-address"),
    fromCity : document.querySelector(".form-city"),
    fromPostCode : document.querySelector(".form-postCode"),
    fromCountry : document.querySelector(".form-country"),
    clientName : document.querySelector(".client-name"),
    clientEmail : document.querySelector(".client-email"),
    toAddress : document.querySelector(".form-address2"),
    toCity : document.querySelector(".form-city2"),
    toPostCode : document.querySelector(".form-postCode2"),
    toCountry : document.querySelector(".form-country2"),
    dateMade : document.querySelector(".invoice-date-made"),
    dateDue : document.querySelector(".invoice-date-due"),
    projectDescription : document.querySelector(".form-project-description"),
    itemOuterContainer : document.querySelector(".items-container"),
    itemContainer : document.querySelectorAll(".itemCard"),
    // itemName : document.getElementsByClassName(".item-list-name"),
    itemCount : 0,
    // itemQty : document.querySelectorAll(".item-list-qty"),
    // itemPrice : document.querySelectorAll(".item-list-price"),
    // itemTotal : document.querySelectorAll(".item-list-total"),
    deleteIcon : document.querySelector(".delete-item"),
    newItemBtn : document.querySelector(".new-item-btn"),
    discardBtn : document.querySelector(".Discard"),
    draftBtn : document.querySelector(".Draft"),
    saveBtn : document.querySelector(".Save"),
    cancelBtn : document.querySelector(".Cancel"),
    saveChangebtn : document.querySelector(".SaveChanges")
}
// function for adding  new item inputs to the form
function newIteminput(){
    let newItemContainer = document.createElement("div");
    newItemContainer.classList.add("itemCard");
    formDomElements.itemOuterContainer.appendChild(newItemContainer);
    let newItemName = document.createElement("input");
    newItemName.type = "text";
    newItemName.classList.add("item-list-name"); 
    newItemContainer.appendChild(newItemName);
    let newItemQty = document.createElement("input");
    newItemQty.type = "number";
    newItemQty.value = 0;
    newItemQty.classList.add("item-list-qty"); 
    newItemContainer.appendChild(newItemQty);
    let newItemPrice = document.createElement("input");
    newItemPrice.type = "number";
    newItemPrice.value = "0.00";
    newItemPrice.classList.add("item-list-price"); 
    newItemContainer.appendChild(newItemPrice);
    let totalContainer = document.createElement("div");
    totalContainer.classList.add("totalinput");
    newItemContainer.appendChild(totalContainer);
    let pound = document.createElement("p");
    pound.innerHTML = "£";
    pound.classList.add("pound");
    totalContainer.appendChild(pound);
    let newItemTotal = document.createElement("p");
    newItemTotal.classList.add("item-list-total"); 
    newItemTotal.innerHTML = newItemPrice.value;
    totalContainer.appendChild(newItemTotal);
    let newBinImg = document.createElement("img");
    newBinImg.src = "starter-code/assets/icon-delete.svg";
    newBinImg.classList.add("delete-item");
    newItemContainer.appendChild(newBinImg);

    newItemPrice.addEventListener("input", function(){
       let total = newItemPrice.value * newItemQty.value;
        newItemTotal.innerHTML = `${total.toFixed(2)}`;
    })

    newItemQty.addEventListener("input", function(){
        let total = newItemPrice.value * newItemQty.value;
        newItemTotal.innerHTML = `${total.toFixed(2)}`;
    })

    newBinImg.addEventListener("click", function(){
        let data = JSON.parse(localStorage.getItem("data"));
        let currentItemNameIndex = [...document.querySelectorAll(".item-list-name")].indexOf(newItemName);
        if(data[globalId] == undefined){
            newItemContainer.remove();
        }
        else if(data[globalId].items[currentItemNameIndex] != undefined ){
            data[globalId].items[currentItemNameIndex].name =  itemName[currentItemNameIndex].value;
            newBinImg.id = itemName[currentItemNameIndex].value;
        } else{
            newItemContainer.remove();
        }
        // console.log(itemName[currentItemNameIndex].value)
        // console.log(currentItemNameIndex);
        // newBinImg.id = newItemName.value;
        // console.log(newBinImg.id)
        // console.log(newItemName.value);
if(data){
data.forEach(currObj => {
                currObj.items.forEach(currItem => {
                    if (currItem.name == newBinImg.id){
                     let objIndex = currObj.items.indexOf(currItem);
                     currObj.items.splice(objIndex,1);
                      newItemContainer.remove();
                      localStorage.setItem("data", JSON.stringify(data));
                        
                    }
                })
            })
        
} else{
    let data = JSON.parse(localStorage.getItem("data"));
    
            data.forEach(currObj => {
                currObj.items.forEach(currItem => {
                    if (currItem.name == newBinImg.id){
                     let objIndex = currObj.items.indexOf(currItem);
                     currObj.items.splice(objIndex,1);
                      newItemContainer.remove();
                      localStorage.setItem("data", JSON.stringify(data));
                        
                    }
                })
            })
}
newItemContainer.remove();

       
    })
}

// adds  new item inputs to the form
formDomElements.newItemBtn.addEventListener("click", function(){
    newIteminput()
});

// factory func to create invoice objects
const InvoiceObj = (id,createdAt,paymentDue,description,clientName,clientEmail, fromAddress, fromCity, fromPostCode, fromCountry, toAddress, toCity, toPostCode, toCountry, total) => {


    const items = [];

        for(let i = 0; i<itemName.length; i++){
            let currentList = listItems(itemName[i].value,itemQty[i].value,itemPrice[i].value,(itemQty[i].value * itemPrice[i].value));
            items.push(currentList);
        };

    let status = "pending";

    return { id,
        createdAt,
        paymentDue,
        description,
        clientName,
        clientEmail,
        status,
        senderAddress : {
            street : fromAddress,
            city : fromCity,
            postCode : fromPostCode,
            country :fromCountry,
        },
        clientAddress : {
            street : toAddress,
            city : toCity,
            postCode : toPostCode,
            country : toCountry,
        },
        items,
        total,
    };
  };

// function to create the invoices and append them to the page
function renderInvoice (curr){
    let invoiceCard = document.createElement("div");
    invoiceCard.classList.add("invoice");
    invoiceCard.id = curr.id;
    invoiceOuterContainer.appendChild(invoiceCard);
    let invoiceId = document.createElement("p");
    invoiceId.classList.add("invoice-id");
    invoiceId.classList.add("firstLetter");
    invoiceId.innerHTML = curr.id;
    invoiceCard.appendChild(invoiceId);
    let invoiceDueDate = document.createElement("p");
    invoiceDueDate.classList.add("invoice-due");
    invoiceDueDate.innerHTML = curr.paymentDue;
    invoiceCard.appendChild(invoiceDueDate);
    let invoiceName = document.createElement("p");
    invoiceName.classList.add("customer-name");
    invoiceName.innerHTML = curr.clientName;
    invoiceCard.appendChild(invoiceName);
    let invoiceAmount = document.createElement("p");
    invoiceAmount.classList.add("invoice-amount");
    invoiceAmount.innerHTML = `£${curr.total}`;
    invoiceCard.appendChild(invoiceAmount);
    let statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    invoiceCard.appendChild(statusContainer);
    let invoiceStatus = document.createElement("div");
    invoiceStatus.classList.add("invoice-status");
    // backgroundcolor
    statusContainer.appendChild(invoiceStatus);
    let statusDot = document.createElement("div");
    statusDot.classList.add("dot");
    // backgroundcolor
    invoiceStatus.appendChild(statusDot);
    let statusP = document.createElement("p");
    statusP.classList.add("statusInvoice");
    statusP.innerHTML = curr.status;
    if(statusP.innerHTML == "paid"){
        invoiceStatus.style.backgroundColor = "rgba(147, 250, 165,0.15)";
        statusP.style.color = "green";
        statusDot.style.backgroundColor = "green";
    } else if(statusP.innerHTML == "draft"){
        invoiceStatus.style.background = "rgba(40, 67, 135,0.15)";
        statusP.style.color = "blue";
        statusDot.style.backgroundColor = "blue";

    }
    invoiceStatus.appendChild(statusP);
    let seeInvoice = document.createElement("img");
    seeInvoice.src = "starter-code/assets/icon-arrow-right.svg";
    seeInvoice.classList.add("edit");
    statusContainer.appendChild(seeInvoice);
    let btnEdit = document.createElement("button");
    btnEdit.classList.add("editbutton");
    btnEdit.innerHTML = "View";
    invoiceCard.appendChild(btnEdit);

    btnEdit.addEventListener("click", function(){
        invoiceContainer.classList.add("slideout");
        descriptionContainer.classList.add("slidein");
        let cardId = curr.id;

        let data = JSON.parse(localStorage.getItem("data"));
        if(data){
            data.forEach((currobj) => {
                if(currobj.id == invoiceCard.id){
                 globalId = data.indexOf(currobj)
                }
            })
            console.log(cardId);
            updateInvoiceDescription(data[globalId]);
        } else{
            let data = JSON.parse(localStorage.getItem("data"));
            data.forEach((currobj) => {
                if(currobj.id == invoiceCard.id){
                 globalId = data.indexOf(currobj)
                }
            })
            console.log(cardId);
            updateInvoiceDescription(data[globalId]);
        }
        console.log(globalId)
        console.log(data[globalId]);
    })
    // 
    invoiceCard.addEventListener("click", function(){
        invoiceContainer.classList.add("slideout");
        descriptionContainer.classList.add("slidein");
        let cardId = curr.id;

        let data = JSON.parse(localStorage.getItem("data"));
        if(data){
            data.forEach((currobj) => {
                if(currobj.id == invoiceCard.id){
                 globalId = data.indexOf(currobj)
                }
            })
            console.log(cardId);
            updateInvoiceDescription(data[globalId]);
        } else{
            let data = JSON.parse(localStorage.getItem("data"));
            data.forEach((currobj) => {
                if(currobj.id == invoiceCard.id){
                 globalId = data.indexOf(currobj)
                }
            })
            console.log(cardId);
            updateInvoiceDescription(data[globalId]);
        }
        console.log(globalId)
        console.log(data[globalId]);
    })

    invoiceDomElements.filterStatus.addEventListener("click", function(){
        invoiceCard.style.display = "flex";
        let value = invoiceDomElements.filterStatus.options[invoiceDomElements.filterStatus.selectedIndex].value;
        if (value == "Paid" && curr.status != "paid"){
            invoiceCard.style.display = "none";
        } else if(value == "Pending" && curr.status != "pending"){
            invoiceCard.style.display = "none";
        } else if(value == "Draft" && curr.status != "draft"){
            invoiceCard.style.display = "none";
        }else if(value == "All"){
                invoiceCard.style.display = "flex";
            };
            
        }
    )
    
}

// function to update description page

function updateInvoiceDescription(curr){
    invoiceDescriptionDomElements.statusInvoice.innerHTML = curr.status;
    if(invoiceDescriptionDomElements.statusInvoice.innerHTML == "paid"){
        invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(147, 250, 165,0.15)";
        invoiceDescriptionDomElements.statusInvoice.style.color = "green";
        invoiceDescriptionDomElements.dot2.style.backgroundColor = "green";
    } else if(invoiceDescriptionDomElements.statusInvoice.innerHTML == "draft"){
        invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(40, 67, 135,0.15)";
        invoiceDescriptionDomElements.statusInvoice.style.color = "rgba(4, 59, 92)";
        invoiceDescriptionDomElements.dot2.style.backgroundColor = "rgba(4, 59, 92)";
    } 
    invoiceDescriptionDomElements.projID.innerHTML = curr.id;
    invoiceDescriptionDomElements.projName.innerHTML = curr.description;
    invoiceDescriptionDomElements.clientAddress.clientStreet.innerHTML = curr.senderAddress.street;
    invoiceDescriptionDomElements.clientAddress.clientCity.innerHTML = curr.senderAddress.city;
    invoiceDescriptionDomElements.clientAddress.clientPostCode.innerHTML = curr.senderAddress.postCode;
    invoiceDescriptionDomElements.clientAddress.clientCountry.innerHTML = curr.senderAddress.country;
    invoiceDescriptionDomElements.invoiceDateMade.innerHTML = curr.createdAt;
    invoiceDescriptionDomElements.invoiceDue.innerHTML = curr.paymentDue;
    invoiceDescriptionDomElements.customerName.innerHTML = curr.clientName;
    invoiceDescriptionDomElements.customerEmail.innerHTML = curr.clientEmail;
    invoiceDescriptionDomElements.senderAddress.senderStreet.innerHTML = curr.clientAddress.street;
    invoiceDescriptionDomElements.senderAddress.senderCity.innerHTML = curr.clientAddress.city;
    invoiceDescriptionDomElements.senderAddress.senderPostCode.innerHTML = curr.clientAddress.postCode;
    invoiceDescriptionDomElements.senderAddress.senderCountry.innerHTML = curr.clientAddress.country;
    let oldRecipt = document.querySelectorAll(".recipt");

    oldRecipt.forEach(recipt => {
        recipt.remove();
    });
    curr.items.forEach((current) =>{
        let reciptCard = document.createElement("div");
        reciptCard.classList.add("recipt");
        invoiceDescriptionDomElements.reciptContainer.appendChild(reciptCard);
        let reciptName = document.createElement("p");
        reciptName.classList.add("item-name");
        reciptName.innerHTML = current.name;
        reciptCard.appendChild(reciptName);
        let reciptQty = document.createElement("p");
        reciptQty.classList.add("item-quantity");
        reciptQty.innerHTML = current.quantity;
        reciptCard.appendChild(reciptQty);
        let reciptPrice = document.createElement("p");
        reciptPrice.classList.add("item-price");
        reciptPrice.innerHTML = `${current.price}`;
        reciptCard.appendChild(reciptPrice);
        let recipttotal = document.createElement("p");
        recipttotal.classList.add("item-total");
        recipttotal.innerHTML = current.total;
        reciptCard.appendChild(recipttotal);
        invoiceDescriptionDomElements.billTotal.innerHTML = "£";
    })
    let totalCount = 0;
    for (let i = 0; i < curr.items.length; i++){
        totalCount +=  parseFloat(curr.items[i].total);
    }

    invoiceDescriptionDomElements.billTotal.innerHTML += totalCount
    curr.total = totalCount;
    console.log(totalCount)

    if(curr.status == "draft"){
        invoiceDescriptionDomElements.statusInvoice.innerHTML = "draft";
        invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(40, 67, 135,0.15)";
        invoiceDescriptionDomElements.statusInvoice.style.color = "blue";
        invoiceDescriptionDomElements.dot2.style.backgroundColor = "blue";
    } else if(curr.status == "pending"){
        invoiceDescriptionDomElements.statusInvoice.innerHTML = "pending";
            invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(255,143,0,0.15)";
                invoiceDescriptionDomElements.statusInvoice.style.color = "#FF8F00";
                invoiceDescriptionDomElements.dot2.style.backgroundColor = "#FF8F00";
    } else if(curr.status == "paid"){
        invoiceDescriptionDomElements.statusInvoice.innerHTML = "paid";
        invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(147, 250, 165,0.15)";
        invoiceDescriptionDomElements.statusInvoice.style.color = "green";
        invoiceDescriptionDomElements.dot2.style.backgroundColor = "green";
    }


}
// function to clear the form

function clearForm(){
    formDomElements.fromAddress.value = "";
    formDomElements.fromCity.value = "";
    formDomElements.fromPostCode.value = "";
    formDomElements.fromCountry.value = "";
    formDomElements.toAddress.value = "";
    formDomElements.toCity.value = "";
    formDomElements.toPostCode.value = "";
    formDomElements.toCountry.value = "";
    formDomElements.clientName.value = "";
    formDomElements.clientEmail.value = "";
    formDomElements.dateMade.value = "";
    formDomElements.dateDue.value = "";
    formDomElements.projectDescription.value = "";
     for(let i=0; i<itemName.length; i++){
        itemName[i].value = "";
        itemQty[i].value = "";
        itemPrice[i].value = "";
        itemTotal[i].innerHTML = "";
    }
    let removeInputForm = document.querySelectorAll(".itemCard");

        for (let i = 0; i < removeInputForm.length; i++){
            removeInputForm[i].remove()
        }
        let spreadArray = [...document.querySelectorAll(".formValidation")];

        for(let i =0; i<spreadArray.length; i++){
            spreadArray[i].classList.remove("Validation");
        }
}

// function to update invoices 
function updateInvoice (curr){

    curr.senderAddress.street = formDomElements.fromAddress.value;
    curr.senderAddress.city = formDomElements.fromCity.value;
    curr.senderAddress.postCode = formDomElements.fromPostCode.value;
    curr.senderAddress.country = formDomElements.fromCountry.value;
    curr.clientAddress.street = formDomElements.toAddress.value;
    curr.clientAddress.city = formDomElements.toCity.value;
    curr.clientAddress.postCode = formDomElements.toPostCode.value;
    curr.clientAddress.country = formDomElements.toCountry.value;
    curr.clientName = formDomElements.clientName.value;
    curr.clientEmail = formDomElements.clientEmail.value;
    curr.createdAt = formDomElements.dateMade.value;
    curr.paymentDue = formDomElements.dateDue.value;
    curr.description = formDomElements.projectDescription.value;
    let count = itemName.length - curr.items.length + 1;
    console.log(count);
    for (let i = 1; i < count; i++){
        let itemIndex = itemName.length - i;
        let NewList = listItems(itemName[itemIndex].value,itemQty[itemIndex].value,itemPrice[itemIndex].value,itemTotal[itemIndex].innerHTML);
            curr.items.push(NewList);
}

for (let i = 0; i< curr.items.length; i++){
curr.items[i].name = itemName[i].value;
curr.items[i].quantity = itemQty[i].value;
curr.items[i].price = itemPrice[i].value;
curr.items[i].total = itemTotal[i].innerHTML;
}
let bin = document.getElementsByClassName("delete-item");

// for (let i = 0; i<bin.length; i++){
//     bin[i].id = itemName[i].value;
//     console.log(bin[i].id)
// }

localStorage.setItem("data", JSON.stringify(data));
}

// function to pre populate the form once user presses edit.
function populateForm (curr){
    formDomElements.fromAddress.value = curr.senderAddress.street;
    formDomElements.fromCity.value = curr.senderAddress.city;
    formDomElements.fromPostCode.value = curr.senderAddress.postCode;
    formDomElements.fromCountry.value = curr.senderAddress.country;
    formDomElements.toAddress.value = curr.clientAddress.street;
    formDomElements.toCity.value = curr.clientAddress.city;
    formDomElements.toPostCode.value = curr.clientAddress.postCode;
    formDomElements.toCountry.value = curr.clientAddress.country;
    formDomElements.clientName.value = curr.clientName;
    formDomElements.clientEmail.value = curr.clientEmail;
    formDomElements.dateMade.value = curr.createdAt;
    formDomElements.dateDue.value = curr.paymentDue;
    formDomElements.projectDescription.value = curr.description;


    curr.items.forEach(current =>{
        newIteminput()
        console.log("new one")
    })

    for(let i=0; i < curr.items.length; i++){
        itemName[i].value = curr.items[i].name;
        itemQty[i].value = curr.items[i].quantity;
        itemPrice[i].value = curr.items[i].price;
        itemTotal[i].innerHTML = curr.items[i].total;
        console.log(i);
        
    }

 

    let bin = document.getElementsByClassName("delete-item");

// for (let i = 0; i<bin.length; i++){
//     bin[i].id = itemName[i].value;
//     console.log(bin[i].id)
// }
    
    
}

// function for form validation
function formValidation(){
    // let formValid = document.querySelectorAll(".formValidation");
    let spreadArray = [...document.querySelectorAll(".formValidation")];

    for(let i =0; i<spreadArray.length; i++){
        if(spreadArray[i].value.length === 0){
            spreadArray[i].classList.add("Validation");

        } else{
            spreadArray[i].classList.remove("Validation")
        }
    }
    const Valid = (element) => element.classList.contains('Validation');
        if(spreadArray.some(Valid)){
            return false;
        } else{return true;}
}


formDomElements.saveBtn.addEventListener("click", function(){
    if (formValidation() == false){
        // Error
        console.log("form not filled")
    } else{
        console.log("form filled");

        let totalCount = 0;
        for (let i = 0; i < itemTotal.length; i++){
            totalCount +=  parseFloat(itemTotal[i].innerHTML);
        }
    
        invoiceDescriptionDomElements.billTotal.innerHTML += totalCount
        console.log(totalCount)
        currobj = InvoiceObj(idGenerator(), formDomElements.dateMade.value, formDomElements.dateDue.value, formDomElements.projectDescription.value, formDomElements.clientName.value, formDomElements.clientEmail.value,formDomElements.fromAddress.value, formDomElements.fromCity.value, formDomElements.fromPostCode.value, formDomElements.fromCountry.value, formDomElements.toAddress.value, formDomElements.toCity.value, formDomElements.toPostCode.value, formDomElements.toCountry.value, totalCount);
        let data = JSON.parse(localStorage.getItem("data"));
        if(data){
         data.push(currobj);
            localStorage.setItem("data", JSON.stringify(data))
         } else{
        let data = JSON.parse(localStorage.getItem("data"));
         data.push(currobj);
         localStorage.setItem("data", JSON.stringify(data))
        };
        
        clearForm();
        renderInvoice(currobj);
        counter++;
        invoiceDomElements.invoiceCounter.innerHTML = counter;
        formContainer.classList.remove("displayForm");
        let removeInputForm = document.querySelectorAll(".itemCard");

        for (let i = 0; i < removeInputForm.length; i++){
            removeInputForm[i].remove()
        }
    }
})

formDomElements.draftBtn.addEventListener("click", function(){
    let totalCount = 0;
    for (let i = 0; i < itemTotal.length; i++){
        totalCount +=  parseFloat(itemTotal[i].innerHTML);
    }

    invoiceDescriptionDomElements.billTotal.innerHTML += totalCount
    console.log(totalCount)
    currobj = InvoiceObj(idGenerator(), formDomElements.dateMade.value, formDomElements.dateDue.value, formDomElements.projectDescription.value, formDomElements.clientName.value, formDomElements.clientEmail.value,formDomElements.fromAddress.value, formDomElements.fromCity.value, formDomElements.fromPostCode.value, formDomElements.fromCountry.value, formDomElements.toAddress.value, formDomElements.toCity.value, formDomElements.toPostCode.value, formDomElements.toCountry.value, totalCount);
    currobj.status = "draft";
    let data = JSON.parse(localStorage.getItem("data"));
    if(data){
     data.push(currobj);
        localStorage.setItem("data", JSON.stringify(data))
     } else{
    let data = JSON.parse(localStorage.getItem("data"));
     data.push(currobj);
     localStorage.setItem("data", JSON.stringify(data))
    };
    
    clearForm();
    renderInvoice(currobj);
    counter++;
    invoiceDomElements.invoiceCounter.innerHTML = counter;
    formContainer.classList.remove("displayForm");
    let removeInputForm = document.querySelectorAll(".itemCard");

    for (let i = 0; i < removeInputForm.length; i++){
        removeInputForm[i].remove()
    }
})

formDomElements.discardBtn.addEventListener("click", function(){
    clearForm();
    formContainer.classList.remove("displayForm");
    formScroll.scrollTo(0,0);
})


const invoiceDescriptionDomElements = {
statusContainer2 : document.querySelector(".status-container2"),
dot2: document.querySelector(".dot2"),
statusInvoice : document.querySelector(".statusInvoice"),
editBtn : document.querySelectorAll(".button-edit"),
deletBtn : document.querySelectorAll(".button-delete"),
paidBtn : document.querySelectorAll(".button-paid"),
projID : document.querySelector(".proj-id"),
projName : document.querySelector(".proj-name"),
clientAddress: {
    clientStreet : document.querySelector(".client-street"),
    clientCity : document.querySelector(".client-city"),
    clientPostCode : document.querySelector(".client-postcode"),
    clientCountry : document.querySelector(".client-country"),
},
invoiceDateMade : document.querySelector(".invoiceDate"),
invoiceDue : document.querySelector(".invoiceDue"),
customerName : document.querySelector(".customerName"),
senderAddress: {
    senderStreet : document.querySelector(".sender-street"),
    senderCity : document.querySelector(".sender-city"),
    senderPostCode : document.querySelector(".sender-postCode"),
    senderCountry : document.querySelector(".sender-country")
},
customerEmail : document.querySelector(".customer-email"),
reciptContainer : document.querySelector(".project-recipt"),
billTotal : document.querySelector(".bill-total"),
backBtn : document.querySelector(".back-btn")


}

invoiceDescriptionDomElements.paidBtn.forEach(currbtn =>{
currbtn.addEventListener("click", function(){
    let data = JSON.parse(localStorage.getItem("data"));
    if(data && data[globalId].status == "pending"){
      data[globalId].status = "paid";
      invoiceDescriptionDomElements.statusInvoice.innerHTML = "paid";

        invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(147, 250, 165,0.15)";
        invoiceDescriptionDomElements.statusInvoice.style.color = "green";
        invoiceDescriptionDomElements.dot2.style.backgroundColor = "green";
         localStorage.setItem("data", JSON.stringify(data))
        

     } else{
        let data = JSON.parse(localStorage.getItem("data"));
        if(data[globalId].status == "pending"){
            data[globalId].status = "paid";
        invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(147, 250, 165,0.15)";
        invoiceDescriptionDomElements.statusInvoice.style.color = "green";
        invoiceDescriptionDomElements.dot2.style.backgroundColor = "green";
        }
         localStorage.setItem("data", JSON.stringify(data))
     }

})
})

invoiceDescriptionDomElements.deletBtn.forEach(currBtn =>{
currBtn.addEventListener("click", function(){
    console.log("working");
    let data = JSON.parse(localStorage.getItem("data"));
        if(data){
           data.splice(globalId,1)
           console.log(data);
            localStorage.setItem("data", JSON.stringify(data))
            counter--;
            invoiceDomElements.invoiceCounter.innerHTML = counter;
           
    
        } else{
            res.splice(globalId,1)
            console.log(res);
            localStorage.setItem("data", JSON.stringify(res))
            counter--;
            invoiceDomElements.invoiceCounter.innerHTML = counter;
        }
})
})
;

invoiceDescriptionDomElements.backBtn.addEventListener("click", function(){
    invoiceContainer.classList.remove("slideout");
    descriptionContainer.classList.remove("slidein");
    invoiceOuterContainer.innerHTML="";
    let data = JSON.parse(localStorage.getItem("data"));
    if(data){
        data.forEach(current => {
         renderInvoice(current);
         localStorage.setItem("data", JSON.stringify(data))
        });
        console.log("exists");
    } else{
        reqData(); 
        console.log("does not exist");
        localStorage.setItem("data", JSON.stringify(res))
    };
    globalId = "";
    console.log(globalId);
    console.log(data);

    let oldRecipt = document.querySelectorAll(".recipt");

    oldRecipt.forEach(recipt => {
        recipt.remove();
    });
    
    invoiceDescriptionDomElements.billTotal.innerHTML = "£";
})

invoiceDomElements.newInvoiceBtn.addEventListener("click", function(){
    formContainer.classList.add("displayForm");
    formDomElements.discardBtn.classList.remove("buttonDisplayNone");
    formDomElements.draftBtn.classList.remove("buttonDisplayNone");
    formDomElements.saveBtn.classList.remove("buttonDisplayNone");
    formDomElements.cancelBtn.classList.remove("buttonDisplay");
    formDomElements.saveChangebtn.classList.remove("buttonDisplay");
});

// displays form to edit
invoiceDescriptionDomElements.editBtn.forEach(btn =>{
btn.addEventListener("click", function(){
    formContainer.classList.add("displayForm");
    formDomElements.discardBtn.classList.add("buttonDisplayNone");
    formDomElements.draftBtn.classList.add("buttonDisplayNone");
    formDomElements.saveBtn.classList.add("buttonDisplayNone");
    formDomElements.cancelBtn.classList.add("buttonDisplay");
    formDomElements.saveChangebtn.classList.add("buttonDisplay");
    let data = JSON.parse(localStorage.getItem("data"));
    if(data){
        console.log(data[globalId]);
    } else{
        let data = JSON.parse(localStorage.getItem("data"));
        console.log(data[globalId]);
    }
    formDomElements.cancelBtn.addEventListener("click", function(){
        formContainer.classList.remove("displayForm");
        clearForm();
        for(let i=0; i<itemName.length; i++){
            document.querySelectorAll("itemCard")[i].remove();
        };
        descriptionContainer.scrollTo(0,0);
    })
    formDomElements.saveChangebtn.addEventListener("click", function(){
        if (formValidation() == false){
            // Error
            console.log("form not filled")
            let data = JSON.parse(localStorage.getItem("data"));
            if(data){
                updateInvoice(data[globalId]);
                updateInvoiceDescription(data[globalId]);
                data[globalId].status = "draft";
                invoiceDescriptionDomElements.statusInvoice.innerHTML = "draft";
                invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(40, 67, 135,0.15)";
                invoiceDescriptionDomElements.statusInvoice.style.color = "blue";
                invoiceDescriptionDomElements.dot2.style.backgroundColor = "blue";
                console.log(data);
                console.log(data[globalId]);
                localStorage.setItem("data", JSON.stringify(data))
               
        
            } else{
                let data = JSON.parse(localStorage.getItem("data"));
                updateInvoice(data[globalId]);
                updateInvoiceDescription(data[globalId]);
                console.log(data);
                console.log(data[globalId]);
                localStorage.setItem("data", JSON.stringify(data))
            }
            formContainer.classList.remove("displayForm");
            
        } else{
            
            console.log("form filled")
            let data = JSON.parse(localStorage.getItem("data"));
            if(data){
                updateInvoice(data[globalId]);
                updateInvoiceDescription(data[globalId]);
                data[globalId].status = "pending";
                invoiceDescriptionDomElements.statusInvoice.innerHTML = "pending";
                invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(255,143,0,0.15)";
                    invoiceDescriptionDomElements.statusInvoice.style.color = "#FF8F00";
                    invoiceDescriptionDomElements.dot2.style.backgroundColor = "#FF8F00";
                console.log(data);
                console.log(data[globalId]);
                localStorage.setItem("data", JSON.stringify(data))
               
        
            } else{
                let data = JSON.parse(localStorage.getItem("data"));
                updateInvoice(data[globalId]);
                updateInvoiceDescription(data[globalId]);
                console.log(data);
                console.log(data[globalId]);
                localStorage.setItem("data", JSON.stringify(data))
            }
            formContainer.classList.remove("displayForm");
        }

        if(document.querySelectorAll(".recipt").length == 0){
            invoiceDescriptionDomElements.billTotal.innerHTML = "£0";
        }
      
        setTimeout(() => {
            clearForm()
        }, 500);
        descriptionContainer.scrollTo(0,0);
    })


    if(data){
        populateForm(data[globalId])
        console.log(globalId); 
    } else {
        let data = JSON.parse(localStorage.getItem("data"));
        populateForm(data[globalId])
    }
})
});




invoiceCard.forEach((card) =>{
    card.addEventListener("click", function(){
        console.log("working");
        invoiceContainer.classList.add("slideout");
        descriptionContainer.classList.add("slidein");
    })
})

// reqData();



if(data){
    data.forEach(current => {
     renderInvoice(current);
     counter++;
     invoiceDomElements.invoiceCounter.innerHTML = counter;
    });
    console.log("exists");
} else{
    reqData(); 
    console.log("does not exist");
    counter = 7;
    invoiceDomElements.invoiceCounter.innerHTML = counter;
}

// setTimeout(() => {
//     let data = JSON.parse(localStorage.getItem("data"));
//     data.forEach(current => {
//         renderInvoice(current);
//     });
//    },50);


// factor






  
