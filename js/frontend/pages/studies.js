import {DB} from "/js/backend/data/main.js"
import {appendItem} from "/js/frontend/pages/index/latest.js"

async function main()
{
    const studies = await DB.studies.toArray()
    appendForm()
    const container = document.querySelector("#studies-container")
    studies.forEach((studie) => appendItem(studie, container))
}

function appendForm()
{
    const form = document.querySelector("#studies-form")

    const label = document.querySelector("#studies-form>label")
    label.textContent = "Título do estudo"

    const searchInput = document.createElement("input")
    searchInput.id = "studies-input"
    searchInput.type = "search"
    searchInput.name = 'title'
    searchInput.placeholder = "live de python..."

    searchInput.addEventListener("keyup", (e) => searchStudies(e.target.value))
    searchInput.addEventListener("click", (e) => searchStudies())
    form.appendChild(searchInput)
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        searchStudies(e.target.title.value)
    })
    const goBack = document.querySelector("#go-back")
    goBack.textContent = "voltar"
}

function refreshStudies()
{
    let container = document.querySelector("#studies-container")
    let container2 = document.createElement("div")
    container2.id = "studies-container"

    container.parentNode.replaceChild(container2, container)
    container.remove()
    return container2
}

async function searchStudies(value)
{

    const dbData = await DB.studies.toArray()
    const container = refreshStudies()

    if (!value)
        return dbData.forEach(studie => appendItem(studie, container))

    const studies = dbData.filter(studie => {
        if (studie.title.toLowerCase().includes(value.toLowerCase()))
            return studie.title.toLowerCase()}
    )

    studies.forEach(studie => appendItem(studie, container))
}
main()
