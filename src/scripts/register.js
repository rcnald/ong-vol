let isRegisterFormValid = false

const registerForm = document.getElementById('register-form')

const registerName = document.getElementById('register-name')
const registerPassword = document.getElementById('register-password')
const registerConfirmPassword = document.getElementById('register-confirm-password')

const registerNameError = document.getElementById('register-name-error')
const registerPasswordError = document.getElementById('register-password-error')
const registerConfirmPasswordError = document.getElementById('register-confirm-password-error')

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (
        registerName.value === "" ||
        registerPassword.value === "" ||
        registerConfirmPassword.value === "" ||
        registerPassword.value !== registerConfirmPassword.value
    ) {
        isRegisterFormValid = false
    } else {
        isRegisterFormValid = true
    }

    if (registerName.value === "") {
        registerNameError.textContent = "Preencha o campo nome."
        registerName.focus()
    } else {
        registerNameError.textContent = ""
    }

    if (registerPassword.value === "") {
        registerPasswordError.textContent = "Preencha o campo senha."
        registerPassword.focus()
    } else {
        registerPasswordError.textContent = ""
    }

    if (registerConfirmPassword.value === "") {
        registerConfirmPasswordError.textContent = "Confirme sua senha."
        registerConfirmPassword.focus()
    } else if (registerPassword.value !== registerConfirmPassword.value) {
        registerConfirmPasswordError.textContent = "As senhas não coincidem!"
        registerConfirmPassword.focus()
    } else {
        registerConfirmPasswordError.textContent = ""
    }

    if (!isRegisterFormValid) return

    const data = new FormData(e.currentTarget)

    const name = data.get('name')
    const password = data.get('password')

    let previousAccounts = JSON.parse(window.localStorage.getItem('@ong-vol:accounts'))

    previousAccounts = previousAccounts ?? []

    const accountExists = previousAccounts.find((account) => {
        return account.name === name
    })

    if (accountExists) {
        return alert("Uma conta com esse nome de usuário já foi cadastrada!")
    }

    const accountId = crypto.randomUUID()

    localStorage.setItem('@ong-vol:accounts', JSON.stringify([
        ...previousAccounts,
        {
            id: accountId,
            name,
            password,
        }
    ]))

    location.href = "/ong-vol/src/pages/login.html"
})
