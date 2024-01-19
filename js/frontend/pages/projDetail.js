import { getProject } from "/js/backend/data/projectDetail.js"
import notFound from "/js/frontend/components/notFound.js"
import loading from "/js/frontend/components/loading.js"


async function getData() 
// add a loading animation and return data
{
    const [loadingElement, main] = loading()

    let data
    try { data = await getProject() }
    catch(err) { data = null }
    loadingElement.remove()
    main.style.display = "block"

    return data
}

async function main()
{
    const proj = await getData()

    if (!proj) 
        return notFound()

    document.title = proj.name

    const title = document.querySelector("#proj-title")
    title.textContent = proj.name

    const description = document.querySelector("#proj-description")
    description.textContent = proj.description
    
    proj.assets.forEach((asset) => appendAsset(asset))

    const techTitle = document.querySelector("#techs-title")
    techTitle.textContent = "Tecnologias utilizadas"

    const techList = document.querySelector("#techs-list")
    proj.techs.forEach(tech => {
        const techItem = document.createElement("li")
        techItem.textContent = tech.name
        techList.append(techItem)
    })

    const techDetailContainer = document.querySelector("#techs-detail-container")
    proj.techs.forEach(tech => {
        if (tech.description) 
            appendCard(tech, techDetailContainer)
    })
    
    const detailsTitle = document.querySelector("#details-title")
    
    if (proj.details.length > 0)
        detailsTitle.textContent = "Detalhes"
        
    const detailContainer = document.querySelector("#details-container")
    proj.details.forEach(detail => appendCard(detail, detailContainer))

    const goBack = document.querySelector("#go-back")
    goBack.textContent = "Voltar"

}

function appendAsset(asset)
{
    const section = document.querySelector("#assets")
    const container = document.createElement("div")
    section.appendChild(container)

    const title = document.createElement("h3")
    title.textContent = asset.title
    container.appendChild(title)
    
    const imgContainer = document.createElement("div")
    imgContainer.className = "img-container"
    container.appendChild(imgContainer)

    const image = document.createElement("img")
    image.srcset = `${asset.image} 1x, ${asset.mobile_image} 2x`
    image.alt = asset.alter_text
    imgContainer.appendChild(image)

    const description = document.createElement("p")
    description.textContent = asset.description
    container.appendChild(description)
}

function appendCard(item, container)
{
    const card = document.createElement("div")
    card.className = "card-item"
    container.appendChild(card)
    
    const title = document.createElement("h3")
    title.textContent = item.name || item.title
    card.appendChild(title)
    
    const description = document.createElement("div")
    description.innerHTML = item.description
    card.appendChild(description)
}

main()
