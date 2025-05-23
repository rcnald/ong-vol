const session = JSON.parse(window.localStorage.getItem('@ong-vol:session'));

if (session) {
  window.location.href = "list-volunteer.html";
}

let isLoginFormValid = false;

const loginForm = document.getElementById('login-form');

const loginName = document.getElementById('login-name');
const loginPassword = document.getElementById('login-password');

const loginNameError = document.getElementById('login-name-error');
const loginPasswordError = document.getElementById('login-password-error');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (loginName.value === "" || loginPassword.value === "") {
    isLoginFormValid = false;
  } else {
    isLoginFormValid = true;
  }

  if (loginPassword.value === "") {
    loginPasswordError.textContent = "Preencha o campo senha.";
    loginPassword.focus();
  } else {
    loginPasswordError.textContent = "";
  }

  if (loginName.value === "") {
    loginNameError.textContent = "Preencha o campo nome de usuário.";
    loginName.focus();
  } else {
    loginNameError.textContent = "";
  }

  if (!isLoginFormValid) return;

  const data = new FormData(e.currentTarget);

  const name = data.get('name');
  const password = data.get('password');

  let previousAccounts = JSON.parse(window.localStorage.getItem('@ong-vol:accounts'));

  previousAccounts = previousAccounts ?? [];

  const account = previousAccounts.find((account) => {
    return account.name === name;
  });

  if (account) {
    if (account.password === password) {
      window.localStorage.setItem('@ong-vol:session', JSON.stringify({ id: account.id }));
      return window.location.href = "list-volunteer.html";
    }

    return alert("Credenciais inválidas!");
  }

  alert("Credenciais inválidas!");
});
