const params = new URLSearchParams(window.location.search)
const projID = params.get('proj')
const errHTML = "\
<h1>:(</h1>\
<h2>Parece que o link usado está quebrado...</h2>\
<a href='/index.html'>voltar</a>\
"

async function projectDetail()
{
    if (projID == "undefined")
    {
        document.body.innerHTML = errHTML
        return
    }

    const data = await getProjectDetail()
    
    document.title = data.name

    const name = document.querySelector("#project-name")
    name.textContent = data.name

    const description = document.querySelector("#project-description")
    description.textContent = data.description

    appendAssets(data.assets)
    listTechs(data.techs)
    appendTechs(data.techs)
    appendProjectDetails(data.details)
}

async function getProjectDetail()
{
    if (projectCacheIsExpired(projID))
    {
        const defaultUrl = _URL + `/projects/${projID}`
        const data = await getData(defaultUrl)
        setProjectCache(projID, data)
        return data
    }

    const dataStorage = localStorage.getItem(projID)
    return JSON.parse(dataStorage)
}

function appendAssets(assets)
{
    const assetsContainer = document.querySelector("#project-assets")
    if (assets.length == 0)
    {
        assetsContainer.remove()
        return
    }
    assets.forEach(asset => {
        const assetItem = document.createElement("div")

        const assetTitle = document.createElement("h3")
        assetTitle.style.marginBottom = "5px"
        assetTitle.textContent = asset.title
        assetItem.appendChild(assetTitle)

        const assetImage = document.createElement('img')
        const mobileImgURL = getImageURL(asset.mobile_image)
        const imageURL = getImageURL(asset.image)
        assetImage.srcset = `${mobileImgURL} 600w, ${imageURL} 2000w`
        assetImage.src = getImageURL(imageURL)
        assetImage.alt = asset.alter_text
        assetItem.appendChild(assetImage)
        
        const assetDescription = document.createElement('p')
        assetDescription.textContent = asset.description
        assetItem.appendChild(assetDescription)

        assetsContainer.appendChild(assetItem)
    });
}

function listTechs(techs)
{
    const techList = document.querySelector("#project-techs-list")
    techs.forEach(techItem => {
        const tech = document.createElement("li")
        tech.textContent = techItem.name
        techList.appendChild(tech)
    })

}

function appendTechs(techs)
{
    const techContainer = document.querySelector('#project-techs-detail')

    techs.forEach(techItem => {
        if (techItem.description)
        {
            const tech = document.createElement('div')
            
            const techName = document.createElement('h3')
            techName.textContent = techItem.name
            tech.appendChild(techName)
    
            const techDescription = document.createElement('p')
            techDescription.textContent = techItem.description
            tech.appendChild(techDescription)
        
            techContainer.appendChild(tech)
        }

    })
}

function appendProjectDetails(details)
{
    const detailsContainer = document.querySelector("#project-details")
    if (details.length == 0)
    {
        detailsContainer.remove()
        return
    }
    details.forEach(detail => {
        const detailItem = document.createElement('div')
        
        const detailTitle = document.createElement('h3')
        detailTitle.textContent = detail.title
        detailItem.appendChild(detailTitle)

        const detailsDescription = document.createElement('p')
        detailsDescription.textContent = detail.description
        detailItem.appendChild(detailsDescription)
        
        detailsContainer.appendChild(detailItem)
    })
}