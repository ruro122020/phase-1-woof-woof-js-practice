document.addEventListener('DOMContentLoaded', init)
//global variables
let dogsArray = []

//helper functions
function loopThroughDogName() {
    dogsArray.forEach(dog => renderDogName(dog))
}
function clearDOM() {
    const dogBarContainer = document.getElementById('dog-info')
    const img = dogBarContainer.querySelector('img')
    const dogName = dogBarContainer.querySelector('h2')
    const btn = dogBarContainer.querySelector('button')
    if (!dogBarContainer.children.length) {
        return
    } else {
        img.remove()
        dogName.remove()
        btn.remove()
    }
}
function spanAddEventListener() {
    const dogBarContainer = document.getElementById('dog-bar')
    const dogSpanList = dogBarContainer.querySelectorAll('span')
    //add an event listener for on each dog's name
    dogSpanList.forEach(spanElement => {
        spanElement.addEventListener('click', () => {
            //find the dogObj in the dogsArray variable
            const dogObj = dogsArray.find(dog => dog.name === spanElement.textContent)
            clearDOM()
            renderDogInfo(dogObj)
        })
    })
}
//render to DOM
function renderDogName({ name }) {
    //get parent element
    const dogBarContainer = document.getElementById('dog-bar')
    //create element
    const dogName = document.createElement('span')
    //add text
    dogName.textContent = name
    //append to DOM
    dogBarContainer.appendChild(dogName)
}
function renderDogInfo({ name, isGoodDog, image }) {
    /*
        <img src="dog_image_url" />
        <h2>Mr. Bonkers</h2>
        <button>Good Dog!</button>
    */
    //grab parent element
    const dogInfoContainer = document.querySelector('#dog-info')
    //create elements 
    const dogImg = document.createElement('img')
    const dogName = document.createElement('h2')
    const btn = document.createElement('button')
    //add attribute
    dogImg.src = image
    //add text to created elements
    dogName.textContent = name
    btn.textContent = isGoodDog ? 'Good Dog!' : "Bad Dog!"
    //append to parent element to display in DOM
    dogInfoContainer.appendChild(dogImg)
    dogInfoContainer.appendChild(dogName)
    dogInfoContainer.appendChild(btn)
}
//fetch requests
function getDogs() {
    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(dogs => {
            dogsArray = dogs
            loopThroughDogName()
            spanAddEventListener()
        })
}

function init() {
    getDogs()
}