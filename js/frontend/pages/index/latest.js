import { formatDate } from "/js/frontend/utils.js";
import { latestArticlesData, latestStudiesData } from "/js/backend/data/latest.js";

function appendItem(item, container)
{
    const itemCard = document.createElement("div")
    itemCard.className = "latest-card"
    container.appendChild(itemCard)

    const itemDate = document.createElement("small")
    itemDate.textContent = formatDate(item.created_at)
    itemCard.appendChild(itemDate)

    const itemTitle = document.createElement("h4")
    itemTitle.textContent = item.title
    itemCard.appendChild(itemTitle)

    const itemDescription = document.createElement("p")
    itemDescription.textContent = item.description
    itemCard.appendChild(itemDescription)

    const itemURL = document.createElement("a")
    itemURL.href = item.url
    itemURL.target = "_blank" 
    itemURL.textContent = "saiba mais"
    itemCard.appendChild(itemURL)
}

export async function loadLatestStudies()
{
    const data = await latestStudiesData()

    const title = document.querySelector("#studies-title")
    title.textContent = "Estudos Recentes"
    
    const container = document.querySelector("#studies-container")
    data.forEach(study => appendItem(study, container))

    const viewMoreLink = document.querySelector("#studies-view-more")
    viewMoreLink.textContent = "mais estudos"
}


export async function loadLatestArticles()
{
    const data = await latestArticlesData()

    const title = document.querySelector("#articles-title")
    title.textContent = "Artigos Recentes"
    
    const container = document.querySelector("#articles-container")
    data.forEach(article => appendItem(article, container))

    const viewMoreLink = document.querySelector("#articles-view-more")
    viewMoreLink.textContent = "mais artigos"
}
