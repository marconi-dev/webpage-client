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
