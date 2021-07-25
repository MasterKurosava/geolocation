const btn = document.querySelector('#btn_findPos'),
  info = document.createElement('div');

function findInfo() {
  info.innerHTML = '';
  if (!'geolocation' in navigator) {
    info.innerHTML += `<p class="error">Местоположение не найдено. Ваш браузер не поддерживает геолокацию</p>`
  } else {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //делаем запрос 
      await fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${position.coords.latitude}&long=${position.coords.longitude}`)
        .then((timeApi) => {return timeApi.json()})
        .then((timeApi)=>{
          info.innerHTML += `<p>Месторасположение: ${timeApi.timezone}</p>
                            <p>Местное время: ${timeApi.date_time_txt}</p>`
        })
        .catch(() =>info.innerHTML += `<p class="error">Ошибка сервера, попробуйте позже</p>`)
    }, () => {
      //если геоданные отключены
      info.innerHTML += `<p class="error">Местоположение не найдено. Пожалуйста, предоставте доступ к геолокации.</p>`
    })
  }
  info.classList.add('info')
  btn.insertAdjacentElement('afterend', info)
}

btn.addEventListener('click', () => {
  findInfo()
})