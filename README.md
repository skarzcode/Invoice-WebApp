Invoice web app solution

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser

### Screenshot

![](starter-code/assets/preview.jpg)
![](starter-code/assets/Screenshot%20(42).png)
![](starter-code/assets/Screenshot%20(47).png)
![](starter-code/assets/Screenshot%20(48).png)

### Links

- Solution URL: [https://amajid.dev/invoiceapp](https://amajid.dev/invoiceapp)
- Live Site URL: [https://skarzcode.github.io/Invoice-WebApp/](https://skarzcode.github.io/Invoice-WebApp/)

## My process

Sketch

At the beginning of the project, first I outlined all the components of the app with a pen and pad to get an understanding of how I would structure and make each section giving me clarity on what tools will be needed to execute the project

Static Version

Once the design was done, I then began creating a static version of the app using HTML5 and CSS alongside dummy data to know how each section should look and function. This gave me the ability to write better pseudo code as I knew what elements would be dynamic and interactive.

Dynamic Version

Finally after creating my Psuedo code and design ideas I began implementing Javascript to use Fetch to render the JSON data as well as creating Factory functions to create dynamic objects utilising Dom Elements that would change state after events
### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned
As this was an invoice project that rendered data from the local JSON File on the first load using fetch, I was worried about how I would store changes and edits to that data. For example, with the initial load, there would be a total of 7 Invoices. However, what if the user deletes 5 of those invoices leaving only 2? If the user was to refresh the App, should all the content be loaded again? This would make the total invoices 7 or reload the page with only 2 invoices as the user deleted the other 5 in his previous session.

I was able to overcome this issue by using fetch on the user's first load to retrieve the data then once I had done that I copied it into a  variable called res and stored it in local storage. Any time I created updated or deleted an invoice I retrieve the array from local storage and updated that data.

I also made sure to check if that array existed in local storage before a user loads the page if it did exist I would run the render function on that data/Array and if it did not exist meaning it probably was the user's first time on the app I would use fetch to retrieve the local Jsos file so I can render the invoices.


Another thing I learned was whenever I edited an invoice on the read page instead of manually updating it on the HomePage where you can see all the invoices I deleted all the content inside the outer invoice container and then ran the render function again on the newly updated array.

Func to check if data exist in local storage and also func to re-render the invoices.
```js

const proudOfThisFunc= () => {
if (data) {
    data.forEach(current => {
        renderInvoice(current);
        counter++;
        invoiceDomElements.invoiceCounter.innerHTML = counter;
    });
} else {
    reqData();
    counter = 7;
    invoiceDomElements.invoiceCounter.innerHTML = counter;
}
}


const proudOfThisFunc2 = () => {
      invoiceContainer.classList.remove("slideout");
    descriptionContainer.classList.remove("slidein");
    invoiceOuterContainer.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("data"));
    if (data) {
        data.forEach(current => {
            renderInvoice(current);
            localStorage.setItem("data", JSON.stringify(data))
        });
    } else {
        data.forEach(current => {
            renderInvoice(current);
            localStorage.setItem("data", JSON.stringify(data))
        });
        localStorage.setItem("data", JSON.stringify(data))
    };
}

```

### Continued development
Things which I will be focusing on in future projects will be using classes as I used factory functions in this project and would like a better overall understanding of OOP. Furthermore, getting a better and deeper understanding of CallBack Functions despite not using them in this project as I know it to be and integral part withing JS Programming


## Author

- Website - [Abdi Majid's Portfolio](https://www.amajid.dev)

