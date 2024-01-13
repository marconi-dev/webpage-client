import {baseURL} from "/js/settings.js";
import {DB} from "/js/backend/data/main.js";
import {ProjectsCache} from "/js/backend/cache.js";


async function _projectsData()
// Get projects from server and convert "technologies" field
// to an array containing each tech ID
{
    const projectsURL = baseURL + '/v1/projects/'
    const res = await fetch(projectsURL)
    const projects = await res.json()
    projects.forEach((project => {
        project.technologies = getProjectTechIDs(project)
    }))
    return projects 
}

function getProjectTechIDs(project)
// Return an array containing the tech IDs of the given project
{
    const IDs = project.technologies.map(tech => {
        return tech.id
    })
    return IDs
}

async function _projectsTechs()
{
    const techsURL = baseURL + '/v1/techs/'
    const res = await fetch(techsURL)
    const data = await res.json()
    return data
}

export async function projectsData()
{
    const cache = new ProjectsCache()
    
    if (cache.isExpired())
    {
        cache.updateCache()
        console.log('projects from server')

        const projDBData = await _projectsData()
        await DB.projects.bulkPut(projDBData)

        const techsDBData = await _projectsTechs()
        await DB.techs.bulkPut(techsDBData)

        const techs = await DB.techs.toArray()
        const projs = await DB.projects.toArray()
        return [projs, techs]
    }

    console.log('projects from DB')
    const projs = await DB.projects.toArray()
    const techs = await DB.techs.toArray()
    return [projs, techs]
}
