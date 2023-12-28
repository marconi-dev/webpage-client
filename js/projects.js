async function projects()
{
    url = _URL + '/projects'

    data = await getProjects(url)
    data.forEach(project => appendProject(project));
}

async function getProjects(url)
// fetch every projects if cache is expired and set their cache 
// or return them directly from localStorage
{
    if (cacheIsExpired('projects')) 
    {
        const default_url = _URL + '/projects'
        const data = await getData(default_url)
        setCache('projects', data)
        return data
    }

    const storageData = localStorage.getItem('projects')
    const data = JSON.parse(storageData)
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
    deploy.href = sourceCodeURL
    deploy.target = '_blank'
    deploy.text = 'código'
    deploy.style.marginRight = '10px'

    projContainer.appendChild(details)
    projContainer.appendChild(sourceCode)
    projContainer.appendChild(deploy)
}

const projectType = document.querySelector("#project-type")
projectType.addEventListener('change', (e) => replaceProjects(e))

async function replaceProjects(event)
{
    const container = document.querySelector("#projects-container")
    const newContainer = document.createElement("div")
    newContainer.id = container.id
    
    container.parentNode.replaceChild(newContainer, container)
    
    newContainer.innerHTML = "<h3>Carregando...</h3>"
    
    const url = _URL + `/projects?project_type=${event.target.value}`
    const data = await getProjects(url)
    newContainer.innerHTML = ""
    
    const projects = filterProjects(event, data)
    projects.forEach(project => appendProject(project))
}

function filterProjects(event, data) {
    const target = event.target
    
    if (target.id === "project-type" && target.value !== "all")
    {
        data = data.filter(project => {
            return project.project_type == target.value
        })
    }
    return data
}