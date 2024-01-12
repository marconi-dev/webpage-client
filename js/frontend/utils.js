export function putURLParam(param, value)
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

export function formatDate(dateString)
/* 
    examples:
        2023-11-05 -> NOV/2023
        2004-3-20  -> MAR/2004
        
*/
{
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.toLocaleDateString('pt-BR', {month: 'long'})
    return `${month.substring(0, 3).toUpperCase()}/${year}`
}
