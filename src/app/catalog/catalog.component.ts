import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../catalog/catalog.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {


  products: any;
  filter: string = '';
  //private cartSvc: CartService = inject(CartService);  //Otra manera de injectar el servicio sin utlisar el constructor (pero tiene problemas con las pruebas unitarias)

  constructor(private cartSvc: CartService, 
              private productSvc: ProductService,
              private router: Router,
              private route:ActivatedRoute) {
    
  }

  ngOnInit(): void { //Lugar tipico para hacer las llamadas de http 
    this.productSvc.getProducts().subscribe(
      products => { this.products = products}
    );
    //this.filter = this.route.snapshot.params['filter']; //Asi se personaliza la ruta para que haga la busqueda por el filtro
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart'])
  }



  getFilteredProducts() {
    
    return this.filter === ''
      ? this.products
      : this.products?.filter((product: any) => product.category === this.filter);
  }

}
