async function getExpenses (){
  const data = await fetch(
    "http://localhost:3100/api/expenses",
    {
      method: "GET",
    }
  )

  const dataObj = await data.json()

  console.log(dataObj)

  return dataObj;
}

async function addExpense(description, amount) {
  const response = await fetch(
    "http://localhost:3100/api/expenses",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        amount: parseFloat(amount)
      })
    }
  )

  const result = await response.json()
  console.log(result)
  return result
}

const listExpenses = document.getElementById("expense-list")

console.log(listExpenses)

function renderExpenseList (parameter) {

  const li = document.createElement("li")

  li.textContent = `${parameter.description} | ${parameter.amount}`

  listExpenses.appendChild(li)

}

async function render (){

  const listPengeluaranBE = await getExpenses()

  console.log("array",listPengeluaranBE.data.pengeluaran)


  for (let index = 0; index < listPengeluaranBE.data.pengeluaran.length; index++) {
    renderExpenseList(listPengeluaranBE.data.pengeluaran[index])
  }

}

// Handle form submission
document.getElementById("expense-form").addEventListener("submit", async (e) => {
  e.preventDefault()
  
  const description = document.getElementById("description").value
  const amount = document.getElementById("amount").value
  
  try {
    const result = await addExpense(description, amount)
    
    if (result.status === 'OK') {
      // Clear form
      document.getElementById("expense-form").reset()
      
      // Refresh the expense list
      listExpenses.innerHTML = "" // Clear current list
      await render() // Re-render the list
      
      alert("Pengeluaran berhasil ditambahkan!")
    } else {
      alert("Gagal menambahkan pengeluaran")
    }
  } catch (error) {
    console.error("Error adding expense:", error)
    alert("Terjadi kesalahan saat menambahkan pengeluaran")
  }
})

render()