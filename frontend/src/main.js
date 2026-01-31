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

async function updateExpense(id, description, amount) {
  const response = await fetch(
    `http://localhost:3100/api/expenses/${id}`,
    {
      method: "PUT",
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

async function deleteExpense(id) {
  const response = await fetch(
    `http://localhost:3100/api/expenses/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }
  )

  const result = await response.json()
  console.log(result)
  return result
}

// Get DOM elements
const listExpenses = document.getElementById("expense-list")

// Modal functions
function openAddModal() {
  document.getElementById("expense-form").reset()
  delete document.getElementById("expense-form").dataset.expenseId
  document.querySelector("#expense-modal h2").textContent = "Tambah Pengeluaran"
  document.querySelector("#expense-form button[type='submit']").textContent = "Tambah Pengeluaran"
  modal.style.display = "block"
}

function openEditModal(expense) {
  document.getElementById("description").value = expense.description
  document.getElementById("amount").value = expense.amount
  document.getElementById("expense-form").dataset.expenseId = expense.id
  document.querySelector("#expense-modal h2").textContent = "Edit Pengeluaran"
  document.querySelector("#expense-form button[type='submit']").textContent = "Update Pengeluaran"
  modal.style.display = "block"
}

function renderExpenseList (parameter) {
  const li = document.createElement("li")
  
  // Create content container
  const contentDiv = document.createElement("div")
  contentDiv.className = "expense-content"
  
  const descriptionSpan = document.createElement("span")
  descriptionSpan.textContent = parameter.description
  
  const amountSpan = document.createElement("span")
  amountSpan.textContent = `Rp ${parseFloat(parameter.amount).toLocaleString('id-ID')}`
  amountSpan.style.fontWeight = "bold"
  
  contentDiv.appendChild(descriptionSpan)
  contentDiv.appendChild(amountSpan)
  
  // Create edit button
  const editBtn = document.createElement("button")
  editBtn.className = "edit-btn"
  editBtn.textContent = "Edit"
  editBtn.onclick = () => openEditModal(parameter)
  
  // Create delete button
  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete-btn"
  deleteBtn.textContent = "Delete"
  deleteBtn.onclick = () => handleDelete(parameter.id, parameter.description)
  
  li.appendChild(contentDiv)
  li.appendChild(editBtn)
  li.appendChild(deleteBtn)
  
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
  openAddModal()
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
  const expenseId = document.getElementById("expense-form").dataset.expenseId
  
  try {
    let result
    
    if (expenseId) {
      // Update existing expense
      result = await updateExpense(expenseId, description, amount)
      if (result.status === 'OK') {
        alert("Pengeluaran berhasil diubah!")
      } else {
        alert("Gagal mengubah pengeluaran")
      }
    } else {
      // Add new expense
      result = await addExpense(description, amount)
      if (result.status === 'OK') {
        alert("Pengeluaran berhasil ditambahkan!")
      } else {
        alert("Gagal menambahkan pengeluaran")
      }
    }
    
    if (result.status === 'OK') {
      // Clear form and close modal
      document.getElementById("expense-form").reset()
      delete document.getElementById("expense-form").dataset.expenseId
      modal.style.display = "none"
      
      // Refresh the expense list
      listExpenses.innerHTML = "" // Clear current list
      await render() // Re-render the list
    }
  } catch (error) {
    console.error("Error saving expense:", error)
    alert("Terjadi kesalahan saat menyimpan pengeluaran")
  }
})

async function handleDelete(id, description) {
  if (confirm(`Apakah Anda yakin ingin menghapus pengeluaran "${description}"?`)) {
    try {
      const result = await deleteExpense(id)
      if (result.status === 'OK') {
        alert("Pengeluaran berhasil dihapus!")
        // Refresh the expense list
        listExpenses.innerHTML = "" // Clear current list
        await render() // Re-render the list
      } else {
        alert("Gagal menghapus pengeluaran")
      }
    } catch (error) {
      console.error("Error deleting expense:", error)
      alert("Terjadi kesalahan saat menghapus pengeluaran")
    }
  }
}

render()