const btn = document.querySelector('#btn_findPos'),
  info = document.createElement('div');

function findInfo() {
  info.innerHTML='';
  info.innerHTML += `<p>Ширина окна: ${window.innerWidth}</p>
                     <p>Ширина окна: ${window.innerHeight}</p>`
  if (!'geolocation' in navigator) {
    info.innerHTML += `<p class="error">Местоположение не найдено. Ваш браузер не поддерживает геолокацию</p>`
    console.log('-');
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      info.innerHTML += `<p>Долгота: ${position.coords.longitude}</p>
                        <p>Ширина: ${position.coords.latitude}</p>`
    }, () => {
      info.innerHTML += `<p class="error">Местоположение не найдено. Пожалуйста, предоставте доступ к геолокации.</p>`
    })
  }
  info.classList.add('info')
  btn.insertAdjacentElement('afterend',info)
}

btn.addEventListener('click', () => {
  findInfo()
})