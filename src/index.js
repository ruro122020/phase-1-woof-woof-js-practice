document.addEventListener('DOMContentLoaded', init)
//global variables
let dogsArray = []

//helper functions
function loopThroughDogs(){
    dogsArray.forEach(dog => renderDog(dog))
}
//render to DOM
function renderDog({id, name, isGoodDog, image}){
    //get parent element
    const dogBarContainer = document.getElementById('dog-bar')
    //create element
    const dogName = document.createElement('span')
    //add text
    dogName.textContent = name
    //append to DOM
    dogBarContainer.appendChild(dogName)
}
//fetch requests
function getDogs(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => {
        dogsArray = dogs
        loopThroughDogs()
    })
}

function init(){
    getDogs()
}