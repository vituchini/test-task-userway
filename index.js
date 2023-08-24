(() => {
    const RANDOM_WORD_API_URL = 'https://random-word-api.herokuapp.com/word?number=1'

    const updateImage = async (img) => {
        let word =`${Math.floor(Math.random() * 1000) + 1}`
        try {
            const response = await fetch(RANDOM_WORD_API_URL)
            word = await response.json()
        } catch (e) {
            console.error('Error', e)
        }
        img.setAttribute('alt', word)

        img.style.outline = '2px solid red'
    }

    let images = [...document.querySelectorAll('img')]

    images.forEach(img => {
        updateImage(img)
    })
})()