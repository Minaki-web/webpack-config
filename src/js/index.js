import '../scss/style.scss'

import $ from 'jquery'

const pizza = {
  base: 'crispy',
  cheese: 100
}

const margerita = {
  ...pizza,
  tomato: 5
}

$('.target').html('Hello, JQuery!')

console.log(pizza)
console.log(margerita)
