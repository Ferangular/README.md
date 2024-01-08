import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {ConfirmationService, MessageService} from "primeng/api";
import { TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {RatingModule} from "primeng/rating";
import {ButtonModule} from "primeng/button";
import {SliderModule} from "primeng/slider";
import {InputTextModule} from "primeng/inputtext";
import {ToggleButtonModule} from "primeng/togglebutton";
import {RippleModule} from "primeng/ripple";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";

import {FormStore} from "./formStore.store";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {Customer} from "./interfaces/customer";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {TagModule} from "primeng/tag";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {Product} from "./interfaces/product";
import {ProductService} from "./services/product.service";
import {FileUploadModule} from "primeng/fileupload";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@Component({
  selector: 'app-form-store',
  standalone: true,
  imports: [CommonModule,
    NgIf, NgFor,
    FormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule, ProgressSpinnerModule, CardModule, ToolbarModule, DialogModule, TagModule, RadioButtonModule, InputNumberModule, FileUploadModule, ConfirmDialogModule],
  templateUrl: './form-store.component.html',
  styleUrls: ['./form-store.component.scss'],
  providers: [
    MessageService, ConfirmationService, FormStore ]
})
export class FormStoreComponent implements OnInit{
  protected readonly store= inject(FormStore);
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.store.initialize();
  }

  ngOnInit() {
    // this.productService.getProducts().then((data) => (this.products = data));

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.store.openNewProductDialog();
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Product) {
    console.log(product);


  // this.product = { ...product };
    // this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
      console.log(this.product)
    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }


  getSeverity(status: string) {

    switch (status.toUpperCase()) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }



}
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}
