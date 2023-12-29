function setupProjectTechs()
{
    const urlProjectTechs = new URLSearchParams(window.location.href)
    const techIDs = urlProjectTechs.getAll('projectTechs')

    // pre populate input
    techIDs.forEach(techId => {
        const id = techId.replaceAll('-', '')
        const option = document.getElementById(id)
        option.selected = true
    })

    const techItem = document.querySelector("#project-techs")
    techItem.addEventListener(
        'change', (event) => updateProjectTechURLParams(event)
    ) 
}
    
function updateProjectTechURLParams(event) 
{
    const techOptions = event.target.selectedOptions
    const techOptionArray = Array.from(techOptions)
    const techValues = techOptionArray.map(option => option.value)
    setQueryParam('projectTechs', techValues)
    replaceProjects()    
}

async function techs()
{
    const data = await getTechs()
    appendTechOptions(data)
    setupProjectTechs()
}

async function getTechs()
{
    if (cacheIsExpired('techs')) 
    {
        const defaultUrl = _URL + '/techs'
        const data = await getData(defaultUrl)
        setCache('techs', data)
        return data
    }

    const storageData = localStorage.getItem('techs')
    const data = JSON.parse(storageData)
    return data
}

function appendTechOptions(techs) 
{
    const techContainer = document.querySelector("#project-techs")

    techs.forEach(techItem => {
        const techOption = document.createElement('option')
        techOption.id = techItem.id.replaceAll('-', '')
        techOption.value = techItem.id
        techOption.textContent = techItem.name + ` (${techItem.tech_count} projs)`
        techOption.style.textAlign = "left"
        techOption.style.fontSize  = 'small'
        techContainer.appendChild(techOption)
    });
}