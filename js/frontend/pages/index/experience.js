export function loadExperience()
{
    const title = document.querySelector("#xp-title")
    title.textContent = "Experiência Profissional"

    const companyName = document.querySelector("#xp-company-name>a")
    companyName.textContent = "StrawTI"
    companyName.href = "https://strawti.com"
    companyName.target = "_blank"

    const roleDate = document.querySelector("#xp-role-date")
    roleDate.innerHTML = "<i>Desenvolvedor Backend Python</i> - desde Julho de 2023"
    
    const description = document.querySelector("#xp-description")
    description.innerHTML = "Trabalho na criação de novas features e manutenção de uma aplicação web feita em Django REST.<br>Realizo reuniões de alinhamento com a equipe e com o cliente para cumprir as demandas e contribuir com sugestões para o futuro da aplicação.<br>Crio ferramentas para auxiliar em tarefas de rotina.<br>Escrevo código de acordo com as boas práticas de desenvolvimento do ecossistema Python, utilizo técnicas para tornar a aplicação mais performática assim agregando valor ao produto do cliente."

    const viewMore = document.querySelector("#xp-view-more")
    viewMore.textContent = "mais detalhes"
    viewMore.addEventListener('click', () => {
        // toggle techList display type
        const section = document.querySelector("#experience")
        const techList = document.querySelector("#xp-techs")
        if (techList.style.display == "block")
        {
            viewMore.innerHTML = "mais detalhes"
            return techList.style.display = "none"
        }
        viewMore.textContent = "menos detalhes"
        return techList.style.display = "block"

    })

    const techs = getTechs()
    const techList = document.querySelector("#xp-techs")
    techs.forEach(tech => {
        const listItem = document.createElement("li")
        techList.appendChild(listItem)
        
        const techTitle = document.createElement("h4")
        techTitle.innerText = tech.title
        listItem.appendChild(techTitle)

        const techDescription = document.createElement("p")
        techDescription.innerHTML = tech.description
        listItem.appendChild(techDescription)
    })
}

function getTechs()
{
    return [{
        title: "Python & Django | Django REST Framework",
        description: "O backend é feito em Django e expõe uma API REST usando o Django REST."
    },{
        title: "PostgreSQL | PostGIS",
        description: "Banco relacional usado no projeto. PostGIS adiciona suporte a features de geolocalização."
    },{
        title: "MongoDB",
        description: "Banco de dados de documento usado para criação de pipelines que revelam dados úteis para o cliente."
    },{
        title: "Profiling",
        description: "Para controle e redução do uso de recursos do servidor são feitas análises para identificação de gargalos e vazamentos de memória."
    },{
        title: "Testes",
        description: "Criação de testes utilizando a suíte de teste do Django e testes de carga usando Locust."
    },{
        title: "Integração com serviços de terceiros.",
        description: "Integração com <i>FireBase</i>, <i>Twilio<i/> e <i>AWS<i/>"
    },{
        title: "Outras tecnologias usadas",
        description: "<i>Heroku, Bash, GitLab, GitHub, Docker, docker-compose, ClickUp</i>"
    }]
}
