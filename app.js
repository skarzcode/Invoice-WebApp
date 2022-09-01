let invoiceCard = document.querySelectorAll(".invoice");
const invoiceOuterContainer = document.querySelector(".invoices");
const invoiceContainer = document.querySelector(".invoice-Container");
const invoiceBody = document.querySelector(".invoice-body");
const descriptionContainer = document.querySelector(".Invoice-description");
const formContainer = document.querySelector(".form-container");
const itemName = document.getElementsByClassName("item-list-name");
const itemQty = document.getElementsByClassName("item-list-qty");
const itemPrice = document.getElementsByClassName("item-list-price");
const itemTotal = document.getElementsByClassName("item-list-total");
let counter = 0;
const url = "starter-code/data.json";
let res;
let globalId;

// test doms
const testArr = [];
let testobj;

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
    newItemQty.type = "text";
    newItemQty.classList.add("item-list-qty"); 
    newItemContainer.appendChild(newItemQty);
    let newItemPrice = document.createElement("input");
    newItemPrice.type = "text";
    newItemPrice.classList.add("item-list-price"); 
    newItemContainer.appendChild(newItemPrice);
    let newItemTotal = document.createElement("input");
    newItemTotal.type = "text";
    newItemTotal.classList.add("item-list-total"); 
    newItemContainer.appendChild(newItemTotal);
    let newBinImg = document.createElement("img");
    newBinImg.src = "starter-code/assets/icon-delete.svg";
    newBinImg.classList.add("delete-item");
    newItemContainer.appendChild(newBinImg);

    newBinImg.addEventListener("click", function(){
        newItemContainer.remove();
    })
}

// adds  new item inputs to the form
formDomElements.newItemBtn.addEventListener("click", function(){
    newIteminput()
});

// factory func to create invoice objects
const InvoiceObj = (id,CreatedAt,paymentDue,description,clientName,clientEmail, fromAddress, fromCity, fromPostCode, fromCountry, toAddress, toCity, toPostCode, toCountry, total) => {
    let listItems = (name,quantity,price,total) =>{
        return{name,quantity,price,total};
    };

    const items = [];

        for(let i = 0; i<itemName.length; i++){
            let currentList = listItems(itemName[i].value,itemQty[i].value,itemPrice[i].value);
            items.push(currentList);
        };

    let status = "Pending";

    return { id,
        CreatedAt,
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
        statusP.style.color = "rgba(4, 59, 92)";
        statusDot.style.backgroundColor = "rgba(4, 59, 92)";

    }
    invoiceStatus.appendChild(statusP);
    let seeInvoice = document.createElement("img");
    seeInvoice.src = "starter-code/assets/icon-arrow-right.svg";
    seeInvoice.classList.add("edit");
    statusContainer.appendChild(seeInvoice);
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
            res.forEach((currobj) => {
                if(currobj.id == invoiceCard.id){
                 globalId = res.indexOf(currobj)
                }
            })
            console.log(cardId);
            updateInvoiceDescription(res[globalId]);
        }
        console.log(globalId)
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
    invoiceDescriptionDomElements.senderAddress.senderCity.innerHTML = curr.clientAddress.postCode;
    invoiceDescriptionDomElements.senderAddress.senderCountry.innerHTML = curr.clientAddress.country;
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
        reciptPrice.innerHTML = `£ ${current.price}`;
        reciptCard.appendChild(reciptPrice);
        let recipttotal = document.createElement("p");
        recipttotal.classList.add("item-total");
        recipttotal.innerHTML = `£${current.total}`;
        reciptCard.appendChild(recipttotal);
    })


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
        document.getElementsByClassName("itemCard")[i].remove();
        
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
    for(let i=0; i<itemName.length; i++){
        curr.items[i].name = itemName[i].value;
        curr.items[i].quantity = itemQty[i].value;
        curr.items[i].price = itemPrice[i].value;
        curr.items[i].total = itemTotal[i].value;
    }
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
    })
    for(let i=0; i<itemName.length; i++){
        itemName[i].value = curr.items[i].name;
        itemQty[i].value = curr.items[i].quantity;
        itemPrice[i].value = curr.items[i].price;
        itemTotal[i].value = curr.items[i].total;
    }
    
    
}

// function for form validation
function formValidation(){
    if(formDomElements.fromAddress.value == ""){
        formDomElements.fromAddress.style.border = "solid red 3px";
    } 
    if(formDomElements.fromCity.value == ""){
        formDomElements.fromCity.style.border = "solid red 3px";
        let coordianates =  formDomElements.fromCity.getBoundingClientRect();
    }if(formDomElements.fromPostCode.value == ""){
        formDomElements.fromPostCode.style.border = "solid red 3px";
    }if( formDomElements.fromCountry.value == ""){
        formDomElements.fromCountry.style.border = "solid red 3px";
    } if(formDomElements.toAddress.value == "") {
        formDomElements.toAddress.style.border = "solid red 3px";
    } if(formDomElements.toCity.value == ""){
        formDomElements.toCity.style.border = "solid red 3px";
    } if(formDomElements.toPostCode.value == ""){
        formDomElements.toPostCode.style.border = "solid red 3px"
    } if(formDomElements.toCountry.value == ""){
        formDomElements.toCountry.style.border = "solid red 3px";
    } if(formDomElements.clientName.value == ""){
        formDomElements.clientName.style.border = "solid red 3px";
    } if(formDomElements.clientEmail.value == ""){
        formDomElements.clientEmail.style.border = "solid red 3px";
    } if(formDomElements.dateMade.value == ""){
        formDomElements.dateMade.style.border = "solid red 3px";
    } if(formDomElements.dateDue.value == ""){
        formDomElements.dateDue.style.border = "solid red 3px";
    } if(formDomElements.projectDescription.value == ""){
        formDomElements.projectDescription.style.border = "solid red 3px"
    };
        
}


formDomElements.saveBtn.addEventListener("click", function(){
    if(formDomElements.fromAddress.value == ""||
    formDomElements.fromCity.value == ""||
    formDomElements.fromPostCode.value == ""||
    formDomElements.fromCountry.value == ""||
    formDomElements.toAddress.value == ""||
    formDomElements.toCity.value == ""||
    formDomElements.toPostCode.value == ""||
    formDomElements.toCountry.value == ""||
    formDomElements.clientName.value == ""||
    formDomElements.clientEmail.value == ""||
    formDomElements.dateMade.value == ""||
    formDomElements.dateDue.value == ""||
    formDomElements.projectDescription.value == ""){
        formValidation();
        console.log("not working");
    } else{
        testobj = InvoiceObj("TY9145", formDomElements.dateMade.value, formDomElements.dateDue.value, formDomElements.projectDescription.value, formDomElements.clientName.value, formDomElements.clientEmail.value,formDomElements.fromAddress.value, formDomElements.fromCity.value, formDomElements.fromPostCode.value, formDomElements.fromCountry.value, formDomElements.toAddress.value, formDomElements.toCity.value, formDomElements.toPostCode.value, formDomElements.toCountry.value, "20000");
        let data = JSON.parse(localStorage.getItem("data"));
        if(data){
         data.push(testobj);
            localStorage.setItem("data", JSON.stringify(data))
         } else{
         res.push(testobj);
         localStorage.setItem("data", JSON.stringify(res))
        };
        renderInvoice(testobj);
        counter++;
        invoiceDomElements.invoiceCounter.innerHTML = counter;
        formContainer.classList.remove("displayForm");
    }

    // 
   
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
        if(res[globalId].status == "pending"){
            res[globalId].status = "paid";
        invoiceDescriptionDomElements.statusContainer2.style.backgroundColor = "rgba(147, 250, 165,0.15)";
        invoiceDescriptionDomElements.statusInvoice.style.color = "green";
        invoiceDescriptionDomElements.dot2.style.backgroundColor = "green";
        }
         localStorage.setItem("data", JSON.stringify(res))
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
        });
        console.log("exists");
    } else{
        reqData(); 
        console.log("does not exist");
    };
    globalId = "";
    console.log(globalId)

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
    formDomElements.cancelBtn.addEventListener("click", function(){
        formContainer.classList.remove("displayForm");
        clearForm();
        for(let i=0; i<itemName.length; i++){
            document.getElementsByClassName("itemCard")[i].remove();
        };
    })
    formDomElements.saveChangebtn.addEventListener("click", function(){
        let data = JSON.parse(localStorage.getItem("data"));
        if(data){
            updateInvoice(data[globalId]);
            updateInvoiceDescription(data[globalId]);
            console.log(data);
            console.log(data[globalId]);
            localStorage.setItem("data", JSON.stringify(data))
           
    
        } else{
            updateInvoice(res[globalId]);
            updateInvoiceDescription(res[globalId]);
            console.log(res);
            console.log(res[globalId]);
            localStorage.setItem("data", JSON.stringify(res))
        }
    })


    if(data){
        populateForm(data[globalId])
        console.log(globalId); 

    } else{
        populateForm(res[globalId]);
        console.log(globalId); 
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
}

// setTimeout(() => {
//     let data = JSON.parse(localStorage.getItem("data"));
//     data.forEach(current => {
//         renderInvoice(current);
//     });
//    },50);


// factor






  
