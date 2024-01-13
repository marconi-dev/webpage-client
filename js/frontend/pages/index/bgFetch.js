import { startTransaction, completeTransaction, isTransactionDone  } from "/js/backend/workers/utils.js"
import { Latest, ProjectsCache } from "/js/backend/cache.js"

export function bgFetchArticles()
{
    const name = "articles"
    const cache = new Latest()

    if (!cache.isExpired() && isTransactionDone(name))
        return

    console.log("bg fetching articles")

    startTransaction(name)
    const articlesWorker = new Worker("/js/backend/workers/articles.js", {type: "module"})
    articlesWorker.postMessage(name)

    articlesWorker.onmessage = (message) => {
        console.log("fez")
        if (message.data) completeTransaction(name)
    }
}

export function bgFetchStudies()
{
    const name = "studies"
    const cache = new Latest()

    if (!cache.isExpired() && isTransactionDone(name))
        return

    console.log("bg fetching studies")

    startTransaction(name)
    const studiesWorker = new Worker("/js/backend/workers/studies.js", {type: "module"})
    studiesWorker.postMessage(name)

    studiesWorker.onmessage = (message) => {
        if (message.data) completeTransaction(name)
    }
}

export function bgFetchProjects()
{
    const name = "projects"
    const cache = new ProjectsCache()

    if (!cache.isExpired() && isTransactionDone(name))
        return

    console.log("bg fetching projects")

    startTransaction(name)
    const projectsWorker = new Worker("/js/backend/workers/projects.js", {type: "module"})

    const projIDs = JSON.parse(localStorage.getItem("projIDs"))
    projectsWorker.postMessage(projIDs)

    projectsWorker.onmessage = (message) => {
        if (message.data) completeTransaction(name)
    }
}
