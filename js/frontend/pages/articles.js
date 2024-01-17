import {DB} from "/js/backend/data/main.js"
import {appendItem} from "/js/frontend/pages/index/latest.js"

async function main()
{
    const articles = await DB.articles.toArray()
    appendForm()
    const container = document.querySelector("#articles-container")
    articles.forEach((article) => appendItem(article, container))
}

function appendForm()
{
    const form = document.querySelector("#articles-form")

    const label = document.querySelector("#articles-form>label")
    label.textContent = "Título do artigo"

    const searchInput = document.createElement("input")
    searchInput.id = "articles-input"
    searchInput.type = "search"
    searchInput.name = 'title'
    searchInput.placeholder = "adicionando discord login..."

    searchInput.addEventListener("keyup", (e) => searchArticles(e.target.value))
    searchInput.addEventListener("click", (e) => searchArticles())
    form.appendChild(searchInput)
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        searchArticles(e.target.title.value)
    })
    const goBack = document.querySelector("#go-back")
    goBack.textContent = "voltar"
}

function refreshArticles()
{
    let container = document.querySelector("#articles-container")
    let container2 = document.createElement("div")
    container2.id = "articles-container"

    container.parentNode.replaceChild(container2, container)
    container.remove()
    return container2
}

async function searchArticles(value)
{

    const dbData = await DB.articles.toArray()
    const container = refreshArticles()

    if (!value)
        return dbData.forEach(article => appendItem(article, container))

    const articles = dbData.filter(article => {
        if (article.title.toLowerCase().includes(value.toLowerCase()))
            return article.title.toLowerCase()}
    )

    articles.forEach(article => appendItem(article, container))
}
main()
