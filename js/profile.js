async function profile() 
{
    const data = await getProfile(  )

    if (data == undefined) return
    
    appendProfilePictureSrc(_URL, data.image)

    const name = document.querySelector("h1#profile-name")
    name.textContent = data.name

    const titles = document.querySelector("h3#profile-titles")
    titles.textContent = data.titles

    appendLinks(data.links)
}

async function getProfile(url) 
{
    if (cacheIsExpired('profile')) 
    {
        const default_url = _URL + '/profile/'
        const data = await getData(default_url)
        setCache('profile', data)
        return data
    }

    const storageData = localStorage.getItem('profile')
    const data = JSON.parse(storageData)
    return data
}

function appendProfilePictureSrc(url, image) 
{
    if (image === null) return
    const element = document.querySelector("img#profile-picture")
    element.src = getImageURL(image)
}

function appendLinks(links) 
{
    const ul = document.querySelector("ul#profile-links-list")
    links.forEach(link => {
        const listItem = document.createElement('li')
        listItem.style.marginTop = "10px"
        listItem.style.marginRight = "5px"
        
        const linkAnchor = document.createElement('a')
        linkAnchor.href = link.url
        linkAnchor.text = link.name
        linkAnchor.target = "_blank"

        listItem.appendChild(linkAnchor)
        ul.appendChild(listItem)
    })
}