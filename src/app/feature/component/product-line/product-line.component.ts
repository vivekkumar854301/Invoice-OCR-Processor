import {
  Component,
  LOCALE_ID,
  OnInit,
  TemplateRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  NgceComponentsModule,
  IGridConfig,
  DialogConfig,
  IFormConfig,
  DialogService,
  DynamicFormTemplateComponent,
} from '@clarium/ngce-components';
import { HeaderComponent } from '../../../shared/component/header/header.component';
import { InvoiceData, ProductItem } from '../../model/invoice.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DIALOGBOX_STYLES, customStyles_DIALOGBOX_STYLES } from '../../../shared/commonCss/common.style';

@Component({
  selector: 'IOP-product-line',
  standalone: true,
  imports: [NgceComponentsModule, HeaderComponent, CurrencyPipe, CommonModule],
  templateUrl: './product-line.component.html',
  styleUrl: './product-line.component.scss',
  providers: [CurrencyPipe, DatePipe],
})
export class ProductLineComponent implements OnInit {
  formConfig!: IFormConfig;
  title = 'Product Line Items';
  readonly gridData = input.required<InvoiceData>();
  productLineSignal = signal<ProductItem[]>([]);
  selectedDesignCode = signal<string | null>(null);
  private readonly dialogService = inject(DialogService);

  editSideDrawer = viewChild<any>(DynamicFormTemplateComponent);
  editDialogTemplate = viewChild<TemplateRef<any>>('editDialogTemplate');
  invoiceDetailsTemplate = viewChild<TemplateRef<any>>('invoiceDetailsTemplate');
  rateTemplate = viewChild<TemplateRef<any>>('rateTemplate');
  amountTemplate = viewChild<TemplateRef<any>>('mrpRateTemplate');
  taxamountTemplate = viewChild<TemplateRef<any>>('taxamountTemplate');
  deleteTemplate = viewChild<TemplateRef<any>>('deleteTemplate');
  actionsTemplate= viewChild<TemplateRef<any>>('actionsTemplate');

  constructor() {
    effect(() => {
      const data = this.gridData();
      if (data && data.product_details?.items) {
        this.productLineSignal.set(data.product_details.items);
      }
    });
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  viewdetails(row: any) {
    this.selectedDesignCode.set(row.design_code);
    const dialogConfig: DialogConfig = {
      header: 'Product Details',
      content: this.invoiceDetailsTemplate()!,
      closeOnBackdropClick: true,
      accessibility: true,
      draggable: false,
      closeButton: true,
      styles: DIALOGBOX_STYLES,
    };
  
    this.dialogService.openDialog(dialogConfig);
  
    this.dialogService.afterOpen().subscribe({
      next: () => {
        this.invoiceDetails = {
          ...this.invoiceDetails,
          ...row,
        };
      },
    });
  }
  filteredProductLines = computed(() => {
    const code = this.selectedDesignCode();
    const allLines = this.productLineSignal();
    if (!code) return [];
    return allLines.filter(item => item.design_code === code);
  });
  
  
  readonly gridConfig = computed<IGridConfig>(() => ({
    data: this.productLineSignal(),
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
        field: 'category',
        header: 'Category',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
      },
      {
        field: 'description',
        header: 'Description',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
      },
      {
        field: 'design_code',
        header: 'Design Code',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
      },
      {
        field: 'size',
        header: 'Size',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
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
        customTemplate: this.rateTemplate(),
      },
      {
        field: 'MRP_rate',
        header: 'MRP Rate',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
        customTemplate: this.amountTemplate(),
      },
      {
        field: 'item_discount_percentage',
        header: 'Item Discount %',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
      },
      {
        field: 'item_discount_amount',
        header: 'Discount Amount',
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
        header: 'Tax %',
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
        customTemplate: this.taxamountTemplate(),
      },
      {
        field: 'Actions',
        header: 'Actions',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
        customTemplate: this.actionsTemplate(),
      }
    ],
    // rowActions: [
    //   {
    //     icon: 'ngce-edit-2',
    //     color: 'black',
    //     rowAlign: 'center',
    //     action: (row: ProductItem) => {
    //       this.onEditRow(row);
    //     },
    //   },
    //   {
    //     icon: 'ngce-trash-empty',
    //     color: 'red',
    //     rowAlign: 'center',
    //     action: (row: ProductItem) => this.onDeleteRow(row),
    //   },
    // ],
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
    rowGrouping: {
      enabled: false,
      groupByField:'design_code',
      expandAll:false,
      // displayGroupByMenu: true,
    }
  }));

  readonly invoicedetailsgridConfig = computed<IGridConfig>(() => ({
    data: this.filteredProductLines(),
    draggable: true,
    pagination: {
      enabled: true,
      pageSize: 7,
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
        field: 'category',
        header: 'Category',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
      },
      {
        field: 'description',
        header: 'Description',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
      },
      {
        field: 'design_code',
        header: 'Design Code',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
      },
      {
        field: 'size',
        header: 'Size',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
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
        customTemplate: this.rateTemplate(),
      },
      {
        field: 'MRP_rate',
        header: 'MRP Rate',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
        customTemplate: this.amountTemplate(),
      },
      {
        field: 'item_discount_percentage',
        header: 'Item Discount %',
        sortable: true,
        type: 'text',
        filterable: true,
        resizable: true,
      },
      {
        field: 'item_discount_amount',
        header: 'Discount Amount',
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
        header: 'Tax %',
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
        customTemplate: this.taxamountTemplate(),
      },
    ],
    rowActions: [
      {
        icon: 'ngce-edit-2',
        color: 'black',
        rowAlign: 'center',
        action: (row: ProductItem) => {
          this.onEditRow(row);
        },
      },
      {
        icon: 'ngce-trash-empty',
        color: 'red',
        rowAlign: 'center',
        action: (row: ProductItem) => this.onDeleteRow(row),
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
    rowGrouping: {
      enabled: false,
      groupByField:'design_code',
      expandAll:false,
      // displayGroupByMenu: true,
    }
  }));
  initializeForm() {
    this.formConfig = {
      layout: 'horizontal',
      customStyles: {
        padding: '20px',
        gap: '14px',
      },
      fields: [
        {
          type: 'number',
          // field:'s_no',
          name: 's_no',
          label: 'S.No',

        },
        {
          type: 'text',
          name: 'category',
          label: 'Category',
        },
        {
          type: 'text',
          name: 'description',
          label: 'Description',
        },
        {
          type: 'text',
          name: 'design_code',
          label: 'Design_code',
        },
        {
          type: 'text',
          name: 'size',
          label: 'Size',
        },
        {
          type: 'text',
          name: 'color',
          label: 'Color',
        },
        {
          type: 'text',
          name: 'UOM',
          label: ' U O M',
        },
        {
          type: 'text',
          name: 'pieces',
          label: 'Pieces',
        },
        {
          type: 'text',
          name: 'quantity',
          label: 'Quantity',
        },
        {
          type: 'text',
          name: 'rate',
          label: 'Rate',
        },
        {
          type: 'text',
          name: 'MRP_rate',
          label: ' M R P_rate',
        },
        {
          type: 'text',
          name: 'item_discount_percentage',
          label: 'Item_discount_percentage',
        },
        {
          type: 'text',
          name: 'item_discount_amount',
          label: 'Item_discount_amount',
        },
        {
          type: 'text',
          name: 'product_valued',
          label: 'Product_valued',
        },
        {
          type: 'text',
          name: 'HSN',
          label: ' HSN',
        },
        {
          type: 'text',
          name: 'tax_percentage',
          label: 'Tax_percentage',
        },
        {
          type: 'text',
          name: 'tax_amount',
          label: 'Tax_amount',
        },
      ],
      buttons: [
        {
          label: 'Submit',
          type: 'submit',
        },
        {
          label: 'Reset',
          type: 'reset',
        },
      ],
    };
  }
  onFormSubmit(event: any, isNew: boolean = true) {
    console.log('Form submitted:', event.value);
    this.productLineSignal.set(event.value);
    const updatedList = this.productLineSignal().map((item) =>
      item.s_no === event.value.s_no ? { ...item, ...event.value } : item
    );

    this.productLineSignal.set(updatedList);
    this.dialogService.closeDialog();
  }

  onDeleteRow(row: ProductItem): void {
    const dialogConfig: DialogConfig = {
      header: 'Confirmation',
      content: this.deleteTemplate()!,
      closeOnBackdropClick: false,
      accessibility: true,
      draggable: false,
      closeButton: true,
    };
    this.dialogService.openDialog(dialogConfig);
  }
  onDeleteConfirmed(row: any): void {
    console.log('Delete confirmed for row:', row);
    
    const updated = this.productLineSignal().filter(
      (item) => item.size !== row.size
    );
    
    this.productLineSignal.set(updated);
    console.log('Row deleted:', row);
    this.dialogService.closeDialog();
    
    
  }
  onEditRow(row: ProductItem): void {
    const dialogConfig: DialogConfig = {
      header: 'Edit Product Item',
      content: this.editDialogTemplate()!,
      closeOnBackdropClick: false,
      accessibility: true,
      draggable: false,
      closeButton: true,
      styles: customStyles_DIALOGBOX_STYLES,
    };
    this.dialogService.openDialog(dialogConfig);
    this.dialogService.afterOpen().subscribe({
      next: () => {
        console.log(this.editSideDrawer().form);
        
        this.editSideDrawer().form.patchValue(row);
        console.log('Edit form initialized with row data:', row);
      },
    });
  }

  invoiceDetails = {
    width: '100%',
    border: 'none',
    'margin-top': '2rem',
    padding: '1.5rem',
    'background-color': '#ffffff',
  };
}
