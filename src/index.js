document.addEventListener('DOMContentLoaded', init)
//global variables
let dogsArray;
//fetch requests
function getDogs(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => dogsArray = dogs)
}

function init(){
    getDogs()
}