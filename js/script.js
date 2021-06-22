const toggle = document.querySelector('.toggle input')
const display = document.querySelector('.display')
const keys = document.querySelectorAll('.key')
const delBtn = document.querySelector('.del')
const reset = document.querySelector('.reset')
const equals = document.querySelector('.equals')
let isEvaluated = false
let evalAnswer = 0
const keyValues = []

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Handles theme toggling
const toggleHandler = e => {
    const parent = e.target.closest('.container')
    if(parent.classList.contains('theme-two')) {
        parent.classList.replace('theme-two','theme-one')
    } else {
        parent.classList.replace('theme-one','theme-two')
    }
}

// Pushes the value to an array
const keyValuesHandler = value => {
    
    const operators = ['+','-','*','/']
    if(isEvaluated) {
        console.log(isEvaluated)
        if(!operators.includes(value) && keyValues.length > 0) {
            keyValues.length = 0
            isEvaluated = false
            return;
        } else {
            isEvaluated = false
            console.log(value)
            return;
        }
    } else {
        // isEvaluated = true
    }

    if(value === '=') {
        return;
    }

    if(value === 'x') {
        value = '*'
    }
    if(value === '÷') {
        value = '/'
    }

    keyValues.push(value)

    let firstValue = keyValues[0]

    if(firstValue === '+' ||
    firstValue === '*' ||
    firstValue === '/' ){
        keyValues.splice(0,1)
    }

    

    if(firstValue === '-' && keyValues[1] === '-') {
        keyValues.splice(0,1)
    }

    if(firstValue === '.' && keyValues[1] === '.') {
        keyValues.splice(0,1)
    }

    if(firstValue === '0' && keyValues[1] === '0') {
        keyValues.splice(0,1)
    }

    const lastValue = keyValues[keyValues.length - 2]
    if(lastValue === '-' && value === '-') {
        keyValues.splice(keyValues.length -1, 1)
    }

    const combinedValues = keyValues.join('')
    displayValues(numberWithCommas(combinedValues))
}

// Display to the screen
const displayValues = value => {
    if(!value){
        value = 0
    }
    display.textContent = value
} 

// Toggles theme
toggle.addEventListener('click',toggleHandler)

// Loops through keys
for(let key of keys) {
    key.addEventListener('click',(event) => {
        const keyValue = event.target.textContent //Returns the value of a key
        keyValuesHandler(keyValue)
    })
}

// Delete operation
delBtn.addEventListener('click',() => {
    keyValues.pop()
    displayValues(numberWithCommas(keyValues.join('')))
})

reset.addEventListener('click',() => {
    keyValues.length = 0
    displayValues(0)
})

equals.addEventListener('click',() => {
    const answer = eval(keyValues.join(''))
    displayValues(answer)
    keyValues.length = 0
    isEvaluated = true
    keyValues[0] = answer
    evalAnswer = answer
})