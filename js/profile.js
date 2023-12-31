async function profile() 
{
    const url = _URL + '/'
    const data = await getProfile(url)

    if (data == undefined) return
    
    appendProfilePictureSrc(url, data.image)

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
        const default_url = _URL + '/'
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
    
    if (image.includes('https://')) 
    {
        // This will handle s3 images when running in prod
        element.src = image
    }

    // This will append the server's url when running in localhost
    element.src = url + image
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