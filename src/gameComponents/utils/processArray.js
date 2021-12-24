import checkRowsAndColumns from "./checkRowsAndColumns";
import removeBalls from "../removeBalls";

const processArray = (table) => {
  let toCheck = checkRowsAndColumns(table); // проверяем таблицу, ищем по три и более шаров подряд и помечаем их (ball.TheVal = 0)
  if (toCheck) {
    removeBalls(table); // удаляем отмеченные шары, которые после удаления сразу запустят функцию fillUpVacancies
  }
};

export default processArray;
