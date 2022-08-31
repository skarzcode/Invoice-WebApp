const invoiceCard = document.querySelectorAll(".invoice");
const invoiceContainer = document.querySelector(".invoice-Container");
const descriptionContainer = document.querySelector(".Invoice-description");

invoiceCard.forEach((card) =>{
    card.addEventListener("click", function(){
        console.log("working");
        invoiceContainer.classList.add("slideout");
        descriptionContainer.classList.add("slidein");
    })
})