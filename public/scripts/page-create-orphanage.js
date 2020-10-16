// create map
const map = L.map('mapid').setView([-23.5577899,-46.6517651], 16);

// create and add tileLayer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(map);

// create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68]
})

let marker;

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon
    marker && map.removeLayer(marker);

    // add icon tileLayer
    marker = L.marker([lat, lng], { icon }).addTo(map);
})

// adicionar o campo de foto
function addPhotoField() {
    
    // pegar o container de fotos #images
    const container = document.querySelector('#images');

    // pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload');

    // realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

    // verificar se o campo está vazio. Se sim, não adicionar ao container
    const input = newFieldContainer.children[0];
    if (input.value == "") {
        return
    }

    // limpar o campo antes de adicionar ao container
    input.value = "";

    // adicionar o clone ao container #images
    container.appendChild(newFieldContainer);    
}

function deletePhotoField(event) {

    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if (fieldsContainer.length <= 1) {
        // limpar o valor do campo
        span.parentNode.children[0].value = "";

        return
    }

    // deletar o campo
    span.parentNode.remove();
}

// troca do sim e não
function toggleSelect(event) {

    // remover a classe .active dos botões
    document.querySelectorAll('.button-select button')
        .forEach((button) => {
            button.classList.remove('active');
        });

    // colocar a classe .active nesse botão clicado
    const button = event.currentTarget;
    button.classList.add('active');

    // atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]');

    // verificar se é sim ou Não
    input.value = button.dataset.value;
}

function validate(event) {

    // validar se lat e lng estão preenchidos
    const needsLatAndLng = false;
    if (needsLatAndLng) {
        event.preventDefault();
        alert('Selecione a localização no mapa')
    }
}