let index = 0;
function evaluateAdditions(exp){
    let num1 = evaluateDivisors(exp);
    while(true){
        var op = exp[index];
        if(op !=='+' && op !=='-'){
            return num1;
        }
        index++;
        let num2 = evaluateDivisors(exp);
        if(op === '+'){
            num1+=num2;
        }
        else{
            num1-=num2;
        }
    }
}
function evaluateDivisors(exp){
    let num1 = getNumber(exp);
    while(true){
        var op = exp[index];
        if(op !=='÷' && op !=='×'){
            return num1;
        }
        index++;
        let num2 = getNumber(exp);
        if(op === '÷'){
            num1/=num2;
        }
        else{
            num1*=num2;
        }
    }
}

function getNumber(exp){
    /* By using ASCII table values we fetch the integer values of characters from 0 to 9 and decimal(.) */
    let result = "";
    while( (exp.charCodeAt(index)>= 48 && exp.charCodeAt(index) <= 57)  || exp.charCodeAt(index) === 46){
        result+= exp[index];
        index+=1;
        if(index === exp.length){
            break;
        }
    }
    return parseFloat(result);
}
function solveExpression(expression){
    let expr = expression.replace(/\s/g, '');

    return evaluateAdditions(expr,0);
}
function getKeyValue(e){
    let displayValue = document.getElementsByClassName('display')[0];
    if(e.target.className === "key" || e.target.className === "key decimal"){
        if(displayValue.innerHTML === "0"){
            displayValue.innerHTML = e.target.innerHTML;
        }
        else{
            displayValue.innerHTML+=e.target.innerHTML;
        }
    }
    else if(e.target.className === "key add" || e.target.className === "key minus" ||
    e.target.className === "key multiply" || e.target.className === "key divide"){
        if(displayValue.innerHTML === "0"){
            displayValue.innerHTML = e.target.innerHTML;
        }
        else{
            displayValue.innerHTML+=" "+e.target.innerHTML+" ";
        }
    }
    else if(e.target.className === "reset"){
        displayValue.innerHTML = "0";
    }

    // Delete function
    else if(e.target.className === "del"){
        let expr = displayValue.innerHTML ;
        if(expr.length !== 0){
            if(expr.charAt(expr.length-1) === " "){
                expr = expr.slice(0, expr.length-2);
                displayValue.innerHTML = expr;
            }
            else if(expr.length === 1 || expr === "NaN"){
                displayValue.innerHTML = 0;
            }
            else{
                expr = expr.slice(0, expr.length-1);
                displayValue.innerHTML = expr;
            }
        }
    }
    else if(e.target.className === "key equals"){
        try {
            let answer = solveExpression(displayValue.innerHTML);
            window.alert(answer);
            displayValue.innerHTML = answer;
             index = 0;
        } catch (error) {
            window.alert(error);
        }
       
    }
}