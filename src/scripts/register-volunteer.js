import { fetchAddressByCEP } from "./utils/fetchAddressByCEP.js"
import { formatToCEP } from "./utils/formatToCep.js"
import { formatToNumeric } from "./utils/formatToNumeric.js"
import { randomUUID } from "./utils/randomUUID.js"


const session = JSON.parse(window.localStorage.getItem('@ong-vol:session'));

if (!session) {
    window.location.href = "login.html";
}

let isRegisterFormValid = false

let cepValue = ""

const registerForm = document.getElementById('register-form')

const registerCep = document.getElementById('register-cep')
const registerEmail = document.getElementById('register-email')
const registerName = document.getElementById('register-name')
// const registerPassword = document.getElementById('register-password')
// const registerConfirmPassword = document.getElementById('register-confirm-password')

const registerCepError = document.getElementById('register-cep-error')
const registerEmailError = document.getElementById('register-email-error')
const registerNameError = document.getElementById('register-name-error')
// const registerPasswordError = document.getElementById('register-password-error')
// const registerConfirmPasswordError = document.getElementById('register-confirm-password-error')

const registerStreet = document.getElementById('register-street')
const registerNeighborhood = document.getElementById('register-neighborhood')
const registerCity = document.getElementById('register-city')
const registerState = document.getElementById('register-state')
const registerNumber = document.getElementById('register-number')

const registerStreetError = document.getElementById('register-street-error')
const registerNeighborhoodError = document.getElementById('register-neighborhood-error')
const registerCityError = document.getElementById('register-city-error')
const registerStateError = document.getElementById('register-state-error')
const registerNumberError = document.getElementById('register-number-error')


registerCep.addEventListener('keydown', (e) => {
    if (cepValue.length >= 8 && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== ' ') {
        e.preventDefault()
    }

    if (e.key === 'Backspace') {
        cepValue = cepValue.slice(0, cepValue.length - 1)
    }
})

registerCep.addEventListener('input', (e) => {
    e.preventDefault()

    cepValue = cepValue.concat(e.data ? e.data.replace(/\D/g, '') : "")

    e.currentTarget.value = formatToCEP(cepValue);

    if (cepValue.length === 8) {
        fetchAddressByCEP(cepValue)
    }
})

registerCep.addEventListener('click', (e) => {
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = e.currentTarget.value.length;
})

registerCep.addEventListener('select', (e) => {
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = e.currentTarget.value.length;
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (
        registerCep.value === "" ||
        registerEmail.value === "" ||
        registerName.value === "" ||
        // registerPassword.value === "" ||
        // registerConfirmPassword.value === "" ||
        cepValue.length !== 8 ||
        registerStreet.value === "" ||
        registerNeighborhood.value === "" ||
        registerCity.value === "" ||
        registerState.value === "" ||
        registerNumber.value === ""
        // registerPassword.value !== registerConfirmPassword.value
    ) {
        isRegisterFormValid = false
    } else {
        isRegisterFormValid = true
    }

    // if (registerConfirmPassword.value === "") {
    //     registerConfirmPasswordError.textContent = "Confirme sua senha.";
    //     registerConfirmPassword.focus()
    // } else if (registerPassword.value !== registerConfirmPassword.value) {
    //     registerConfirmPasswordError.textContent = "As senha não coincidem!";
    //     registerConfirmPassword.focus()
    // }

    // else {
    //     registerConfirmPasswordError.textContent = "";
    // }

    // if (registerPassword.value === "") {
    //     registerPasswordError.textContent = "Preencha o campo senha.";
    //     registerPassword.focus()
    // } else {
    //     registerPasswordError.textContent = "";
    // }

    if (registerStreet.value === "") {
        registerStreetError.textContent = "Preencha o campo rua.";
        registerStreet.focus()
    } else {
        registerStreetError.textContent = "";
    }

    if (registerNeighborhood.value === "") {
        registerNeighborhoodError.textContent = "Preencha o campo bairro.";
        registerNeighborhood.focus()
    } else {
        registerNeighborhoodError.textContent = "";
    }

    if (registerCity.value === "") {
        registerCityError.textContent = "Preencha o campo cidade.";
        registerCity.focus()
    } else {
        registerCityError.textContent = "";
    }

    if (registerState.value === "") {
        registerStateError.textContent = "Preencha o campo estado.";
        registerState.focus()
    } else {
        registerStateError.textContent = "";
    }

    if (registerNumber.value === "") {
        registerNumberError.textContent = "Preencha o campo número.";
        registerNumber.focus()
    } else {
        registerNumberError.textContent = "";
    }


    if (registerCep.value === "") {
        registerCepError.textContent = "Preencha o campo CEP.";
        registerCep.focus()
    } else if (cepValue.length !== 8) {
        registerCepError.textContent = "Preencha o campo CEP corretamente."
        registerCep.focus()
    } else {
        registerCepError.textContent = "";
    }

    if (registerEmail.value === "") {
        registerEmailError.textContent = "Preencha o campo email.";
        registerEmail.focus()
    } else {
        registerEmailError.textContent = "";
    }

    if (registerName.value === "") {
        registerNameError.textContent = "Preencha o campo nome.";
        registerName.focus()
    } else {
        registerNameError.textContent = "";
    }

    if (!isRegisterFormValid) return


    const data = new FormData(e.currentTarget)

    const email = data.get('email')
    const name = data.get('name')
    const cep = formatToNumeric(data.get('cep'))
    const street = data.get('street')
    const neighborhood = data.get('neighborhood')
    const city = data.get('city')
    const state = data.get('state')
    const number = data.get('number')

    // const password = data.get('password')

    let previousAccounts = JSON.parse(window.localStorage.getItem('@ong-vol:volunteers'))

    previousAccounts = previousAccounts ?? []

    const accountExists = previousAccounts.find((account) => {
        return account.email === email
    })

    if (accountExists) {
        return alert("Uma conta com esse email ja foi cadastrada!")
    }

    const accountId = randomUUID()

    localStorage.setItem('@ong-vol:volunteers', JSON.stringify([...previousAccounts, {
        id: accountId,
        name,
        email,
        cep,
        street,
        neighborhood,
        city,
        state,
        number,
        // password
    }
    ]))

    location.href = "/ong-vol/src/pages/login.html"
})
