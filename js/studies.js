async function latestStudies() 
{
    const data = await getLatestStudies()

    if (data == undefined) return
    
    const studiesContainer = document.querySelector("#studies-container")
    data.forEach(study => {
        const studyItem = document.createElement("div")
        studyItem.style.marginBottom = "20px"
        
        const studyDate = document.createElement('small')
        studyDate.style.fontSize = "0.7rem"
        studyDate.textContent = formatDate(study.created_at)
        studyItem.appendChild(studyDate)

        const studyTitle = document.createElement('h4')
        studyTitle.style.marginTop = "0px"
        studyTitle.textContent = study.title
        studyItem.appendChild(studyTitle)
        studiesContainer.appendChild(studyItem)

        const studyDescription = document.createElement('p')
        studyDescription.textContent = study.description
        studyDescription.style.margin = "-20px 0 0 0"
        studyItem.appendChild(studyDescription)

        const playStudy = document.createElement('a')
        playStudy.textContent = 'saiba mais'
        playStudy.href = study.url 
        playStudy.target = '_blank'
        studyItem.appendChild(playStudy)
    })
}

async function getLatestStudies()
{ 
    if (cacheIsExpired('latestStudies')) 
    {
        const defaultUrl = _URL + '/studies/latest/'
        const data = await getData(defaultUrl)
        setCache('latestStudies', data)
        return data
    }

    const storageData = localStorage.getItem('latestStudies')
    const data = JSON.parse(storageData)
    return data
}