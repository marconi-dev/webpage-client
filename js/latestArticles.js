async function latestArticles() 
{
    const data = await getLatestArticles()

    if (data == undefined) return
    console.log(data)
    
    const articlesContainer = document.querySelector("#articles-container")
    data.forEach(article => {
        const articleItem = document.createElement('div')
        articleItem.style.marginBottom = "20px"
        
        const articleDate = document.createElement('small')
        articleDate.style.fontSize = "0.7rem"
        articleDate.textContent = formatDate(article.created_at)
        articleItem.appendChild(articleDate)

        const articleTitle = document.createElement('h4')
        articleTitle.style.marginTop = "0px"
        articleTitle.textContent = article.title
        articleItem.appendChild(articleTitle)

        const articleDescription = document.createElement('p')
        articleDescription.textContent = article.description
        articleDescription.style.margin = "-20px 0 0 0"
        articleItem.appendChild(articleDescription)

        const readArticle = document.createElement('a')
        readArticle.textContent = 'ler artigo'
        readArticle.href = article.url 
        readArticle.target = '_blank'
        articleItem.appendChild(readArticle)

        articlesContainer.appendChild(articleItem)
    })
}

async function getLatestArticles()
{ 
    if (cacheIsExpired('latestArticles')) 
    {
        const default_url = _URL + '/articles/latest/'
        const data = await getData(default_url)
        setCache('latestArticles', data)
        return data
    }

    const storageData = localStorage.getItem('latestArticles')
    const data = JSON.parse(storageData)
    return data
}
