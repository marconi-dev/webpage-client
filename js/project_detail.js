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
    description.textContent = data.short_description + data.short_description
    console.warn('using short description instead of full description. Implement at backend')

    appendAssets(data.assets)
    listTechs(data.techs)
    appendTechs(data.techs)
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
    assets.forEach(asset => {
        const assetItem = document.createElement("div")

        const assetTitle = document.createElement("h3")
        assetTitle.textContent = asset.title
        assetItem.appendChild(assetTitle)

        const assetImage = document.createElement('img')
        assetImage.src = getImageURL(asset.image)
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