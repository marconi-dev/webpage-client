function formatDate(dateString)
/* 
    examples:
        2023-11-05 -> NOV/2023
        2004-3-20  -> MAR/2004
        
*/
{
    const date  = new Date(dateString)
    const year  = date.getFullYear()
    const month = date.toLocaleDateString('pt-BR', {month: 'long'})
    return `${month.substring(0, 3).toUpperCase()}/${year}`
}

async function getData(url) 
{
  const response = await fetch(url)
  const data = await response.json()
  return data
}

function getImageURL(imageURL)
// Fetch image from local server or external source
{
    if (imageURL === null) return
    
    if (imageURL.includes('https://')) 
    {
        // This will handle images when running in prod
        return imageURL
    }

    // This will append the server's url when running in localhost
    return _URL + imageURL
}

function setQueryParam(param, value)
{
    const currentURL = new URL(window.location.href)
    currentURL.searchParams.set(param, value)
   
    if (Array.isArray(value))
    {
        // clean old params
        for (const key of currentURL.searchParams.keys())
            if (key == param) currentURL.searchParams.delete(key)

        value.forEach((item) => {
            currentURL.searchParams.append(param, item)
        })
    }

    const newURL = currentURL.toString()
    window.history.replaceState({ path: newURL }, '', newURL)
}