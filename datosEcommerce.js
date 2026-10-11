const getDataAPI = async () => {
    const productsContainer = document.querySelector("#productos")
    const statusMessage = document.querySelector("#productos-estado")
    const loadButton = document.querySelector("#btn-cargar-productos")

    if (!productsContainer) {
        console.error("No se encontró el contenedor #productos en index.html")
        return
    }

    try {
        if (statusMessage) statusMessage.textContent = "Consultando API..."
        if (loadButton) loadButton.disabled = true

        const request = await fetch("https://fakestoreapi.com/products")

        if (!request.ok) {
            throw new Error(`Error al consultar productos: ${request.status}`)
        }

        const products = await request.json()

        if (!Array.isArray(products)) {
            throw new Error("La respuesta de la API no tiene el formato esperado.")
        }

        productsContainer.replaceChildren()

        products.forEach((product) => {
            const item = document.createElement("article")
            item.className = "product-item"

            const image = document.createElement("img")
            image.className = "product-image"
            image.src = product.image
            image.alt = product.title

            const details = document.createElement("div")
            details.className = "product-details"

            const title = document.createElement("h3")
            title.className = "product-title"
            title.textContent = product.title

            const category = document.createElement("p")
            category.className = "product-category"
            category.textContent = product.category

            const price = document.createElement("p")
            price.className = "product-price"
            price.textContent = new Intl.NumberFormat("es-EC", {
                style: "currency",
                currency: "USD"
            }).format(product.price)

            details.append(title, category, price)
            item.append(image, details)
            productsContainer.append(item)
        })

        if (statusMessage) statusMessage.textContent = `${products.length} productos recibidos`

    } catch (error) {
        productsContainer.replaceChildren()
        if (statusMessage) statusMessage.textContent = "Error al conectar con la API"
        console.error(error)
    } finally {
        if (loadButton) loadButton.disabled = false
    }
}

document.querySelector("#btn-cargar-productos")?.addEventListener("click", getDataAPI)
getDataAPI()