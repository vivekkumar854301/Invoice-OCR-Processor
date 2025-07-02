import { Component, OnInit, TemplateRef, computed, input, signal, viewChild } from '@angular/core';
import {NgceComponentsModule,IGridConfig} from '@clarium/ngce-components'
import { HeaderComponent } from '../../../shared/component/header/header.component';
import { InvoiceData } from '../../model/invoice.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'IOP-product-line',
  imports: [NgceComponentsModule,HeaderComponent,CurrencyPipe,CommonModule],
  templateUrl: './product-line.component.html',
  styleUrl: './product-line.component.scss',
})
export class ProductLineComponent implements OnInit {
  gridConfig!: IGridConfig;
  title = 'Product Line Items (2)';
  readonly gridData = input.required<InvoiceData>();
  // private productLineSignal = signal(this.gridData().productLineItems)
  readonly productLineItems = computed(() => this.gridData().product_details);


  totalTemplate = viewChild<TemplateRef<any>>('totalPrice');

  ngOnInit(): void {
   this.initializeGridBlock();
  }
  invoiceDetails = {
    width: '100%',
    border: 'none',
    'margin-top': '2rem',
    padding: '1.5rem',
    'background-color':' #ffffff',
    'border-radius':'0.5rem',
    'box-shadow': '0 0 0 1px rgba(0, 0, 0, 0.1)',

  };
  initializeGridBlock = computed(()=> {
    const data:IGridConfig =  {
      data: this.productLineItems().items,
      draggable: true,
      pagination: {
        enabled: false,
        pageSize: 10,
        currentPage: 1,
        pageDetails: true,
        defaultVariant: false,
      },
      nonFrozenBodyCustomStyles: {
        backgroundColor: 'white',
        padding: '1rem',
        fontSize: '0.9rem',
      },
      nonFrozenHeaderCustomStyles: {
        padding: '1rem',
        fontSize: '0.9rem',
      },
      columns: [
        {
          header: 'S.No',
          field: 's_no',
          filterable: true,
          sortable: true,
          type: 'number',
          resizable: true,
        },
        {
          sortable: true,
          field: 'category',
          filterable: true,
          resizable: true,
          header: 'Category',
          type: 'text',
        },
        {
          sortable: true,
          field: 'description',
          filterable: true,
          resizable: true,
          header: 'Description',
          type: 'text',
        },
        {
          header: 'Design code',
          type: 'text',
          sortable: true,
          field: 'design_code',
          resizable: true,
          filterable: true,
        },
        {
          sortable: true,
          header: 'Size',
          resizable: true,
          type: 'text',
          filterable: true,
          field: 'size',
          // customCss: { fontWeight: '500' },
        },
        {
          field: 'UOM',
          header: 'UOM',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'pieces',
          header: 'Pieces',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'quantity',
          header: 'Quantity',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'rate',
          header: 'Rate',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'MRP_rate',
          header: 'MRP Rate',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'item_discount_percentage',
          header: 'Item Discount Percentage',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'item_discount_amount',
          header: ' Item Discount Amount',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'product_valued',
          header: 'Product Valued',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'HSN',
          header: 'HSN',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'tax_percentage',
          header: 'Tax Percentage',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        {
          field: 'tax_amount',
          header: 'Tax Amount',
          sortable: true,
          type: 'text',
          filterable: true,
          resizable: true,
        },
        // {
        //   field: '',
        //   header: 'Total',
        //   sortable: true,
        //   type: 'number',
        //   filterable: true,
        //   resizable: true,
        //   customTemplate:this.totalTemplate()
        // },
        // {
        //   field: 'supplierDescription',
        //   header: 'Supplier Description',
        //   sortable: true,
        //   type: 'text',
        //   filterable: true,
        //   resizable: true,
        // },
        // {
        //   field: 'confidence',
        //   header: 'Confidence',
        //   sortable: true,
        //   type: 'text',
        //   filterable: true,
        //   resizable: true,
        // },
      ],
      rowActions: [
        {
          icon: 'ngce-trash-empty',
          color: 'red',
          rowAlign: 'center',
          action: (row: any) => this.onDeleteRow(row),
        },
      ],
      filtering: {
        enabled: false,
        globalFilter: false,
        columnFilter: false,
        rowFilter: true,
        globalSearch: true,
      },
      sorting: {
        enabled: true,
      },

      export: {
        enabled: false,
        formats: ['pdf', 'csv', 'excel'],
      },
    };
    return data;
  });
  onDeleteRow(row: any): void {
    // const updated = this.productLineItemsSignal().filter(item => item.id !== row.id);
    // this.productLineItemsSignal.set(updated);
  }
  

}
