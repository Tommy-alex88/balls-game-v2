// функция для сопоставления цвета шаров с их номером в спрайтшите
export const getColor = (arr) => {
  switch (arr) {
    case 0:
      return "Red";
    case 1:
      return "Green";
    case 2:
      return "Blue";
    case 3:
      return "Yellow";
    case 4:
      return "Violet";
  }
};
