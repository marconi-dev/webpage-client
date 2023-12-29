const params = new URLSearchParams(window.location.search)
const projID = params.get('proj')

if (projID == "undefined")
{
    document.body.innerHTML = "\
        <h1>:(</h1>\
        <h2>Parece que o link usado está quebrado...</h2>\
        <a href='/index.html'>voltar</a>\
    "
}

async function getProjectDetail()
{
    if (projectCacheIsExpired(projID))
    {
        const defaultUrl = _URL + `/projects/${projID}`
        const data = await getData(defaultUrl)
        setProjectCache(projID, data)
        return data
    }

    const dataStorage = localStorage.getItem(projID)
    return JSON.parse(dataStorage)
}

getProjectDetail()