const session = JSON.parse(window.localStorage.getItem('@ong-vol:session'));

if (!session) {
    window.location.href = "login.html";
}

const input = document.getElementById('search');

input.addEventListener('input', () => {
    renderVolunteers(input.value);
});




function createVolunteerCard(volunteer) {
    return `
      <li class="team">
        <img
          src="https://source.unsplash.com/160x160/?${volunteer.name}"
          alt="Foto de ${volunteer.name}"
        />
        <div class="team__container">
          <h1>${volunteer.name}</h1>
          <p>📧 ${volunteer.email}</p>
          <p>
            🏠 ${volunteer.street}, ${volunteer.number}, ${volunteer.neighborhood}<br />
            ${volunteer.city}, ${volunteer.state}, ${volunteer.cep}<br />
            Brasil
          </p>
        </div>
        <hr class="team__separator" />
      </li>
    `;
}

// Função para renderizar todos os volunteers na lista
function renderVolunteers(query = '') {
    const container = document.getElementById('volunteers-list');
    if (!container) return console.error('Container #volunteers-list não encontrado.');

    const storedData = localStorage.getItem('@ong-vol:volunteers');
    if (!storedData) {
        container.innerHTML = '<p>Nenhum voluntário encontrado.</p>';
        return;
    }

    try {
        let volunteers = JSON.parse(storedData);
        if (!Array.isArray(volunteers) || volunteers.length === 0) {
            container.innerHTML = '<p>Nenhum voluntário encontrado.</p>';
            return;
        }


        // Se uma query for passada, filtra os voluntários pelo nome
        if (query.trim() !== '') {
            const lowerQuery = query.trim().toLowerCase();
            volunteers = volunteers.filter(vol => vol.name.toLowerCase().includes(lowerQuery));
        }

        if (volunteers.length === 0) {
            container.innerHTML = '<p>Nenhum voluntário encontrado.</p>';
            return;
        }

        const cardsHTML = volunteers.map(createVolunteerCard).join('');
        container.innerHTML = cardsHTML;

    } catch (error) {
        console.error('Erro ao analisar dados do localStorage:', error);
        container.innerHTML = '<p>Erro ao carregar voluntários.</p>';
    }
}


renderVolunteers('')