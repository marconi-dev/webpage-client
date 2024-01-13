import {DB} from "/js/backend/data/main.js"
import {baseURL} from "/js/settings.js"

onmessage = async (message) => {
    const articlesURL = baseURL + "/v1/articles/"
    const res = await fetch(articlesURL)
    const data = await res.json()
    await DB.articles.bulkPut(data)
    postMessage(true)
}
