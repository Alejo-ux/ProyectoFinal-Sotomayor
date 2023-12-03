const pintarCarrito = () => {
  modalContainer.innerHTML = ""
  modalContainer.style.display = "flex"

  const modalHeader = document.createElement("div")
  modalHeader.className = "modal-header"
  modalHeader.innerHTML = `
      <h1 class="modal.header-tittle">Carrito.</h1>
     `


  modalContainer.append(modalHeader)

  const modalButton = document.createElement("h1")
  modalButton.innerText = "X"
  modalButton.className = "modal-header-button"

  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none"
  })

  modalHeader.append(modalButton)

  if (carrito.length > 0) {
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div")
      carritoContent.className = "modal-content"
      carritoContent.innerHTML = `
     <img src = "${product.img}">
     <h3>${product.nombre}</h3>
     <p>${product.precio} $</p>
     <span class="restar" > - </span>
     <p> cantidad: ${product.cantidad}</p>
     <span class="sumar" > + </span>
     <p> total: ${product.cantidad * product.precio}</p>
     <span class="delete-product" > ❌ </span>

  `

      modalContainer.append(carritoContent)


      let restar = carritoContent.querySelector(".restar")

      restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
          product.cantidad--
        }
        saveLocal()
        pintarCarrito()
      })

      let sumar = carritoContent.querySelector(".sumar")

      sumar.addEventListener("click", () => {
        product.cantidad++
        saveLocal()
        pintarCarrito()
      })

      let eliminar = carritoContent.querySelector(".delete-product")

      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id)
      })

      //let eliminar = document.createElement("span")
      //eliminar.innerText = "❌"
      //eliminar.className = "delete-product"
      //carritoContent.append(eliminar)

      //eliminar.addEventListener("click", eliminarProducto)
    })

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
    const totalTodo = document.createElement("div")
    totalTodo.className = "total-content"
    totalTodo.innerHTML = `total a pagar: ${total} $`
    modalContainer.append(totalTodo)
  }else{
    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
   <p>No hay nada en el carrito. Agrega productos para visualizarlos!</p>

`
    modalContainer.append(carritoContent)
  }

}

verCarrito.addEventListener("click", pintarCarrito)
const eliminarProducto = (id) => {
  Swal.fire({
    title: "Estas seguro de eliminar el producto del carrito?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Si",
    denyButtonText: `No`
  }).then((result) => {
    if (result.isConfirmed) {
      const foundId = carrito.find((element) => element.id === id)

      carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
      })
      carritoCounter()
      saveLocal()
      pintarCarrito()
      Swal.fire("Se quito con exito", "", "info");
    }
  })

}

const carritoCounter = () => {
  cantidadCarrito.style.display = "block"
  const carritoLength = carrito.length

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))

}
carritoCounter()