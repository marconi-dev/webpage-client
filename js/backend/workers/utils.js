
// transactions
export function startTransaction(name)
{
    localStorage.setItem(`${name}Transaction`, "pending")
}

export function completeTransaction(name)
{
    localStorage.setItem(`${name}Transaction`, "done")
}

export function isTransactionDone(name)
{
    const txStatus = localStorage.getItem(`${name}Transaction`)
    return txStatus === "done"
}
