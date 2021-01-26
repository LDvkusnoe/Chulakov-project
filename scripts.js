let elms = [...document.querySelectorAll('.card-number__data')].concat(document.querySelector('.cardback__cvv'), document.querySelector('.card-name__holder')),

require_lengths = [4, 4, 4, 4, 3, 4],

error_style = {
  add : elm => elm.classList.add('error'),
  del : elm => elm.classList.remove('error')
},
val = {
  empty : (e) => {
    e.preventDefault ()
    elms.forEach(elm => !elm.value ? error_style.add(elm) : ``)
  },
  wrong_length : (e) => {
    e.preventDefault ()
    elms.forEach((elm, i) => elm.value.replace(/ /g, ``).length < require_lengths[i] ? error_style.add(elm) : ``)
  }
}


function toggle_input (e) {
  let next = e.target.nextElementSibling,
      prev = e.target.previousElementSibling
  if (e.target.value.length >= 4 && next && next.classList.contains('card-number__data')) next.focus ()
  if (e.target.value.length <= 0 && prev && prev.classList.contains('card-number__data')) prev.focus ()
}
function only_numbers (e, count) {
  if (e.target.classList.contains('card-number__data') || e.target.classList.contains('cardback__cvv'))
    e.target.value = e.target.value.replace(/\D/g,'').substr(0, count)
}
function only_latin_and_upper_case () {
  if (this.classList.contains('card-name__holder')) {
    this.value = this.value.toUpperCase ()
    this.value = this.value.replace(/^ +|[^A-Z ]/g, '').replace(/ +(\w*).*/, ' $1')
  }
}
function on_submit_form (e) {
  elms.forEach(elm => error_style.del(elm))
  elms.some((elm, i) => !elm.value || elm.value.replace(/ /g, ``).length < require_lengths[i]) && (val.empty(e), val.wrong_length(e))
}
function on_blur () {
  if (!this.value || this.value.replace(/ /g, ``).length < require_lengths[elms.indexOf(this)]) error_style.add(this)
  else error_style.del(this)
}


elms.forEach(elm => elm.addEventListener('blur', on_blur))
document.querySelector('.card-number').addEventListener('input', e => (only_numbers (e, 4), toggle_input (e)) )
document.querySelector('.cardback__cvv').addEventListener('input', e => only_numbers (e, 3) )
document.querySelector('.card-name__holder').addEventListener('input', only_latin_and_upper_case )
document.querySelector('.elements').addEventListener('submit', on_submit_form)