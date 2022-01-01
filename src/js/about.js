import '../scss/style.scss'

import('jquery').then(({ default: $ }) => {
  $('.about-target').html('Hello, JQuery from about page!')

  console.log(`About Loaded`)
})
