let fistTimeLoading = true;


// doing this way to avoid mailing bots 
function contactEmail(){
  let res = ""
  const slices = ["marconi.developer","@","outlook",".com.br"]
  slices.forEach(slice => res+=slice)
  
  const btn = document.querySelector("button#mail-me")
  btn.onclick = (e) => {
    navigator.clipboard.writeText(res);
    e.target.innerText = 'copiado!'
    setTimeout(() => e.target.innerText = 'copiar email', 3000) // reseting mail-me
  }
}
contactEmail()

function quotes() {
  const quotes = [
    "Caos, eficiência & simplicidade.",
    "Pizza, Pão de queijo, mexido.",
    "Seja alguém, não importa quem.",
    "O sonho das pessoas não tem fim.",
    "Minecraft, Skyrim, Dark Souls II",
    "Esconder a bagunça não é arrumar a bagunça.",
    "Na máquina do cliente o processamento é de graça.",
    "Um programa é sua capacidade de passar nos testes.",
    "Abraçe a 2ª lei da termodinamica, pois você não vai vencê-la.",
    "Task no board, é task pronta. <small>(É sério, bota no board tudo que importa.)</small>",
  ]

  const interval = 3 * 1000
  setInterval(() => {
    let randIdx = Math.floor(Math.random() * quotes.length);
    document.querySelector("#profile-quote").innerHTML = quotes[randIdx]
  }, interval)
}
quotes()


function filterSkills() {
  const skillsData = [
    {
      id: "python",
      title: "Python",
      description: "Linguagem de programação"
    },
    {
      id: "sql",
      title: "SQL",
      description: "Linguagem de pesquisa usada em bancos de dados relacionais."
    },
    {
      id: "postgresql",
      title: "PostgreSQL",
      description: "Banco de dados relacional."
    },
    {
      id: "html",
      title: "HTML",
      description: "Linguagem de marcação."
    },
    {
      id: "javascript js",
      title: "JavaScript",
      description: "Linguagem de scripts para web."
    },
    {
      id: "golang",
      title: "Golang",
      description: "Linguagem de programação."
    },
    {
      id: "linux",
      title: "Linux",
      description: "Sistema operacional."
    },
    {
      id: "bash",
      title: "Bash",
      description: "Usado para automatizar tarefas em ambientes Linux."
    },
    {
      id: "rabbitmq",
      title: "RabbitMQ",
      description: "Sistema de filas."
    },
    {
      id: "mongodb",
      title: "MongoDB",
      description: "Banco de dados de documentos."
    },
    {
      id: "redis",
      title: "Redis",
      description: "Banco de dados chave-valor."
    },
    {
      id: "dart",
      title: "Dart",
      description: "Linguagem de programação."
    },
    {
      id: "flutter",
      title: "Flutter",
      description: "Framework para criação de aplicativos mobile."
    },
    {
      id: "django",
      title: "Django",
      description: "Framework para criação de aplicações web."
    },
    {
      id: "django-rest-framework drf",
      title: "Django REST Framework",
      description: "Framework para criação de APIs REST."
    },
    {
      id: "docker",
      title: "Docker",
      description: "Tecnologia de conteinerização."
    },
    {
      id: "css",
      title: "CSS",
      description: "Linguagem de estilização."
    },
    {
      id: "websocket",
      title: "WebSockets",
      description: "Tecnologia para sistema com atualização em tempo real."
    },
    {
      id: "webrtc",
      title: "WebRTC",
      description: "Tecnologia para sistema P2P."
    },
    {
      id: "git",
      title: "GIT",
      description: "Software de versionamento de código.",
    },
    {
      id: "amazon-web-services aws",
      title: "Amazon Web Services (AWS)",
      description: "Serviço de computação em nuvem.",
    },
    {
      id: "google-cloud-platform gcp",
      title: "Google Cloud Platform (GCP)",
      description: "Serviço de computação em nuvem.",
    }
  ];

  const input = document.querySelector("#search-skills")
  input.onchange = e => {
    const val = e.target.value.trim()
    const filteredSkills = skillsData.filter((skill) => skill.id.includes(val.toLowerCase()))

    const skillsList = document.querySelector("#skills-list")
    skillsList.innerHTML = '' // reseting skills-list

    filteredSkills.forEach(skill => {
      const skillItem = document.createElement("li")
      skillItem.id = skill.id
      skillItem.innerHTML = `<h3>${skill.title}</h3><p>${skill.description}</p>`
      skillsList.appendChild(skillItem)
    });
    console.log(filteredSkills)
  }
}
filterSkills()
