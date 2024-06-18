product_price = {'Эланор' :165, 'Нифредил S' :247.5, 'Нифредил M' :330, 'Вилварин XS' :206.25, 'Вилварин S' :288.75,
    'Маллорн XS' :206.25, 'Маллорн S' :288.75, 'Маллорн M' :412.5, 'Маллорн L' :660,
    'Лиссуин XS' :206.5,'Лиссуин S' :288.75, 'Лиссуин M' :412.5, 'Лиссуин L' :660,
    'Йолайре XS' :247.5, 'Йолайре S' :330, 'Йолайре M' :412.5, 'Йолайре L' :825,
    'Белирианд S' :412.5, 'Белирианд M' :618.75, 'Белирианд L' :1237.5,
    'Лаур Малый' :495, 'Лаур Большой' :742.5,
    'Арато Малый' :495, 'Арато Большой' :742.5,
    'Меллисэ Малый' :495, 'Меллисэ Большой' :742.5,
    'Айви' :371.25, 'Серегон' :453.75, 'Альфирин' :495,
    'Линдале' :495, 'Алая Роза' :495}

document.getElementById('ЭланорЦена').innerHTML = product_price['Эланор'] + ' рублей'

document.getElementById('Нифредил SЦена').innerHTML = product_price['Нифредил S'] + ' рублей'
document.getElementById('Нифредил MЦена').innerHTML = product_price['Нифредил M'] + ' рублей'

document.getElementById('Вилварин XSЦена').innerHTML = product_price['Вилварин XS'] + ' рублей'
document.getElementById('Вилварин SЦена').innerHTML = product_price['Вилварин S'] + ' рублей'

document.getElementById('Маллорн XSЦена').innerHTML = product_price['Маллорн XS'] + ' рублей'
document.getElementById('Маллорн SЦена').innerHTML = product_price['Маллорн S'] + ' рублей'
document.getElementById('Маллорн MЦена').innerHTML = product_price['Маллорн M'] + ' рублей'
// document.getElementById('Маллорн LЦена').innerHTML = product_price['Маллорн L'] + ' рублей'

// var labels = []
// function addLibels(line){
//     if(!labels.includes(line))
//         labels.push(line)
// }
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


function Calculating_discount(sum){
    var result = 0
    var percent_10 = 0.10
    var percent_15 = 0.15
    var percent_20 = 0.20
    var percent_25 = 0.25
    var percent_30 = 0.30

    if (sum > 15000 && sum < 25000){
        result = sum - (sum * percent_10)
        result = formatNumber(result)
        document.getElementById('minusPercent').innerHTML = '-10% = ' + result + ' рублей'
    }
    else if(sum > 25000 && sum < 50000){
        result = sum - (sum * percent_15)
        result = formatNumber(result)
        document.getElementById('minusPercent').innerHTML = '-15% = ' + result + ' рублей'
    }
    else if(sum > 50000 && sum < 75000){
        result = sum - (sum * percent_20)
        result = formatNumber(result)
        document.getElementById('minusPercent').innerHTML = '-20% = ' + result + ' рублей'
    }
    else if(sum > 75000 && sum < 100000){
        result = sum - (sum * percent_25)
        result = formatNumber(result)
        document.getElementById('minusPercent').innerHTML = '-25% = ' + result + ' рублей'
    }
    else if(sum > 100000){
        result = sum - (sum * percent_30)
        result = formatNumber(result)
        document.getElementById('minusPercent').innerHTML = '-30% = ' + result + ' рублей'
    }
}


// подсчет стоимости надписей
function calculateAmountForLabels(dict){
    let totalResult = 0;
// Проходимся по каждому ключу в объекте completedOrder
    for (let key in dict) {
        if (dict.hasOwnProperty(key)) {
            let arrayOfArrays = dict[key];
            
            // Проходимся по каждому массиву в arrayOfArrays
            for (let i = 0; i < arrayOfArrays.length; i++) {
                let array = arrayOfArrays[i];
                
                // Проверяем, что длина массива равна 3
                if (array.length === 3) {
                    let secondElement = array[1];
                    let thirdElement = array[2];
                    
                    // Умножаем второй элемент на длину третьего элемента
                    let multipliedValue = secondElement * thirdElement.length;
                    
                    // Добавляем к общему результату
                    totalResult += multipliedValue;
                }
            }
        }
    }
    totalResult = formatNumber(totalResult)
    document.getElementById('labelPrice').innerHTML = 'цена за надписи ' +totalResult + ' рублей'
    console.log(totalResult)
}


let completedOrder = {};
function processCompletedOrder(productInventory) {
    // Обрабатывает завершенные заказы и обновляет объект completedOrder
    for (let item of productInventory) {
        let key = item[0];
        let values = item.slice(1);
        
        if (completedOrder[key]) {
            completedOrder[key] = completedOrder[key].filter(v => v[0] !== values[0]);
            let valueTuple = JSON.stringify(values);
            completedOrder[key] = completedOrder[key].filter(v => JSON.stringify(v) !== valueTuple);
        } else {
            completedOrder[key] = [];
        }
        completedOrder[key].push(values);
    }
    calculateAmountForLabels(completedOrder)
    console.log(completedOrder)
}


function allSum(arry_all_prices){
    
    var result = 0;
    for (var i = 0; i < arry_all_prices.length; i++) {
        // Проверяем, является ли текущий элемент массивом и имеет ли он хотя бы 2 элемента
        if (Array.isArray(arry_all_prices[i]) && arry_all_prices[i].length >= 2) {
            // Если да, то добавляем к результату элемент с индексом 1 вложенного массива
            result += arry_all_prices[i][1];
        }
    }
    Calculating_discount(result)

    document.getElementById('allsum').innerHTML = 'Общая сумма ' + formatNumber(result) + ' рублей'
}



let productInventory = [];
var product = null;
function updateProductInventory(name, material, count) {
    /**
    * Добавляет или обновляет продукт в инвентаре.
    * Удаляет старую запись с тем же названием и материалом, если такая запись существует.
    */
    let product = [name, material, count];
    current_product = product; // сохраняем текущий продукт в глобальной переменной
    for (let i = 0; i < productInventory.length; i++) {
        if (productInventory[i][0] === product[0] && productInventory[i][1] === product[1]) {
            productInventory.splice(i, 1);
            break;
        }
    }
    productInventory.push(product);
    processCompletedOrder(productInventory)
    console.log(productInventory)
}


// Функция создает массив, содержаший массивы [ТОВАР, ОБЩАЯ СУММА]
var all_prices = []
function updateAllPriceAndSum(product_name,sum){
    var found = false;
    for (var i = 0; i < all_prices.length; i++) {
        if (all_prices[i][0] === product_name) {
            
            all_prices[i][1] = sum;
            found = true;
            break;
        }
    }
    
    if (!found) {
        var arr = [product_name, sum];
        all_prices.push(arr);
    }
    
    allSum(all_prices)
}

function sum(array,product_name) {
    var result = 0;
    for (var i = 0; i < array.length; i++) {
        // Проверяем, является ли текущий элемент массивом и имеет ли он хотя бы 2 элемента
        if (Array.isArray(array[i]) && array[i].length >= 2) {
            // Если да, то добавляем к результату элемент с индексом 1 вложенного массива
            result += array[i][1];
        }
    }
    console.log(result)
    var line = 'Сумма'
    var sumID = product_name + line
    
    
    var result_str = 'Итого: '+result+'р.'
   
    if (result > 0){
        document.getElementById(sumID).innerHTML = result_str
    }else{
        document.getElementById(sumID).innerHTML = 0
    }
    updateAllPriceAndSum(product_name,result)
    
}

// Функция создает массив, содержаший массивы [ЦВЕТ, ОБЩАЯ СУММА]
var prices = []
function updatePriceAndSum(name, value, product_name) {
    /**
    * Обновляет количество товара заданного цвета в массиве цен.
    * Если цвет не найден, добавляет новый элемент в массив.
    * Затем вычисляет сумму цен.
    */
    var found = false;
    for (var i = 0; i < prices.length; i++) {
        if (prices[i][0] === name) {
            
            prices[i][1] = value;
            found = true;
            break;
        }
    }
    
    if (!found) {
        var arr = [name, value];
        prices.push(arr);
    }
    
    sum(prices,product_name)
}

// Активация поля ввода надписи
function inputTitleActivation(count_Id){
    let line = count_Id.id
    let regex = /input(.*)/;
    
    // Заменяем найденный паттерн на "inputTitle" + найденная последовательность
    let newString = line.replace(regex, "inputTitle$1");
    let titleID = document.getElementById(newString)
    titleID.disabled = false
    titleID.style.backgroundColor= "#bc987eb9"
    
    titleID.placeholder = "Надпись";
}




function main(color,inputID,formID){
    console.log(formID)
    var color_count = 0
    // Получаем элемент по переданному идентификатору
    var count_Id = document.getElementById(inputID);
    console.log(count_Id.value)
    if(count_Id.value.length <= 0 || count_Id.value.length > 5 || count_Id.value < 0 ){
        color_count = 0
    }else{
        color_count = parseFloat(count_Id.value)
    }
    var result = color_count * product_price[formID]


    
    updateProductInventory(formID,color,color_count)
    updatePriceAndSum(color,result,formID)

    inputTitleActivation(count_Id)
    
}



function inputTitle(event,inputID){
    if (event.key === "Enter") {
        event.preventDefault(); // Предотвращаем стандартное поведение (например, добавление новой строки в textarea)

        
        var title = document.getElementById(inputID)
        var name = title.getAttribute('name')
        console.log(name)

        if (current_product !== null) {
            if(current_product.length < 4){
                current_product.push(title.value);
                processCompletedOrder(productInventory) // добавляем новый элемент в текущий продукт
            }
            else if(current_product.length == 4){
                current_product.pop()
                current_product.push(title.value);
                processCompletedOrder(productInventory)
            }
        }
        // addLibels(title.value)
    }
}



