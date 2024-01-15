import { projectsData } from "/js/backend/data/projects.js"
import { putURLParam } from "/js/frontend/utils.js"

export async function loadProjects()
{
    const [projects, techs] = await projectsData()
    
    // Title
    const projectsTitle = document.querySelector("#projects-title")
    projectsTitle.textContent = "Projetos"
    
    // ProjectForm
    const projectTypeSelectLabel = document.querySelector("#projects-type-label")
    projectTypeSelectLabel.textContent = "Tipo de projeto"

    const projectTypeSelect = document.querySelector("#projects-type")
    projectTypeSelect.onchange = (event) => handleProjectTypeSelection(event)
    
    const projectsTypeOptions = getProjectsTypeOptions()
    projectsTypeOptions.forEach(projType => {
        const opt = document.createElement("option")
        opt.value = projType.value
        opt.textContent = projType.text
        projectTypeSelect.appendChild(opt)
    })
    setupProjectType(projectTypeSelect)
    
    const projectTechsSelectLabel = document.querySelector("#projects-techs-label")
    projectTechsSelectLabel.textContent = "Tecnologias"
    
    const projectTechsSelect = document.querySelector("#projects-techs")
    projectTechsSelect.addEventListener("change", (event) => handleTechSelection(event))

    techs.forEach(tech => {
        const opt = document.createElement("option")
        opt.value = tech.id
        opt.textContent = tech.name
        projectTechsSelect.appendChild(opt)
    })
    setupProjectTechsSelect(projectTechsSelect)

    const projectTechsHint = document.querySelector("#projects-techs-hint")
    projectTechsHint.innerHTML = "Segure <i>ctrl</i> para selecionar multiplas tecnologias."

    // Projects
    appendProjectArray(projects)
}


async function handleProjectTypeSelection(event)
{
    const key = "projectType"
    const value = event.target.value
    putURLParam(key, value)
    const [projects, techs] = await projectsData()
    appendProjectArray(projects)
}

function getProjectsTypeOptions()
{
    return [
        {
            text: "Todos",
            value: "all"
        },
        {
            text: "Back-End",
            value: "backend"
        },
        {
            text: "Front-End",
            value: "frontend"
        },
        {
            text: "Ciência da Computação",
            value: "cs"
        },
        {
            text: "Por Diversão",
            value: "fun"
        }
    ]
}

function setupProjectType(projectTypeSelect)
// try to select an option from url param
{
    const params = new URLSearchParams(location.search)
    const projectType = params.get("projectType")

    if (!projectType)
        return
    
    const options = Array.from(projectTypeSelect.options)
    options.forEach(option => {
        if (option.value == projectType)
            option.selected = true
    })
}

async function handleTechSelection(event)
{
    const select = event.target
    const options = Array.from(select.options) // Every option
    const selectedOptions = Array.from(select.selectedOptions) // Only selected options
    
    // style
    options.forEach(opt => opt.classList.remove("tech-selected"))
    selectedOptions.forEach(opt => {opt.className = "tech-selected"})
    
    // url params
    const key = "projectTech" // url param key
    const techIDs = selectedOptions.map(opt => {return opt.value})
    putURLParam(key, techIDs)

    const [projects, techs] = await projectsData()
    appendProjectArray(projects)
}

function setupProjectTechsSelect(projectTechsSelect)
{
    const params = new URLSearchParams(location.search)
    const projectTechs = params.getAll("projectTech")

    if (projectTechs.length <= 0)
        return

    const options = Array.from(projectTechsSelect.options)
    options.forEach(option => {
        if (projectTechs.includes(option.value))
        {
            option.selected = true
            option.className = "tech-selected"
        }
    })
}

function appendProjectArray(projects)
// refresh projects-root and apply filters before appending projects
{
    const projectsContainer = document.querySelector("#projects-container")
    let projectsRoot = document.querySelector("#projects-root")
    
    if (projectsRoot)
    {
        projectsRoot.remove()
        projectsRoot = document.createElement("div")
        projectsRoot.id = "projects-root"
        projectsContainer.appendChild(projectsRoot)
    }

    projects.forEach(project => {
        if (filterProject(project))
            appendProject(project, projectsRoot)
    })
}

function filterProject(project)
// match the given project against url params
{
    const params = new URLSearchParams(location.search)
    
    // project type
    const projectType = params.get("projectType")
    if (projectType == "all"){} // Do nothing
    else if (projectType && projectType !== project.project_type) 
        return false

    // project techs
    const projectTechs = params.getAll("projectTech")

    for (const techID of projectTechs)
    {
        if (!project.technologies.includes(techID))
            return false
    }
    return true
}

function appendProject(project, projectsRoot)
{
    const projectCard = document.createElement("div")
    projectCard.className = "project-card"
    projectsRoot.appendChild(projectCard)

    const projectTitle = document.createElement("h4")
    projectTitle.textContent = project.name
    projectCard.appendChild(projectTitle)
    
    if (!project.is_active)
    {
        const projectStatus = document.createElement("small")
        projectStatus.textContent = "(desativado)"
        projectCard.appendChild(projectStatus)
    }
    
    const projectDescription = document.createElement("p")
    projectDescription.textContent = project.short_description
    projectCard.appendChild(projectDescription)
    
    // Project links
    const projectLinksContainer = document.createElement("div")
    projectLinksContainer.className = "project-links-container"
    projectCard.appendChild(projectLinksContainer)
    
    const aboutLink = document.createElement("a")
    aboutLink.href = `/pages/proj.html?projID=${project.id}`
    aboutLink.textContent = "saiba mais"
    projectLinksContainer.appendChild(aboutLink)

    const sourceCodeLink = document.createElement("a")
    sourceCodeLink.href = project.source_code
    sourceCodeLink.target = "_blank"
    sourceCodeLink.textContent = "código"
    projectLinksContainer.appendChild(sourceCodeLink)

    if (project.deploy)
    {
        const deployLink = document.createElement("a")
        deployLink.href = project.deploy
        deployLink.textContent = "acesse"
        deployLink.target = "_blank"
        projectLinksContainer.appendChild(deployLink)
    }
}

