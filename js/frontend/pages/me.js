import loading from '/js/frontend/components/loading.js'

const [loadingNode, main] = loading()
const iframe = document.querySelector("iframe")
iframe.onload = () => {
    loadingNode.remove()
    main.style.display = "block"
}
