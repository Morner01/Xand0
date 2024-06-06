const readlineSync = require('readline-sync'); 

let field = {
    pos1: "..", pos2: "..", pos3: "..", 
    pos4: "..", pos5: "..", pos6: "..", 
    pos7: "..", pos8: "..", pos9: "..",
};

// Функция для вывода игрового поля
const printField = () => {
    console.log(`${field.pos1} ${field.pos2} ${field.pos3}`);
    console.log(`${field.pos4} ${field.pos5} ${field.pos6}`);
    console.log(`${field.pos7} ${field.pos8} ${field.pos9}`);
}

// Функция для проверки победы
const checkWin = (player)  => {
    // Проверка по горизонтали
    if ((field.pos1 === player && field.pos2 === player && field.pos3 === player) ||
        (field.pos4 === player && field.pos5 === player && field.pos6 === player) ||
        (field.pos7 === player && field.pos8 === player && field.pos9 === player)) {
        return true;
    }

    // Проверка по вертикали
    if ((field.pos1 === player && field.pos4 === player && field.pos7 === player) ||
        (field.pos2 === player && field.pos5 === player && field.pos8 === player) ||
        (field.pos3 === player && field.pos6 === player && field.pos9 === player)) {
        return true;
    }

    // Проверка по диагонали
    if ((field.pos1 === player && field.pos5 === player && field.pos9 === player) ||
        (field.pos3 === player && field.pos5 === player && field.pos7 === player)) {
        return true;
    }

    return false;
}

// Функция для проверки ничьей
const checkDraw = () => {
    for (const key in field) {
        if (field[key] === "..") {
            return false;
        }
    }
    return true;
}

// Основной цикл игры
printField();
let currentPlayer = "X";

while (true) {
    let position = readlineSync.question(`${currentPlayer}, выберите клетку (pos1-pos9). Клетки идут слева на право, сверху вниз. pos1 - это клетка 1: `);

    // Проверка на корректность ввода
    if (!field[position] || field[position] !== "..") {
        console.log("Некорректный ввод или клетка занята. Попробуйте снова.");
        continue; // Переход к следующему шагу цикла
    }

    // Постановка знака
    field[position] = currentPlayer;
    printField();

    // Проверка на победу
    if (checkWin(currentPlayer)) {
        console.log(`Победил ${currentPlayer}!`);
        break;
    }

    // Проверка на ничью
    if (checkDraw()) {
        console.log("Ничья!");
        break;
    }

    // Смена игрока
    currentPlayer = currentPlayer === "X" ? "O" : "X"; 
}