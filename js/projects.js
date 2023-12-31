async function projects()
{
    setupProjectType()
    data = await getProjects()
    data.forEach(project => appendProject(project));
}

function setupProjectType()
{
    const projectType = document.querySelector("#project-type")
    projectType.addEventListener('change', (event) => {
        setQueryParam('projectType', event.target.value)
        replaceProjects()
    })
    
    const currentURL = new URLSearchParams(window.location.search)
    const projectTypeValue = currentURL.get('projectType')

    if (projectTypeValue) 
        projectType.value = projectTypeValue
}

async function getProjects()
{
    if (cacheIsExpired('projects')) 
    {
        const defaultUrl = _URL + '/projects'
        let data = await getData(defaultUrl)
        data = concatenateTechIDs(data)
        setCache('projects', data)
        data = filterProjects(data)
        return data
    }

    const storageData = localStorage.getItem('projects')
    let data = JSON.parse(storageData)
    data = filterProjects(data)
    return data
}

function concatenateTechIDs(data)
/*
add a field in each project containing tech ids
to be filtered eventualy.
*/
{
    data.map((project) => {
        const IDsArray = project.tecnologies.map(tech => tech.id)
        project.techIDs = IDsArray
    })
    return data
}

async function appendProject(project) 
{
    const container = document.querySelector("#projects-container")

    const projContainer = document.createElement('div')
    projContainer.style.margin = "0 auto 30px"

    const projName = document.createElement('h4')
    projName.style.marginBottom = "0px"
    projName.textContent = project.name
    projContainer.appendChild(projName)

    if (!project.is_active)
    {
        const status = document.createElement('small')
        status.textContent = "( desativado )"
        projContainer.appendChild(status)
    }

    commits = [project.first_commit, project.last_commit]
    appendProjectCommits(projContainer, commits)

    const projShortDescription = document.createElement('p')
    projShortDescription.textContent = project.short_description
    projShortDescription.style.marginBottom = "20px"
    projContainer.appendChild(projShortDescription)

    appendProjectLinks(
        projContainer,
        project.id,
        project.source_code,
        project.deploy
    )

    container.appendChild(projContainer)
}

function appendProjectCommits(projContainer, commitDates) 
{
    const commitContainer = document.createElement('div')
    commitContainer.style.display = 'flex'
    commitContainer.style.maxWidth = 'fit-content'
    commitContainer.style.gap = '10px'
    commitContainer.style.justifyContent = 'space-evenly'
    projContainer.appendChild(commitContainer)

    let previousStringDate = ""
    commitDates.forEach(commitDate => {
        if (commitDate) 
        {
            const stringDate = formatDate(commitDate)
            if (previousStringDate !== stringDate) 
            {
                const commitElement = document.createElement('small')
                commitElement.textContent = stringDate
                commitElement.style.fontSize = '.7rem'
                commitContainer.appendChild(commitElement)

                previousStringDate = stringDate       
            }
        }
    })
}

function appendProjectLinks(projContainer, id, sourceCodeURL, deployURL)
{
    const details = document.createElement('a')
    details.href = `/projects.html?proj=${id}`
    details.style.marginRight = "10px"
    details.text = "saiba mais"

    const sourceCode = document.createElement('a')
    sourceCode.href = sourceCodeURL
    sourceCode.target = '_blank'
    sourceCode.text = 'código'
    sourceCode.style.marginRight = '10px'
    projContainer.appendChild(details)

    const deploy = document.createElement('a')
    deploy.href = deployURL
    deploy.target = '_blank'
    deploy.text = 'acesse'
    deploy.style.marginRight = '10px'

    projContainer.appendChild(details)
    projContainer.appendChild(sourceCode)
    projContainer.appendChild(deploy)
}

async function replaceProjects()
{
    const container = document.querySelector("#projects-container")
    const newContainer = document.createElement("div")

    newContainer.id = container.id
    container.parentNode.replaceChild(newContainer, container)
    
    newContainer.innerHTML = "<p>carregando...</p"
    const projects = await getProjects()
    newContainer.innerHTML = ""

    projects.forEach(project => appendProject(project))
}

function filterProjects(data) {
    const params = new URLSearchParams(window.location.search)
    const projectType = params.get('projectType')
    if (projectType && projectType !== 'all')
        data = data.filter(project => project.project_type == projectType)
    
    const techs = params.getAll('projectTechs')
    techs.forEach((techID) => {
        data = data.filter((project) => project.techIDs.includes(techID))
    })
    return data
}