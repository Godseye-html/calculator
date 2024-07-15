// what we have learned
/*
    const boundFunctions = {};
all_operators.forEach((operator) => {
    let current_operator = operator.classList[1];
    operator.addEventListener("click", () => {
        const equal = document.querySelector(".equal");
        const key = `sum_${current_operator}`;
        // Remove existing event listener if present
        if (boundFunctions[key]) {
        equal.removeEventListener("click", boundFunctions[key]);}
        // Bind the sum function and store the reference
        const boundSumFunction = sum.bind(null, current_operator);
        boundFunctions[key] = boundSumFunction;
        // Add the new event listener
        equal.addEventListener("click", boundSumFunction);
    });
});
function sum(current_operator) {
    console.log(current_operator);
}

*/


const all_numbers = document.querySelectorAll(".number");
const all_operators = document.querySelectorAll(".operator");
const initial_primary_result = document.querySelector(".secondplace");
const final_secondary_result = document.querySelector(".firstplace");
let current_num = 0;
let token_used_by_operation = 0;
all_numbers.forEach((num) => {
    num.addEventListener("click", () => {
        const display_length = initial_primary_result.innerHTML.length;
        if (token_used_by_operation == 0) {
            initial_primary_result.innerHTML = num.innerHTML;
            token_used_by_operation = 1;
        } else if (display_length === 11) {
            initial_primary_result.innerHTML = initial_primary_result.innerHTML;
        } else if (initial_primary_result.innerHTML > 0) {
            initial_primary_result.innerHTML += num.innerHTML;
        }
        current_num = Number(initial_primary_result.innerHTML);
    });
});
const boundFunctions = new Object();
all_operators.forEach((operator) => {
    let current_operator = operator.classList[1];
    operator.addEventListener("click", () => {
        const equal = document.querySelector(".equal");
        const key = `operator_${current_operator}`;
        if (boundFunctions[key]) {
            equal.removeEventListener("click", boundFunctions[key]);
        }
        let previous_number = current_num;
        if (operator.textContent == "") {
            const current_operator = operator.classList[1];
            const boundSumFunction = sum.bind(
                null,
                current_operator,
                current_num
            );
            boundFunctions[key] = boundSumFunction;
            switch (current_operator) {
                case "divide":
                    if ((token_used_by_operation = 1)) {
                        token_used_by_operation = 0;
                    }
                    final_secondary_result.innerHTML = `${current_num}÷`;
                    break;
                case "multiply":
                    if ((token_used_by_operation = 1)) {
                        token_used_by_operation = 0;
                    }
                    final_secondary_result.innerHTML = `${current_num}x`;
                    break;
                case "minus":
                    if ((token_used_by_operation = 1)) {
                        token_used_by_operation = 0;
                    }
                    final_secondary_result.innerHTML = `${current_num}-`;
                    break;
                case "plus":
                    if ((token_used_by_operation = 1)) {
                        token_used_by_operation = 0;
                    }
                    final_secondary_result.innerHTML = `${current_num}+`;
                default:
                    break;
            }
            equal.addEventListener("click", boundSumFunction);
        } else {
            let result;
            let current_operator = operator.classList[1];
            const boundSumFunction = sum.bind(null, current_operator);
            boundFunctions[key] = boundSumFunction;
            switch (current_operator) {
                case "one-divison":
                    if ((token_used_by_operation = 1)) {
                        token_used_by_operation = 0;
                        previous_number = Number(result).toFixed(0);
                        current_num = Number(initial_primary_result.innerHTML);
                    }
                    if (previous_number == 0) {
                        initial_primary_result.innerHTML = `Cannot divide by zero`;
                        initial_primary_result.style.fontSize = "29px";
                    } else {
                        final_secondary_result.innerHTML = `1/(${
                            String(current_num).length > 2
                                ? current_num.toFixed(2)
                                : current_num
                        })`;
                        result = 1 / current_num;
                        initial_primary_result.innerHTML = result;
                        previous_number = result;
                    }
                    break;
                case "square":
                    if ((token_used_by_operation = 1)) {
                        token_used_by_operation = 0;
                        previous_number = Number(result).toFixed(0);
                        current_num = Number(initial_primary_result.innerHTML);
                    }
                    if (initial_primary_result.innerHTML.length > 10) {
                        initial_primary_result.innerHTML = `Overflow`;
                        initial_primary_result.style.fontSize = "30px";
                        setTimeout(() => {
                            initial_primary_result.style.fontSize = "28px";
                            initial_primary_result.innerHTML =
                                current_num * current_num;
                        }, 1000);
                    } else {
                        final_secondary_result.innerHTML = `sqr(${current_num})`;
                        result = current_num * current_num;
                        Number(result).length > 10 ? result.toFixed(9) : result;
                        initial_primary_result.innerHTML = result;
                        previous_number = result;
                    }
                    break;
                case "two-root":
                    if ((token_used_by_operation = 1)) {
                        token_used_by_operation = 0;
                        previous_number = Number(result).toFixed(8);
                        current_num = Number(initial_primary_result.innerHTML);
                    }
                    final_secondary_result.innerHTML = `√(${current_num})`;
                    result = Math.sqrt(current_num);
                    if (result.toString().length > 10) {
                        result = result.toFixed(9);
                        initial_primary_result.innerHTML = result;
                    } else {
                        initial_primary_result.innerHTML = result;
                    }
                    previous_number = result;
                    if (initial_primary_result.innerHTML < 1.0000000001) {
                        initial_primary_result.innerHTML = 1;
                    }
                    break;
                case "percent":
                    final_secondary_result.innerHTML = "";
                    initial_primary_result.innerHTML = "0";
                default:
                    break;
            }
            equal.addEventListener("click", boundSumFunction);
        }
    });
});
function sum(current_operator, current_num) {
    let result;
    const taking_current_num = Number(initial_primary_result.innerHTML);
    switch (current_operator) {
        case "divide":
            final_secondary_result.innerHTML = `${current_num}÷${taking_current_num}=`;
            result = current_num / taking_current_num;
            break;
        case "multiply":
            final_secondary_result.innerHTML = `${current_num}÷${taking_current_num}=`;
            result = current_num * taking_current_num;
            if (result.toString().length > 10) {
                initial_primary_result.style.fontSize = "28px";
            }
            initial_primary_result.innerHTML = result;
            break;
        case "minus":
            final_secondary_result.innerHTML = `${current_num}÷${taking_current_num}=`;
            result = current_num - taking_current_num;
            if (result.toString().length > -10) {
                initial_primary_result.style.fontSize = "28px";
            }
            initial_primary_result.innerHTML = result
            break;
        case "plus":
            final_secondary_result.innerHTML = `${current_num}÷${taking_current_num}=`;
            result = current_num + taking_current_num;
            if (result.toString().length > -10) {
                initial_primary_result.style.fontSize = "28px";
            }
            initial_primary_result.innerHTML = result
        default:
            break;
    }
}
