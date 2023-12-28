
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

function appendName(name)
{
    const element = document.querySelector("h1#profile-name")
    element.textContent = name
}

function appendTitles(titles) 
{
    const element = document.querySelector("h3#profile-titles")
    element.textContent = titles
}


function appendLinks(links) 
{
    const ul = document.querySelector("ul#profile-links-list")
    links.forEach(link => {
        const listItem = document.createElement('li')
        listItem.style.marginTop = "10px"
        
        const linkAnchor = document.createElement('a')
        linkAnchor.href = link.url
        linkAnchor.text = link.name
        linkAnchor.target = "_blank"

        listItem.appendChild(linkAnchor)
        ul.appendChild(listItem)
    })
}


async function profile() 
{
    const url = _URL + '/'
    const data = await getData(url)

    if (data == undefined) return
    
    appendProfilePictureSrc(url, data.image)
    appendName(data.name)
    appendTitles(data.titles)
    appendLinks(data.links)
}
