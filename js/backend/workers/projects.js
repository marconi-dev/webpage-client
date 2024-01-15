import {DB} from "/js/backend/data/main.js"
import {baseURL} from "/js/settings.js"

onmessage = async (message) => {
    const projIDs = message.data
    projIDs.forEach(projID => fetchProject(projID))
}

async function fetchProject(projID)
// fetch a project, convert its assets to base64 and save to DB
{
    const projectsURL = baseURL + `/v1/projects/${projID}`
    
    const res = await fetch(projectsURL)

    if (res.status == 404) 
        return postMessage(false)

    const data = await res.json()
    const assets = data.assets.map(async asset => {
        return [{
            ...asset, 
            image: await downloadImage(asset.image),
            mobile_image: await downloadImage(asset.mobile_image)
        }]
    })

    const dbAssetsArray = await Promise.all(assets)
    const dbAssets = dbAssetsArray.map(asset => {return asset[0]})

    const dbData = {
        ...data,
        assets: dbAssets.sort((a, b) => a.position > b.position) // TODO order by position at backend
    }
    DB.projectsDetail.put(dbData)
    postMessage(dbData)
}

function downloadImage(imageURL)
{
    return new Promise(async (resolve, reject) => 
    {
        const res = await fetch(imageURL)
        const image = await res.blob()
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = () => {
            resolve(reader.result)
        }
        reader.onerror = (err) => reject(err)
    })
}

