// // проверка строк и столбцов на наличие трех и более одноцветных шаров подряд
const checkRowsAndColumns = (table) => {
  //Запуск обработки строк
  let toCheck = false;
  for (let j = 0; j < 5; j++) {
    let count = 0;
    let color = null;
    let index = 0;
    for (let i = 0; i < 5; i++) {
      if (table[i][j] !== null && table[i][j].name === color) {
        count += 1;
        index = i;
        if (count >= 2 && index === 4) {
          //Есть повторяющиеся шары в конце строки
          toCheck = true;
          for (let m = index - count; m <= index; m++) {
            if (table[m][j] !== null) {
              table[m][j].theValue = 0;
            }
          }
        } else {
          if (count >= 2) {
            //Есть повторяющиеся шары в строках
            toCheck = true;
            for (let m = index - count; m <= index; m++) {
              if (table[m][j] !== null) {
                table[m][j].theValue = 0;
              }
            }
          }
        }
      } else {
        if (table[i][j] !== null) {
          color = table[i][j].name;
          count = 0;
        }
      }
    }
  }

  //Запуск обработки столбцов
  for (let i = 0; i < 5; i++) {
    let count = 0;
    let color = null;
    let index = 0;

    for (let j = 0; j < 5; j++) {
      if (table[i][j] !== null && table[i][j].name === color) {
        count += 1;
        index = j;
        if (count >= 2 && index === 4) {
          //Есть повторяющиеся шары в конце столбца
          toCheck = true;
          for (let m = index - count; m <= index; m++) {
            if (table[i][m] !== null) {
              table[i][m].theValue = 0;
            }
          }
        } else {
          if (count >= 2) {
            //Есть повторяющиеся шары в столбцах
            toCheck = true;
            for (let m = index - count; m <= index; m++) {
              if (table[i][m] !== null) {
                table[i][m].theValue = 0;
              }
            }
          }
        }
      } else {
        if (table[i][j] !== null) {
          color = table[i][j].name;
          count = 0;
        }
      }
    }
  }
  return toCheck;
};

export default checkRowsAndColumns;
