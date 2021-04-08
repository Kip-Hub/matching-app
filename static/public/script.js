//Selecting the needed elements from the DOM
const searchForm = document.querySelector('.main form');
const errorMessage = document.querySelector('.main form p');
const gameInput = document.querySelector('.main form select:first-of-type');
const platformInput = document.querySelector('.main form select:nth-of-type(2)');
const playerInput = document.querySelector('.main form select:last-of-type');

//Adding an event listener that listens to the submit of the search form on the homepage
searchForm.addEventListener('submit', (event) => {

    //Array that will contain the errors
    let errors = [];
    if (gameInput.value === '') {

        //if no item is selected the error message will be pushed into the array
        errors.push('no game selected');
    }

    if (platformInput.value === '') {
        errors.push('no platform selected');
    }

    if (playerInput.value === '') {
        errors.push('no playstyle selected');
    }

    //When there is error messages within the array, the submit of the form will be prevented
    if (errors.length > 0) {
        event.preventDefault();

        //Errors within the array are added together and displayed in the error element
        errorMessage.textContent = errors.join(', '); 
    }
});
