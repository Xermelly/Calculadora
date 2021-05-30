'use strict';

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=key]')
const operators = document.querySelectorAll('[id*=op]')

let newNumber = true;
let operator;
let previousNumber;

const pendingOperator = () => operator !== undefined;

const calculate = () => {
    if(pendingOperator()){
        const currentNumber = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
        const result = eval(`${previousNumber}${operator}${currentNumber}`);
        reloadDisplay(result);
    }
}

const reloadDisplay = (text) => {
    if(newNumber){
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    } else {
        display.textContent += text.toLocaleString('BR');
    }
}

const insertNumber = (evt) => reloadDisplay(evt.target.textContent)

numbers.forEach(number => 
    number.addEventListener('click', insertNumber)
    );

const insertOperator = (evt) => {
    if(!newNumber){
        calculate()
        newNumber = true;
        operator = evt.target.textContent;
        previousNumber = parseFloat(display.textContent.replace(',','.'));
    }
}

operators.forEach(operator => 
    operator.addEventListener('click', insertOperator)
    );

const activateEqual = () => {
    calculate();
    operator = undefined;
}    

document.getElementById('equal').addEventListener('click', activateEqual);

const cleanDisplay = () => display.textContent = '';
document.getElementById('cleanDisplay').addEventListener('click', cleanDisplay);

const cleanCalc = () => {
    cleanDisplay();
    operator = undefined;
    newNumber = true;
    previousNumber = undefined;
}

document.getElementById('cleanCalc').addEventListener('click', cleanCalc);

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const reverseSignal = () => {
    newNumber = true;
    reloadDisplay(display.textContent * -1);
}
document.getElementById('opReverse').addEventListener('click', reverseSignal);

const existDecimal = () => display.textContent.indexOf(',') !== -1;
const existValor = () => display.textContent.length > 0;

const insertDecimal = () => {
    if(!existDecimal()){
        if(existValor()){
            reloadDisplay(',');
        } else {
            reloadDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal);

const keyboardMap = {
    '0' : 'key0',
    '1' : 'key1',
    '2' : 'key2',
    '3' : 'key3',
    '4' : 'key4',
    '5' : 'key5',
    '6' : 'key6',
    '7' : 'key7',
    '8' : 'key8',
    '9' : 'key9',
    '/' : 'opDivision',
    '*' : 'opMultiplication',
    '-' : 'opSubtraction',
    '+' : 'opSum',
    '=' : 'equal',
    'Enter' : 'equal',
    'Backspace' : 'backspace',
    'c' : 'cleanDisplay',
    'Escape' : 'cleanCalc',
    ',' : 'decimal'

}
const mapKeyboard = (evt) =>{
    const key = evt.key;
    const permitedKey = () => Object.keys(keyboardMap).indexOf(key) !== -1;

    if(permitedKey()){
        document.getElementById(keyboardMap[key]).click();
    }
}
document.addEventListener('keydown', mapKeyboard)