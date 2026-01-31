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
  
  const descriptionSpan = document.createElement("span")
  descriptionSpan.textContent = parameter.description
  
  const amountSpan = document.createElement("span")
  amountSpan.textContent = `Rp ${parseFloat(parameter.amount).toLocaleString('id-ID')}`
  amountSpan.style.fontWeight = "bold"
  
  li.appendChild(descriptionSpan)
  li.appendChild(amountSpan)
  
  listExpenses.appendChild(li)
}

async function render (){

  const listPengeluaranBE = await getExpenses()

  console.log("array",listPengeluaranBE.data.pengeluaran)


  for (let index = 0; index < listPengeluaranBE.data.pengeluaran.length; index++) {
    renderExpenseList(listPengeluaranBE.data.pengeluaran[index])
  }

}

// Modal functionality
const modal = document.getElementById("expense-modal")
const addBtn = document.getElementById("add-expense-btn")
const closeBtn = document.getElementsByClassName("close")[0]
const cancelBtn = document.getElementsByClassName("cancel-btn")[0]

// Open modal
addBtn.onclick = function() {
  modal.style.display = "block"
}

// Close modal when clicking X
closeBtn.onclick = function() {
  modal.style.display = "none"
  document.getElementById("expense-form").reset()
}

// Close modal when clicking Cancel
cancelBtn.onclick = function() {
  modal.style.display = "none"
  document.getElementById("expense-form").reset()
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"
    document.getElementById("expense-form").reset()
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
      // Clear form and close modal
      document.getElementById("expense-form").reset()
      modal.style.display = "none"
      
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