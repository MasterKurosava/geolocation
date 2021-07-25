"use strict";
const btnSend = document.querySelector('.j-btn-send'),
  btnGeo = document.querySelector('.j-btn-geo'),
  newMessage = document.querySelector('.chat_inputMessage'),
  messageList = document.querySelector('.j-mes-window');

let WS;
//открываем подключение
async function openSoket() {
  WS = new WebSocket('wss://echo.websocket.org/');
  WS.onopen = function () {
    console.log('Подключение успешно');
  }
  WS.onclose = function () {
    console.log('Подключение прервано');
  }
  WS.onmessage = function () {
    console.log(22);
    newChatMessage('Сообщение от сервера', 'chat_serverMessage')
  }
  WS.onerror = function (evt) {
    messageList.appendChild(evt)
  }
}
openSoket();
//вставляем новое сообщение
function newChatMessage(message, from) {
  let newLi = document.createElement('li');
  newLi.classList.add(from);
  newLi.innerHTML = message;
  messageList.appendChild(newLi)
}
//Находим местоположение пользователя(примерное)
async function getGeoData() {
  if (!'geolocation' in navigator) {
    alert('Ваш браузер не поддерживает гео-локацию')
  } else {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let positionLink = `https://www.openstreetmap.org/#map=17/${position.coords.latitude}/${position.coords.longitude}`;

      let element = document.createElement('li');
      element.classList.add("chat_userMessage")
      element.innerHTML = `<a href="${positionLink}">Гео-локация</a>`;
      messageList.appendChild(element)
    }, () => {
      alert('Пожалуйста, дайте доступ к вашему местоположению.')
    })
  }
}
//Обрабатываем отправку
btnSend.addEventListener('click', () => {
  if (newMessage.value) {
    newMessage.style.borderBottom = '1px solid grey'
    let message = newMessage.value;
    newMessage.value = ''
    newChatMessage(message, 'chat_userMessage')
    WS.send(message);
  } else {
    newMessage.style.borderBottom = '1px solid red'
  }
})

btnGeo.addEventListener('click', () => {
  getGeoData()
})