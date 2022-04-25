const cont = document.querySelector('.cont');
const input = document.querySelector('input');
const carrito = document.querySelector('.carrito');
const carritoTitle = document.querySelector('.carritoImg');
const contadorCont = document.querySelector('.contador');
const vaciar = document.querySelector('.vaciar')
const select = document.querySelector('#select');
const options = document.querySelectorAll('option');

// Productos del carrito
let productos = [];

// Mangas
let mangas = [
  { nombre: 'Bersek', precio: 640, imagen: './img/bersek.webp' },
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
  constructor(nombre, precio, imagen) {
    this.nombre = nombre,
      this.precio = precio,
      this.imagen = imagen,
      this.id = Date.now()
  }
}

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  productos = JSON.parse(localStorage.getItem('carrito')) || [];
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

select.addEventListener('change', () => {
  if (select.value == 'todos') {
    cont.textContent = '';
    mangas.forEach(element => hacerHTML(element))
  } else if (select.value == 'menor') {
    cont.textContent = '';
    let mangasFiltrados = [...mangas];
    mangasFiltrados.sort((a,b) => a.precio - b.precio);
    mangasFiltrados.forEach(element => hacerHTML(element))
  } else if (select.value == 'mayor') {
    cont.textContent = '';
    let mangasFiltrados = [...mangas];
    mangasFiltrados.sort((a,b) => b.precio - a.precio);
    mangasFiltrados.forEach(element => hacerHTML(element))
  }
})

// FUNCIONES
function escribirHTML() {
  cont.textContent = '';
  mangas.forEach(element => hacerHTML(element))
}
// Crear el HTML
function hacerHTML(element) {
  const div = document.createElement('div');
  const p = document.createElement('h3');
  const p2 = document.createElement('p');
  const img = document.createElement('img');
  const contImg = document.createElement('div');
  const btn = document.createElement('button');

  p.textContent = element.nombre;
  img.src = element.imagen;
  btn.textContent = 'Añadir';
  p2.textContent = `$${element.precio}`;

  div.classList.add('contDiv');


  contImg.append(img);
  div.append(p);
  div.append(contImg);
  div.append(p2);
  div.append(btn);


  btn.onclick = () => {
    let elemento = new ProductosCarrito(element.nombre, element.precio, element.imagen)
    productos.push(elemento);
    agregarCarrito();
  }

  cont.append(div);

}

// Agregar al carrito
function agregarCarrito() {
  const contador = document.querySelector('.contadorTexto');
  contador.textContent = 0;
  carrito.textContent = '';

  if (productos != '') {
    carritoTitle.classList.add('cargado');
    for (producto in productos) {
      contador.textContent++
    }
  } else {
    carritoTitle.classList.remove('cargado');
    carrito.textContent = 'Carrito vacío...'
  }
  contadorCont.textContent = ''
  contadorCont.append(contador);


  productos.forEach(element => {
    let id = element.id;
    const container = document.createElement('div');
    const nombre = document.createElement('p');
    nombre.textContent = element.nombre;
    const img = document.createElement('img');
    img.src = element.imagen;
    const btn = document.createElement('p');
    btn.textContent = 'X';
    btn.classList.add('btn');
    const precio = document.createElement('p');
    precio.textContent = `$${element.precio}`;

    container.append(img);
    container.append(nombre);
    container.append(precio);
    container.append(btn);

    carrito.append(container);

    btn.onclick = () => {
      productos = productos.filter(elements => elements.id !== id);
      agregarCarrito();
    }
  })
  localStorage.setItem('carrito', JSON.stringify(productos));
  sumarPrecio();
}

// Sumar el monto final
function sumarPrecio() {
  const montoFinal = document.querySelector('.montoFinal');
  const p = document.createElement('p');
  let monto = 0;
  montoFinal.textContent = '';
  for (let i = 0; i < productos.length; i++) {
    monto += productos[i].precio;
  }

  p.textContent = `Total: $${monto}`;

  montoFinal.append(p);
}

// Vaciar carrito
vaciar.onclick = () => {
  productos = [];
  agregarCarrito();
}