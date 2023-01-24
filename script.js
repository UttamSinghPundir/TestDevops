//these are the constent variables
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')


//These are the Functions I use here for lower,upper, number, symbol
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
//This EventListener waits for a event to occurs When "Click" this perticular function will occurs 'click',() =>
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea') //parent
    const password = resultEl.innerText

    if(!password) { return } //if no passsword do nothing
//else we follow 
    textarea.value = password
    document.body.appendChild(textarea) //rep parent node
    textarea.select()
    document.execCommand('copy') //it runs the command
    textarea.remove()
    alert('Password copied to clipboard!')
})
//This EventListener waits for a event to occurs When "Click" this perticular function will occurs 'click',() =>
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value //without + lenghth show as character
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length) //here genrate password is function i created to get all these in innerText
})
//here i am creating functions
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '' //i set it empty by default
    const typesCount = lower + upper + number + symbol //result containing all these things
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]) //array-like objects that provide a mechanism for reading and writing raw binary data in memory buffers. Array of types i am including also use filter that filters false value
    if(typesCount === 0) { 
        return '' //here i checktypes count is 0 then nothing genrate it will just empty so i have to select at least 1
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}