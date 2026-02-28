document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Control del Menú Móvil
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Lector Dinámico de Productos (Para el Catálogo)
    const contenedorProductos = document.getElementById('contenedor-productos');
    
    if (contenedorProductos) {
        cargarInventario();
    }

    async function cargarInventario() {
        try {
            const respuesta = await fetch('inventario.csv');
            const datos = await respuesta.text();
            
            // Elimina la primera fila de encabezados
            const lineas = datos.split('\n').slice(1);
            
            let htmlProductos = '';

            lineas.forEach(linea => {
                if (linea.trim() === '') return;
                
                // Extrae datos asumiendo columnas: ID, Categoria, Nombre, Descripcion, Precio, Imagen
                const [id, categoria, nombre, descripcion, precio, imagen] = linea.split(',');

                htmlProductos += `
                    <div class="tarjeta-categoria">
                        <img src="productos/${imagen.trim()}" alt="${nombre}">
                        <span style="font-size: 0.8rem; color: #888; text-transform: uppercase;">${categoria}</span>
                        <h3 style="margin: 10px 0; color: var(--negro-mate);">${nombre}</h3>
                        <p style="font-size: 0.9rem; margin-bottom: 15px;">${descripcion}</p>
                        <p style="font-size: 1.2rem; font-weight: bold; color: var(--oro); margin-bottom: 15px;">$${precio} MXN</p>
                        <a href="https://wa.me/527228603383?text=Hola,%20me%20interesa%20comprar%20el%20producto:%20${nombre}" target="_blank" class="btn-principal">Pedir por WhatsApp</a>
                    </div>
                `;
            });

            contenedorProductos.innerHTML = htmlProductos;

        } catch (error) {
            console.error("Error al cargar el inventario:", error);
            contenedorProductos.innerHTML = '<p>Error al cargar el catálogo de productos. Verifique la conexión o intente más tarde.</p>';
        }
    }
});