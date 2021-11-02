// // проверка строк и столбцов на наличие трех и более одноцветных шаров подряд
export const checkRowsAndColumns = (table) => {
  //console.log("Запуск обработки строк...");
  toCheck = false;
  for (let j = 0; j < 5; j++) {
    let count = 0;
    let color = null;
    let index = 0;
    for (let i = 0; i < 5; i++) {
      if (table[i][j] !== null && table[i][j].name === color) {
        count += 1;
        index = i;
        if (count >= 2 && index === 4) {
          ////console.log("Есть повторяющиеся шары в конце строки");
          toCheck = true;
          for (let m = index - count; m <= index; m++) {
            if (table[m][j] !== null) {
              //console.log(ballsTable[m][j].name + " подлежит удалению. Индекс: " + m + " " + j);
              table[m][j].theValue = 0;
            }
          }
        } else {
          if (count >= 2) {
            ////console.log("Есть повторяющиеся шары в строках");
            toCheck = true;
            for (m = index - count; m <= index; m++) {
              if (table[m][j] !== null) {
                //console.log(ballsTable[m][j].name + " подлежит удалению. Индекс: " + m + " " + j);
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
  ////console.log("Обработка строк завершена!");

  ////console.log("Запуск обработки столбцов...");
  for (i = 0; i < 5; i++) {
    count = 0;
    color = null;
    index = 0;

    for (j = 0; j < 5; j++) {
      if (table[i][j] !== null && table[i][j].name === color) {
        count += 1;
        index = j;
        if (count >= 2 && index === 4) {
          ////console.log("Есть повторяющиеся шары в конце столбца");
          toCheck = true;
          for (m = index - count; m <= index; m++) {
            if (table[i][m] !== null) {
              //console.log(ballsTable[i][m].name + " подлежит удалению. Индекс: " + i + " " + m);
              table[i][m].theValue = 0;
            }
          }
        } else {
          if (count >= 2) {
            ////console.log("Есть повторяющиеся шары в столбцах");
            toCheck = true;
            for (m = index - count; m <= index; m++) {
              if (table[i][m] !== null) {
                //console.log(ballsTable[i][m].name + " подлежит удалению. Индекс: " + i + " " + m);
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
  ////console.log("Обработка столбцов завершена!");
  return table;
};
