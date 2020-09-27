console.log('client side js file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textCotent = ""

weatherForm.addEventListener('submit', (eventObject) => {
    eventObject.preventDefault()

    const location = search.value

    console.log(location)

    // const url = 'http://localhost:3000/weather?address=' + location

    const url = '/weather?address=' + location

    messageOne.textContent = "loading..."
    messageTwo.textContent = ""
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)

                messageOne.textContent = data.error
                messageTwo.textContent = ""

            } else {
                console.log(data.location)
                console.log(data.Forecast)

                messageOne.textContent = data.location
                messageTwo.textContent = data.Forecast
            }
        })
    })
})