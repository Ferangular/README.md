import {inject, Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";


import { map,  switchMap, tap} from "rxjs";
import {ProductService} from "./services/product.service";
import {Product} from "./interfaces/product";
import {MessageManagerService} from "../../../shared/ui";
import {MessageService} from "primeng/api";




export interface ProductState {
  loading: boolean;
  products: Product[];
  product: Product;

  productDialog: boolean; // Nuevo estado para el diálogo de nuevo producto

  submitted: boolean;
  statuses: { label: string; value: string }[];

}

const DEFAULT_STATE: ProductState = {
  loading: false,
  products: [],
  product:{
    id: '',
    code: 'f230fh0g3',
    name: '',
    description: '',
    image: 'bamboo-watch.jpg',
    price: 0,
    category: 'Accessories',
    quantity: 0,
    inventoryStatus: {
      label: 'OUTOFSTOCK',
      value: 'outofstock'
    },
    rating: 5
  },

  productDialog: false, // Inicialmente, el diálogo no está abierto
  submitted: false,
  statuses: [
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
  ],
}

@Injectable({
  providedIn: 'root',
})
export class FormStore extends ComponentStore<ProductState> {
  // private readonly service = inject(CustomerService)
  private readonly service = inject(ProductService);
  protected readonly message = inject(MessageService);
  constructor() {
    super(DEFAULT_STATE);
  }

  // SELECTS
  readonly vm$ = this.select((state) => state).pipe(
    tap((state) => console.log('[inicio]', state)),
  );

  readonly products$ = this.select(state => state.products);
  readonly loading$ = this.select(state => state.loading);
  readonly productDialog$ = this.select(state => state.productDialog);


  // EFFECTS, aqui va lo eventos del usuarios, clicks de teclado, etc...
  readonly initialize = this.effect((trigger$) => trigger$.pipe(
    switchMap(() => {
      this.patchState({ loading: true }); // Cambia loading a true antes de la solicitud
      return this.service.getProducts().pipe(
        tapResponse(
          (products) => {

            this.upProducts(products);
            // this.message.success('Valores cargados correctamente');
            console.log(products);
            this.message.add({severity:'success', summary:'Service Message', detail:'cargado correctamente', life: 3000});
            this.patchState({ loading: false }); // Cambia loading a false después de la solicitud exitosa
          },
          (error) => {
            console.log(error);
            this.patchState({ loading: false }); // Cambia loading a false si hay un error
          }
        )
      );
    })
  ))

  readonly editProduct = this.effect((trigger$)=> trigger$.pipe(
    switchMap((productId) => {
      this.patchState({ productDialog: true });
      this.patchState({ loading: true }); // Activa el estado de loading antes de la edición
      console.log(productId)
      this.message.add({severity:'success', summary:'Service Message', detail:'datos en el store', life: 3000});
      // @ts-ignore
      return this.service.getProductById(productId).pipe(
        tapResponse(

          (productToEdit) => {
            if (productToEdit) {
              console.log(productToEdit)
              this.patchState({ product: productToEdit });
              this.patchState({ productDialog: true });
            }
          },
          (error) => {
            console.log(error);
            this.patchState({ loading: false }); // Desactiva el estado de loading después de la edición
          }
        )
      );
    })
  ));
  // readonly saveProduct= this.effect<Product>((triggers$) => triggers$.pipe(
  //   switchMap((p)=>
  //       switchMap()
  //   ),
  //
  // ));




  // UPDATERS
  readonly upProducts = this.updater( (state: ProductState, products: Product[]) => {
    return {
      ...state,
      products: products

    }
  })
  readonly uploading = this.updater( (state: ProductState, loading: boolean) => {
    return {
      ...state,
      loading
    }
  });

  // Acción para abrir el diálogo de nuevo producto


  readonly openNewProductDialog  = this.updater( (state: ProductState) => {
    return {
      ...state,
      productDialog: true,
      product: state.product, // Puedes inicializar el producto si es necesario
      submitted: false
    }
  });
  // Acción para cerrar el diálogo de nuevo producto
  // readonly  closeNewProductDialog = this.updater( (state: ProductState) => {
  //   return {
  //     ...state,
  //     productDialog: false,
  //     product: null,
  //     submitted: false
  //   }
  // })
  readonly setOpenDialog = this.updater( (state: ProductState, openDialog: boolean) => {
    return {
      ...state,
      openDialog
    }
  });
  readonly setCloseDialog = this.updater( (state: ProductState) => {
    return {
      ...state,
      openDialog: false,
      submitted:false,
    }
  });
  readonly setSubmitted = this.updater( (state: ProductState, submitted: boolean) => {
    return {
      ...state,
      submitted
    }
  })
// ****************


}
