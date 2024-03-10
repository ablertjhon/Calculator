document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let currentOperator = null;
    let firstOperand = null;
    let secondOperand = null;
    let result = null;

    // Function to update display
    function updateDisplay() {
        display.value = currentInput;
    }

    // Function to handle digit input
    function inputDigit(digit) {
        if (currentInput === '0') {
            currentInput = digit;
        } else {
            currentInput += digit;
        }
        updateDisplay();
    }

    // Function to handle operator input
    function inputOperator(operator) {
        if (currentOperator !== null) {
            evaluate();
            firstOperand = result;
        } else {
            firstOperand = parseFloat(currentInput);
        }
        currentInput = '';
        currentOperator = operator;
    }

    // Function to handle decimal point input
    function inputDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    // Function to handle clear button
    function clear() {
        currentInput = '';
        currentOperator = null;
        firstOperand = null;
        secondOperand = null;
        result = null;
        updateDisplay();
    }

    // Function to handle backspace button
    function backspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    // Function to evaluate expression
    function evaluate() {
        secondOperand = parseFloat(currentInput);
        switch (currentOperator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        currentOperator = null;
    }

    // Event listener for button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.textContent;
            switch (value) {
                case 'C':
                    clear();
                    break;
                case '←':
                    backspace();
                    break;
                case '.':
                    inputDecimal();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    inputOperator(value);
                    break;
                case '=':
                    evaluate();
                    updateDisplay();
                    break;
                default:
                    inputDigit(value);
            }
        });
    });
});
