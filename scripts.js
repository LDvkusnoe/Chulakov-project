let inputs = document.getElementsByTagName('input');
addEventListnersToInputs(inputs);

function onKeyUp(e) {
    let validateParams = null;
    switch (e.target.id) {
        case 'numberplace1':
        {
            validateParams = {
                RegExpString: "[0-9]",
                UppedKeyCode: e.keyCode,        
            }
            break;
        }
        case 'numberplace2':
        {
            validateParams = {
                RegExpString: "[0-9]",
                UppedKeyCode: e.keyCode,
            }
            break;
        }
        case 'numberplace3':
        {
            validateParams = {
                RegExpString: "[0-9]",
                UppedKeyCode: e.keyCode,
            }
            break;
        }
        case 'numberplace4':
        {
            validateParams = {
                RegExpString: "[0-9]",
                UppedKeyCode: e.keyCode,
            }
            break;
        }

        case 'cardname':
        {
            validateParams = {
                RegExpString: "[a-zA-Z\\s]",
                IsUpperCase: true
            }
            break;
        }


        case 'cvv':
        {
            validateParams = {
                RegExpString: "[0-9]", 
            }
            break;
        }
    }

    e.target.value = validateParams ? inputValidate(e.target.value, validateParams) : '';
}

function inputValidate(value, validateParams) {
    var regexp = new RegExp(validateParams.RegExpString, 'g')
    let validInput = '';
    let backspaceKeyCode = 8;
    let validCharsArray = value.match(regexp);

    if (validCharsArray) {
        validCharsArray.forEach(function (char, index) {
            let currentCharNumber = index + 1;
            if (currentCharNumber > validateParams.MaxSymbolsCount) {
                return;
            }
            validInput += char;
        });
    }

    return validateParams.IsUpperCase ? validInput.toUpperCase() : validInput;
}

function addEventListnersToInputs(inputs) {
    let inputsArray = Array.from(inputs);
    inputsArray.forEach(function (input) {
        input.addEventListener('keyup', {
            handleEvent: onKeyUp
        })
    });
}

function on_input (e) {
    let next = e.target.nextElementSibling,
        prev = e.target.previousElementSibling
    if (e.target.value.length >= 4 && next && next.classList.contains('card-number__data'))
      next.focus ()
    if (e.target.value.length <= 0 && prev && prev.classList.contains('card-number__data'))
      prev.focus ()
  }
  document.querySelector('.card-number').addEventListener('input', on_input)



  function sendData() {
    let errors = '';
    if (document.getElementById('numberplace1').value.length < 4) {
        
        errors += 'Заполните поле номер карты 1\n';
    }

    if (document.getElementById('numberplace2').value.length < 4) {
        
        errors += 'Заполните поле номер карты 2\n';
    }

    if (document.getElementById('numberplace3').value.length < 4) {
        
        errors += 'Заполните поле номер карты 3\n';
    }

    if (document.getElementById('numberplace4').value.length < 4) {
        
        errors += 'Заполните поле номер карты 4\n';
    }

    if (document.getElementById('cvv').value.length < 3) {
        errors += 'Заполните поле cvv \n';
        
    }

    if (document.getElementById('cardname').value.length < 4) {
        
        errors += 'Введите корректное имя \n';
        
    }

    if (errors) {
        alert('Ошибка \n' + errors);
        return;
    }
  }



 

