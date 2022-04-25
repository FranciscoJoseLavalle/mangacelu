const cont = document.querySelector('.cont');
const input = document.querySelector('input');
const carrito = document.querySelector('.carrito');
const carritoTitle = document.querySelector('.carritoImg');
const contadorCont = document.querySelector('.contador');
const vaciar = document.querySelector('.vaciar')

// Productos del carrito
let productos = [];

// Mangas
let mangas = [
      {nombre: 'Bersek', precio: 640, id: 01, imagen: './bersek.jpg'},
      {nombre: 'Boruto', precio: 750, id: 02, imagen: './boruto.jpg'},
      {nombre: 'Naruto', precio: 270, id: 03, imagen: './naruto.jpg'},
      {nombre: 'Nanatsu no Taizai', precio: 730, id: 04, imagen: './nnt.jpg'},
      {nombre: 'Boku no Hero', precio: 510, id: 05, imagen: './bnh.jpg'},
      {nombre: 'Attack on Titan', precio: 645, id: 06, imagen: './aot.jpg'},
      {nombre: 'Dragon Ball', precio: 300, id: 07, imagen: './dbz.jpg'}
  ]
  
class ProductosCarrito {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre,
    this.precio = precio,
    this.imagen = imagen,
    this.id = Date.now()
  }
}
  
document.addEventListener('DOMContentLoaded', escribirHTML);

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
  } else {
    let resultado = [];
    
    mangas.forEach(element => {
      if (element.nombre.toLowerCase().indexOf(valor) !== -1) {
        hacerHTML(element);
      }
    })
}})

function escribirHTML() {
  cont.textContent = '';
  mangas.forEach(element => hacerHTML(element))
}
// Crear el HTML
function hacerHTML(element) {
    const div = document.createElement('div');
    const p = document.createElement('p');
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
  
  p.textContent = `Monto total: $${monto}`;
  
  montoFinal.append(p);
}

// Vaciar carrito
vaciar.onclick = () => {
  productos = [];
  agregarCarrito();
}