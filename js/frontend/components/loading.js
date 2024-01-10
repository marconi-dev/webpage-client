export default function loading()
{
    const main = document.querySelector("main")
    main.style.display = "none"

    const loading = document.createElement("div")
    document.body.append(loading)
    loading.id = "loading"

    const loadingTitle = document.createElement('h2')
    loadingTitle.textContent = 'Carregando...'
    loading.appendChild(loadingTitle)

    return [loading, main]
}
