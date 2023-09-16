document.addEventListener('DOMContentLoaded', init)
/***global variables***/
let dogsArray = []

/***helper functions***/
function loopThroughDogName() {
    dogsArray.forEach(dog => renderDogName(dog))
}
function clearDOM(parentContainer) {
    if(parentContainer.children.length){
        Array.from(parentContainer.children).forEach(element => element.remove())
    }
}
function toggle(text) {
    const btn = document.querySelector('#good-dog-filter')
    const nameContainer = document.querySelector('#dog-bar')
    if (text === 'Filter good dogs: OFF') {
       btn.textContent = 'Filter good dogs: ON'
       return btn
    } else {
        btn.textContent = 'Filter good dogs: OFF'
        return btn
    }
}
/***Events***/

function filterButton() {
    document.querySelector('#good-dog-filter').addEventListener('click', (e) => {
        const dogNameContainer = document.querySelector('#dog-bar')
        const spanNameList = dogNameContainer.querySelectorAll('span')
        let btnText = e.target.textContent
        const btnNewText = toggle(btnText)
        if(btnNewText.textContent === 'Filter good dogs: ON'){
            const filterBadDogs = dogsArray.filter(dog => !dog.isGoodDog)
            filterBadDogs.forEach(dog =>{
                spanNameList.forEach(element => {
                    if(element.textContent === dog.name){
                        element.remove()
                    }
                })
                
            })
        }

        if(btnNewText.textContent === 'Filter good dogs: OFF' ){
            //remove the fitlered good dog names in the dog-bar element
            spanNameList.forEach(element => element.remove())
            //add all the dog name 
            dogsArray.forEach(dog => {
                renderDogName(dog)
            })
            
        }
    })
}
function spanAddEventListener() {
    const dogBarContainer = document.getElementById('dog-bar')
    const dogSpanList = dogBarContainer.querySelectorAll('span')
    const dogInfoContainer = document.querySelector('#dog-info')
    //add an event listener on each dog's name span
    dogSpanList.forEach(spanElement => {
        spanElement.addEventListener('click', () => {
            //find the dogObj in the dogsArray variable
            const dogObj = dogsArray.find(dog => dog.name === spanElement.textContent)
            clearDOM(dogInfoContainer)
            renderDogInfo(dogObj)
        })
    })
}
function dogButtonEventListener(btn, dogObj) {
    btn.addEventListener('click', (e) => {
        if (btn.textContent === 'Good Dog!') {
            //update button text in the DOM
            btn.textContent = 'Bad Dog!'
            dogObj.isGoodDog = false
            //update isGoodDog status to the server
            updateDogStatus(dogObj)
        } else {
            //update button text in the DOM
            btn.textContent = 'Good Dog!'
            dogObj.isGoodDog = true
            //update isGoodDog status to the server
            updateDogStatus(dogObj)
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
    spanAddEventListener()
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
        })
}

function updateDogStatus({ isGoodDog, id }) {
    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: isGoodDog
        })
    })
        .then(res => res.json())
        .then(dogObj => {
            console.log('dogObj in server', dogObj)
            //update the dog's status in the dogsArray array
            const newDogsArray = dogsArray.map(dog => {
                if(dog.id === id){
                    return {...dog, isGoodDog: dogObj.isGoodDog}
                }
                return dog
            })
            //dogsArray = newDogsArray
            dogsArray = newDogsArray
        })
}

function init() {
    getDogs()
    filterButton()
}