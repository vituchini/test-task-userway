(() => {
    const RANDOM_WORD_API_URL = 'https://random-word-api.herokuapp.com/word?number=1'

    const updateImage = async (img) => {
        let word = `${Math.floor(Math.random() * 1000) + 1}`
        try {
            const response = await fetch(RANDOM_WORD_API_URL)
            word = await response.json()
        } catch (e) {
            console.error('Error', e)
        }
        img.setAttribute('alt', word)

        img.style.outline = '2px solid red'

        img.addEventListener('click', (event) => {
            const positionValues = event.target.getBoundingClientRect()
            const textFieldContainer = document.createElement('div');
            const textarea = document.createElement('textarea');

            textFieldContainer.appendChild(textarea)

            textFieldContainer.style.position = "fixed";
            textFieldContainer.style.top = "0px";
            textFieldContainer.style.left = "0px";
            textFieldContainer.style.width = "100vw";
            textFieldContainer.style.height = "100vh";
            textFieldContainer.style.background = "transparent";

            textarea.style.position = "absolute";
            textarea.style.top = `${positionValues.top + positionValues.height}px`;
            textarea.style.left = `${positionValues.left}px`;
            textarea.style.background = "white";
            textarea.style.padding = "8px";
            textarea.style.borderRadius = "8px";

            textarea.value = img.alt;

            textFieldContainer.addEventListener('click', (event) => {
                if (event.target.tagName !== "TEXTAREA") {
                    img.alt = textarea.value;
                    img.parentNode.removeChild(textFieldContainer);
                }
            });

            img.parentNode.insertBefore(textFieldContainer, img)
        })
    }

    let images = [...document.querySelectorAll('img')]

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const newNodes = mutation.addedNodes;

                for (let i in newNodes) {
                    if (newNodes[i].tagName === 'IMG') {
                        updateImage(newNodes[i])
                    }
                }
            }
        });
    });
    observer.observe(document.body, {subtree: true, childList: true});

    images.forEach(img => {
        updateImage(img)
    })
})()