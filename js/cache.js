const defaultProjectCachingTime = 24*60*60*1000 // 24 hours

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
        return true
    }
    return false
}

function getCacheSettings()
{
    const settings = {
        profile: {
            cachedAt: 0,
            cacheExpirationTime: 24*60*60*1000 // 24 hours
        },
        projects: {
            cachedAt: 0,
            cacheExpirationTime: 30*60*1000 // 30 min
        },
        techs: {
            cachedAt: 0,
            cacheExpirationTime: 24*60*60*1000 // 24 hours
        },
        latestArticles: {
            cachedAt: 0,
            cacheExpirationTime: 30*60*1000 // 30 min
        },
        latestStudies: {
            cachedAt: 0,
            cacheExpirationTime: 30*60*1000 // 30 min
        }
    }
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

function projectCacheIsExpired(projID)
// Cache for specific project
// read cacheIsExpired() for better comprehension
{
    const cacheStorage = localStorage.getItem("projCache")
    if (cacheStorage === null)
    {
        localStorage.setItem('projCache', JSON.stringify({}))
        return true
    }
    const cache = JSON.parse(cacheStorage)

    if (cache[projID] === undefined) return true
    
    const cacheExpirationDate = (
        cache[projID].cachedAt + 
        defaultProjectCachingTime
    )

    if (cacheExpirationDate < new Date()) 
    {
        return true
    }
    return false
}

function setProjectCache(projID, data)
// Stores the given data and update project cache information
{
    localStorage.setItem(projID, JSON.stringify(data))
    const cacheStorage = localStorage.getItem('projCache')
    const cache = JSON.parse(cacheStorage)
    cache[projID] = {
        cachedAt: Date.now(),
        cacheExpirationTime: defaultProjectCachingTime
    }
    localStorage.setItem('projCache', JSON.stringify(cache))
}