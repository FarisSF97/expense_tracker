async function getExpenses (){
  const data = await fetch(
    "http://localhost:3000/api/expenses",
    {
      method: "GET",
    }
  )

  const dataObj = await data.json()

  console.log(dataObj)

  return dataObj;
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

render()