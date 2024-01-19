import {baseURL} from "/js/settings.js";
import {DB} from "/js/backend/data/main.js";
import {Latest} from "/js/backend/cache.js";

async function fetchLatest(relativeURL)
{
    const latestItemURL = baseURL + relativeURL
    const res = await fetch(latestItemURL)
    const data = await res.json()
    data.forEach((item, index) => {
        item.id = index+1
    })
    return data
}

async function latestData()
// fetch and save both latest values
{
    const cache = new Latest()

    if (cache.isExpired())
    {
        cache.updateCache()
        // studies
        const studiesDBData = await fetchLatest("/v1/studies/latest/")
        await DB.latestStudies.bulkPut(studiesDBData)
        const studies = await DB.latestStudies.toArray()

        // articles
        const articlesDBData = await fetchLatest("/v1/articles/latest/")
        await DB.latestArticles.bulkPut(articlesDBData)
        const articles = await DB.latestArticles.toArray()

        return {studies: studies, articles: articles}
    }

    const studies = await DB.latestStudies.toArray()
    const articles = await DB.latestArticles.toArray()
    return {studies: studies, articles: articles}
}

export async function latestStudiesData()
// to keep patterns
{
    const data = await latestData()
    return data.studies
}

export async function latestArticlesData()
// to keep patterns
{
    const data = await latestData()
    return data.articles
}
