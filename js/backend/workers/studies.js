import {DB} from "/js/backend/data/main.js"
import {baseURL} from "/js/settings.js"

onmessage = async (message) => {
    const studiesURL = baseURL + "/v1/studies/"
    const res = await fetch(studiesURL)
    const data = await res.json()
    await DB.studies.bulkPut(data)
    postMessage(true)
}
