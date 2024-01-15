import {DB} from "/js/backend/data/main.js"
import {baseURL} from "/js/settings.js"

export function getProject()
{
    return new Promise(async (resolve, reject) => 
    {
        const projID = new URLSearchParams(location.search).get("projID")
        if (!projID)
            return reject(null)
        
        const project = await DB.projectsDetail.get(projID)
        if (project) return resolve(project)
        
        console.log("loading projectDetail from server")
        const projWorker = new Worker("/js/backend/workers/projects.js", {type: "module"})
        projWorker.postMessage([projID])
        projWorker.onmessage = (message) => {
            if (message.data === false)
                return reject(null)
            return resolve(message.data)
        }
    })
}
