import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addProduct(id: string){
    console.log("Se agregó el producto " + id);
  }

  remove(id: string){
    console.log("Se quitó el producto " + id);
  }

  clear(){
    console.log("El carrito está vacio");
  }

  getCartProducts(){
    console.log("Aqui muestro los productos del cart");
  }
}
