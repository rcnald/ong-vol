export async function fetchAddressByCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)
        const data = await response.json()


        if (data.erro) {
            const registerCepError = document.getElementById('register-cep-error')
            registerCepError.textContent = "CEP não encontrado.";
            registerCepError.style.color = "#eab308"
            return
        }

        document.getElementById('register-street').value = data.logradouro || ""
        document.getElementById('register-neighborhood').value = data.bairro || ""
        document.getElementById('register-city').value = data.localidade || ""
        document.getElementById('register-state').value = data.uf || ""

    } catch (error) {
        registerCepError.textContent = "Erro ao buscar endereço. Tente novamente.";
        console.error("Erro na requisição do CEP:", error)
    }
}
