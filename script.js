const API_URL = "http://localhost:8080/api/cofre";

// Carregar os itens do cofre
function loadItems() {
    fetch(`${API_URL}/items`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const vaultDiv = document.getElementById('vault-items');
            vaultDiv.innerHTML = '';
            data.forEach(item => {
                vaultDiv.innerHTML += `<div class="vault-item">Nota: R$ ${item.toFixed(2)}</div>`; // Ajustado para usar item diretamente
            });
            updateTotal();
        })
        .catch(error => console.error('Error loading items:', error));
}

// Atualizar o total
function updateTotal() {
    fetch(`${API_URL}/total`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(total => {
            document.getElementById('total-value').innerText = total.toFixed(2);
        })
        .catch(error => console.error('Error loading total:', error));
}

// Adicionar nova nota ao cofre
document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const value = parseFloat(document.getElementById('value').value);
    
    if (isNaN(value)) { // Verificar se o valor é um número válido
        console.error('Valor inválido');
        return;
    }

    fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value) // Enviar apenas o valor como número
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error adding item: ' + response.statusText);
        }
        loadItems();
        document.getElementById('add-item-form').reset(); // Limpar o formulário
    })
    .catch(error => console.error('Error adding item:', error));
});

// Carregar os itens ao iniciar
loadItems();
