import {profileData} from "/js/backend/data/profile.js"
import loading from "/js/frontend/components/loading.js"


export async function loadProfile()
{
    const data = await loadData()
    
    const profilePic = document.querySelector("#profile-pic")
    profilePic.src = data.image

    const profileName = document.querySelector("#profile-name")
    profileName.textContent = data.name

    const profileSentence = document.querySelector("#profile-sentence>q")
    profileSentence.textContent = "O sonho das pessoas não tem fim"

    const titles = document.querySelector("#profile-titles")
    titles.textContent = data.titles

    const aboutMeLink = document.querySelector("#profile-about-me-link")
    aboutMeLink.textContent = "saiba mais sobre mim"
    
    const linksList = document.querySelector("#profile-links-list")
    data.links.forEach((link) => {
        const linkLI = document.createElement("li")
        const linkAnchor = document.createElement("a")
        linkAnchor.href = link.url
        linkAnchor.textContent = link.name
        linkAnchor.target = "_blank"

        linkLI.appendChild(linkAnchor)
        linksList.appendChild(linkLI)
    })
}

async function loadData()
// Add a loading effect and return profile data
{
    const [loadingItem, main] = loading()
    const data = await profileData()
    loadingItem.remove()    
    main.style.display = "block"
    return data
}
