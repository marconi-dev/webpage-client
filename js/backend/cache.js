// time in miliseconds
const sec = 1000
const min = 60*sec
const hour = 60*min
const day = 24*hour


class BaseCache 
{
    constructor(cacheName, expirationTime) {
        this.cacheName = cacheName
        this.expirationTime = expirationTime
        this.loadCacheData()
    }

    updateCache()
    {
        const cacheInfoString = JSON.stringify({
            lastUpdated: new Date().getTime(),
            expirationTime: this.expirationTime
        })
        localStorage.setItem(this.cacheName, cacheInfoString)      
    }

    loadCacheData()
    {
        const dataString = localStorage.getItem(this.cacheName)

        if (dataString)
        {
            const data = JSON.parse(dataString)
            this.lastUpdated = data.lastUpdated
            return
        }

        this.lastUpdated = new Date(null).getTime()
    }
    
    isExpired(){
        const nextUpdate = this.lastUpdated + this.expirationTime
        return (nextUpdate <= new Date().getTime())
    }
}

export class ProfileCache extends BaseCache {
    constructor(){super("profileCache", 5*min)}
}

export class ProjectsCache extends BaseCache {
    constructor(){super("projectCache", 5*min)}
}

export class Latest extends BaseCache {
    // Cache timer for latest Articles and latest Studies
    constructor(){super("latestCache", 5*min)}
}
