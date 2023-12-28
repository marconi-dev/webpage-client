const params = new URLSearchParams(window.location.search)
const projID = params.get('proj')
if (projID == "undefined")
{
    document.body.innerHTML = "\
        <h1>:(</h1>\
        <h2>Parece que o link usado está quebrado...</h2>\
        <a href='/index.html'>voltar</a>\
    "
}