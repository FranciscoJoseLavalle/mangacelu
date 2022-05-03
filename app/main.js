const cont = document.querySelector('.cont');
const input = document.querySelector('input');
const carrito = document.querySelector('.carrito');
const carritoTitle = document.querySelector('.carritoImg');
const carritoBody = document.querySelector('.carritoBody');
const contadorCont = document.querySelector('.contador');
const vaciar = document.querySelector('.vaciar')
const select = document.querySelector('#select');
const options = document.querySelectorAll('option');

// Mangas
let mangas = [
  { nombre: 'Berserk', precio: 640, imagen: './img/bersek.webp' },
  { nombre: 'Boruto', precio: 750, imagen: './img/boruto.webp' },
  { nombre: 'Naruto', precio: 270, imagen: './img/naruto.webp' },
  { nombre: 'Nanatsu no Taizai', precio: 730, imagen: './img/nnt.webp' },
  { nombre: 'Boku no Hero', precio: 510, imagen: './img/bnh.webp' },
  { nombre: 'Attack on Titan', precio: 645, imagen: './img/aot.webp' },
  { nombre: 'Dragon Ball', precio: 300, imagen: './img/dbz.webp' },
  { nombre: 'Gintama', precio: 420, imagen: './img/gintama.webp' },
  { nombre: 'One Piece', precio: 615, imagen: './img/onepiece.webp' },
  { nombre: 'Naruto Shippuden', precio: 840, imagen: './img/narutos.webp' },
  { nombre: 'Jujutsu Kaisen', precio: 355, imagen: './img/jjk.webp' },
  { nombre: 'Kimetsu no Yaiba', precio: 820, imagen: './img/kny.webp' },
  { nombre: "Jojo's Bizarre Adventure", precio: 645, imagen: './img/jojos.webp' },
  { nombre: "Hunter X Hunter", precio: 580, imagen: './img/hxh.webp' },
  { nombre: "Banana Fish", precio: 345, imagen: './img/bananafish.webp' }
]

class ProductosCarrito {
  constructor(nombre, precio, imagen, cantidad = 1) {
    this.nombre = nombre,
      this.precio = precio,
      this.imagen = imagen,
      this.cantidad = cantidad,
      this.id = Date.now()
  }
}

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  objetos = JSON.parse(localStorage.getItem('carrito')) || [];
  escribirHTML();
  agregarCarrito();
});

// Esconder carrito
carritoTitle.addEventListener('click', () => {
  carrito.classList.toggle('ocultar');
})

// Recibir valor del input
input.addEventListener('input', () => {
  let valor = input.value.toLowerCase();
  cont.textContent = '';
  if (valor == '') {
    escribirHTML();
    options.forEach(option => {
      option.disabled = false;
    })
  } else {
    options.forEach(option => {
      option.disabled = true;
    })
    mangas.forEach(element => {
      if (element.nombre.toLowerCase().indexOf(valor) !== -1) {
        hacerHTML(element);
      }
    })
  }
})

// FILTRAR
select.addEventListener('change', () => {
  if (select.value == 'todos') {
    cont.textContent = '';
    mangas.forEach(element => hacerHTML(element))
  } else if (select.value == 'menor') {
    cont.textContent = '';
    let mangasFiltrados = [...mangas];
    mangasFiltrados.sort((a, b) => a.precio - b.precio);
    mangasFiltrados.forEach(element => hacerHTML(element))
  } else if (select.value == 'mayor') {
    cont.textContent = '';
    let mangasFiltrados = [...mangas];
    mangasFiltrados.sort((a, b) => b.precio - a.precio);
    mangasFiltrados.forEach(element => hacerHTML(element))
  }
})

// FUNCIONES
function escribirHTML() {
  cont.textContent = '';
  mangas.forEach(element => hacerHTML(element))
}
let objetos = {};
let elemento;
// Crear el HTML
function hacerHTML(element) {
  const div = document.createElement('div');
  const contenedor = document.createElement('div');
  const p = document.createElement('h3');
  const p2 = document.createElement('p');
  const img = document.createElement('img');
  const contImg = document.createElement('div');
  const btn = document.createElement('button');

  p.textContent = element.nombre;
  img.src = element.imagen;
  btn.textContent = 'Añadir';
  p2.textContent = `$${element.precio}`;

  contenedor.classList.add('contenedorCards')
  contImg.classList.add('contImg');
  div.classList.add('contDiv');


  contImg.append(img);
  div.append(contImg);
  contenedor.append(p);
  contenedor.append(p2);
  contenedor.append(btn);
  div.append(contenedor);



  btn.onclick = () => {
    elemento = new ProductosCarrito(element.nombre, element.precio, element.imagen);

    if (objetos.hasOwnProperty(elemento.nombre)) {
      elemento.cantidad = objetos[elemento.nombre].cantidad + 1;
      console.log('Ya esta agregado')
    }

    objetos[elemento.nombre] = {...elemento}

    cambiarBoton(elemento);

    agregarCarrito();
  }

  cont.append(div);

}

// Cambiar boton al agregar
function cambiarBoton(elemento) {
  if (objetos.hasOwnProperty(elemento.nombre)) {
    console.log('Ya esta agregado')
    // btn.classList.add('agregado')
  } else {
    console.log('Ya no')
    // btn.classList.remove('agregado')
  }
}

// Agregar al carrito
function agregarCarrito() {
  const contador = document.querySelector('.contadorTexto');
  const p = document.createElement('p');
  let numero = 0;
  carritoBody.textContent = '';

  if (objetos != '') {
    carritoTitle.classList.remove('cargados');
    carritoTitle.classList.add('cargado');
    setTimeout(() => {
      carritoTitle.classList.remove('cargado');
      carritoTitle.classList.add('cargados');
    }, 1500)
    for (objeto in objetos) {
      numero = 0;
      let objetosContador= Object.values(objetos);
      objetosContador.forEach(elementos => {
        numero+= elementos.cantidad;
      })
    }
  } else {
    carritoTitle.classList.remove('cargado');
    carritoBody.textContent = 'Carrito vacío...';
  }
  contador.textContent = '';
  p.textContent = numero;
  contador.append(p);
  contadorCont.textContent = ''
  contadorCont.append(contador);

  for (objeto in objetos){
    carritoBody.textContent = '';
    let objetosMostrados = Object.values(objetos);

    objetosMostrados.forEach(element => {
  
      const contenedorCarrito = document.createElement('tr');
      const imagenTabla = document.createElement('td');
      const imagen = document.createElement('img');
      const tituloTabla = document.createElement('td');
      const precioTabla = document.createElement('td');
      const cantidadTablaCont = document.createElement('td');
      const cantidadTabla = document.createElement('p');
      const btnCont = document.createElement('td');
      const btn = document.createElement('p');
      btn.textContent = 'X';
      btn.classList.add('btn');
      btnCont.append(btn);
      imagenTabla.classList.add('imgContainer');
      cantidadTablaCont.classList.add('cantidadTablaCont')
  
      tituloTabla.textContent = element.nombre;
      precioTabla.textContent = `$${element.precio}`;
      cantidadTabla.textContent = element.cantidad;
      cantidadTablaCont.append(cantidadTabla);
      imagenTabla.append(imagen);
      imagen.src = element.imagen;
      contenedorCarrito.append(imagenTabla);
      contenedorCarrito.append(tituloTabla);
      contenedorCarrito.append(precioTabla);
      contenedorCarrito.append(cantidadTablaCont);
      contenedorCarrito.append(btnCont);
  
      carritoBody.append(contenedorCarrito);
      btn.onclick = () => {
        eliminarCarrito(element)
        
        agregarCarrito();
      }
      
      if (element.cantidad >= 1) {
        const btnContSR = document.createElement('div')
        const sumar = document.createElement('button');
        const restar = document.createElement('button');
        sumar.classList.add('sumar');
        restar.classList.add('restar');
        btnContSR.classList.add('botonCont')
        sumar.textContent = '+';
        restar.textContent = '-';
        btnContSR.append(sumar);
        btnContSR.append(cantidadTabla)
        btnContSR.append(restar);
        cantidadTablaCont.append(btnContSR);

        sumar.addEventListener('click', () => {
          element.cantidad++;
          agregarCarrito();
        })
        restar.addEventListener('click', () => {
          element.cantidad--;
          if (element.cantidad <= 0) {
            delete objetos[element.nombre];
          }
          cambiarBoton(elemento);
          agregarCarrito();
        })

        let monto = element.cantidad * element.precio;
        precioTabla.textContent = monto;
      }
    })

  }
  localStorage.setItem('carrito', JSON.stringify(objetos));
  sumarPrecio();
}

// Eliminar producto del carrito
function eliminarCarrito(element) {
  if (objetos.hasOwnProperty(objeto)) {
    element.cantidad = 0;
  }

  if (element.cantidad <= 0) {
    delete objetos[element.nombre];
  }
}

// Sumar el monto final
function sumarPrecio() {
  const montoFinal = document.querySelector('.montoFinal');
  const p = document.createElement('p');
  let monto = 0;
  montoFinal.textContent = '';
  for (objeto in objetos) {
    monto = 0;
    let objetosMonto = Object.values(objetos);
    objetosMonto.forEach(elements => {
      monto+= elements.precio*elements.cantidad;
    })
  }

  p.textContent = `Total: $${monto}`;

  montoFinal.append(p);
}

// Vaciar carrito
vaciar.onclick = () => {
  objetos = {};
  agregarCarrito();
}