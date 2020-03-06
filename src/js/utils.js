export function formatDate(data){
  const _customDate = new Date(data);
  return _customDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) + ', ' + _customDate.toLocaleDateString('ru-RU', {year: 'numeric'});
}

// Функция для выдачи случайного целого числа от 0 (верхний предел max не включается в выдачу)
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
