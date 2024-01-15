export default function notFound()
{
    const h1 = document.createElement("h1")
    h1.textContent = "Não encontrado!"
    document.querySelector("section").appendChild(h1)
    
    const a = document.createElement("a")
    a.href = "/index.html#projects"
    a.textContent = "voltar"
    document.querySelector("section").appendChild(a)
}
