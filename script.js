const photoElement = document.getElementById('photo');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('like-button');
const countElement = document.getElementById('count');
const historyButton = document.getElementById('history-button');
const historyContainer = document.getElementById('history-container');

let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0;
let photoHistory = JSON.parse(localStorage.getItem('photoHistory')) || [];

function fetchRandomPhoto() {
    // Используем API Lorem Picsum для случайного изображения
    fetch('https://picsum.photos/500/300')
        .then(response => {
            photoElement.src = response.url;
            photographerElement.textContent = `Фото от: неизвестный автор`;
            savePhotoToHistory(response.url);
        })
        .catch(error => console.log('Ошибка получения изображения', error));
}

function savePhotoToHistory(photoUrl) {
    if (photoHistory.length >= 5) {
        photoHistory.shift(); // Удалить самое старое изображение, если уже 5
    }
    photoHistory.push({ url: photoUrl });
    localStorage.setItem('photoHistory', JSON.stringify(photoHistory));
}

likeButton.addEventListener('click', () => {
    likeCount++;
    countElement.textContent = likeCount;
    localStorage.setItem('likeCount', likeCount);
});

historyButton.addEventListener('click', () => {
    historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
    historyContainer.innerHTML = ''; // Очистить текущее содержимое
    photoHistory.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.innerHTML = `<img src="${photo.url}" alt="Фото" style="width:100%; max-width:200px; border-radius:5px;" />`;
        historyContainer.appendChild(photoItem);
    });
});

// Инициализация
countElement.textContent = likeCount;
fetchRandomPhoto();