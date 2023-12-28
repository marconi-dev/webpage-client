function cacheIsExpired(cacheName) 
{
    const cacheStorage = localStorage.getItem('cache')
    if (cacheStorage === null)
    // There's no cache settings at localStorage yet
    {
        const cacheSettings = getCacheSettings()
        localStorage.setItem('cache', cacheSettings)
        return true
    }

    const cache = JSON.parse(cacheStorage)

    // The requested cache settings are not available 
    if (cache[cacheName] === undefined) return true

    const cacheExpirationDate = (
        cache[cacheName].cachedAt + 
        cache[cacheName].cacheExpirationTime
    )
        
    // Cache data is old data
    if (cacheExpirationDate < new Date()) 
    {
        console.log("old data")
        return true
    }

    console.log('not expired')
    return false
}

function getCacheSettings()
{
    const settings = {
        profile: {
            cachedAt: Date.now(),
            cacheExpirationTime: 5*1000 // 24 hours
        },
        projects: {
            cachedAt: Date.now(),
            cacheExpirationTime: 5*1000 // 30 min
        }
    }

    console.warn("Cache is 5s for testing porpouses")

    const cacheSettings = JSON.stringify(settings)
    return cacheSettings
}

async function setCache(cacheName, data)
/* 
Stores the given data and update cache information
*/
{
    localStorage.setItem(cacheName, JSON.stringify(data))
    const cacheStorage = localStorage.getItem('cache')
    const cacheData = JSON.parse(cacheStorage)
    cacheData[cacheName] = {
        cachedAt: Date.now(),
        cacheExpirationTime: cacheData[cacheName].cacheExpirationTime
    }
    localStorage.setItem('cache', JSON.stringify(cacheData))
}