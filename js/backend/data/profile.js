import {baseURL} from "/js/settings.js";
import {DB} from "/js/backend/data/main.js";
import {ProfileCache} from "/js/backend/cache.js"


function _profileData() 
// This function just prevent requests to server
{
    return new Promise(async (resolve, reject) => 
    {
        const profileURL = baseURL + '/v1/profile/'
        const res = await fetch(profileURL)
        const data = await res.json()
        const image = await fetch(data.image)

        const reader = new FileReader()
        reader.readAsDataURL(await image.blob())
        reader.onloadend = () => {
            resolve({
                id: 1,
                image: reader.result,
                name: data.name,
                titles: data.titles,
                links: data.links
            })
        }
    })
}

export async function profileData()
{
    const cache = new ProfileCache()
    
    if (cache.isExpired())
    {
        cache.updateCache()
        const dbData = await _profileData()
        await DB.profile.put(dbData)
        const data = await DB.profile.get(1)
        return data
    }

    const data = await DB.profile.get(1)
    return data
}
