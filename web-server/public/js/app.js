const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// meassageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault() // Stop automatic refresh after form submission

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      }
      messageOne.textContent = data.location
      messageTwo.textContent = data.temperature + data.rain
    })
  })
  console.log(location)
})
