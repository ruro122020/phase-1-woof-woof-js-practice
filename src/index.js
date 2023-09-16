document.addEventListener('DOMContentLoaded', init)
/***global variables***/
let dogsArray = []

/***helper functions***/
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
function toggle(text){
    const btn = document.querySelector('#good-dog-filter')
    if(text === 'Filter good dogs: OFF'){
        btn.textContent = 'Filter good dogs: ON'
    }else{
        btn.textContent = 'Filter good dogs: OFF'
    }
}
/***Events***/

function filterButton(){
    document.querySelector('#good-dog-filter').addEventListener('click', (e)=>{
        let btnText = e.target.textContent
        toggle(btnText)
    })
}
function spanAddEventListener() {
    const dogBarContainer = document.getElementById('dog-bar')
    const dogSpanList = dogBarContainer.querySelectorAll('span')
    //add an event listener on each dog's name span
    dogSpanList.forEach(spanElement => {
        spanElement.addEventListener('click', () => {
            //find the dogObj in the dogsArray variable
            const dogObj = dogsArray.find(dog => dog.name === spanElement.textContent)
            clearDOM()
            renderDogInfo(dogObj)
        })
    })
}
function dogButtonEventListener(btn, dogObj) {
    btn.addEventListener('click', () => {
        if (btn.textContent === 'Good Dog!') {
            let dog = {
                id: dogObj.id,
                status: !dogObj.isGoodDog
            }
            //update button text in the DOM
            btn.textContent = 'Bad Dog!'
            //update isGoodDog status to the server
            updateDogStatus(dog)
        } else {
            let dog = {
                id: dogObj.id,
                status: dogObj.isGoodDog
            }
            //update button text in the DOM
            btn.textContent = 'Good Dog!'
            //update isGoodDog status to the server
            updateDogStatus(dog)
        }
    })
}
/***render to DOM***/
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
function renderDogInfo(dogObj) {
    const { name, isGoodDog, image } = dogObj
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
    //call an event to the dog button
    dogButtonEventListener(btn, dogObj)
}
/***fetch requests***/
function getDogs() {
    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(dogs => {
            dogsArray = dogs
            loopThroughDogName()
            spanAddEventListener()
        })
}

function updateDogStatus({ status, id }) {
    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: status
        })
    })
        .then(res => res.json())
        .then(dog => {

        })
}

function init() {
    getDogs()
    filterButton()
}