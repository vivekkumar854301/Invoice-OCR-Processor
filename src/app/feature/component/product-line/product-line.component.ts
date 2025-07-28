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
  SnackbarService,
} from '@clarium/ngce-components';
import {
  InvoiceData,
  InvoiceInfo,
  ProductItem,
} from '../../../shared/models/invoice.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import {
  DIALOGBOX_STYLES,
  customStyles_DIALOGBOX_STYLES,
} from '../../../shared/common-css/common.style';
import { GridConfig } from '../../../shared/models/shared.model';
import { GridComponent } from '../../../shared/component/reusable-components/grid.component';

@Component({
  selector: 'IOP-product-line',
  standalone: true,
  imports: [NgceComponentsModule, CurrencyPipe, CommonModule, GridComponent],
  templateUrl: './product-line.component.html',
  styleUrl: './product-line.component.scss',
  providers: [CurrencyPipe, DatePipe],
})
export class ProductLineComponent implements OnInit {
  formConfig!: IFormConfig;
  title = 'Product Line Items';
  readonly gridData = input.required<InvoiceInfo>();
  productLineSignal = signal<any[]>([]);
  selectedDesignCode = signal<string | null>(null);
  selectedRowForDelete = signal<ProductItem | null>(null);
  selectedRowForEdit = signal<ProductItem | null>(null);
  private readonly dialogService = inject(DialogService);
  private readonly snackbarService = inject(SnackbarService);
  editSideDrawer = viewChild<any>(DynamicFormTemplateComponent);
  editDialogTemplate = viewChild<TemplateRef<any>>('editDialogTemplate');
  invoiceDetailsTemplate = viewChild<TemplateRef<any>>(
    'invoiceDetailsTemplate'
  );
  rateTemplate = viewChild<TemplateRef<any>>('rateTemplate');
  amountTemplate = viewChild<TemplateRef<any>>('mrpRateTemplate');
  taxamountTemplate = viewChild<TemplateRef<any>>('taxamountTemplate');
  deleteTemplate = viewChild<TemplateRef<any>>('deleteTemplate');
  actionsTemplate = viewChild<TemplateRef<any>>('actionsTemplate');

  constructor() {
    effect(() => {
      const data = this.gridData();

      if (data && data.product_details?.items) {
        this.productLineSignal.set(data.product_details.items);
      }

      const raw = this.productLineSignal();
      const flat = this.flatProductLines();
    });
  }
  ngOnInit(): void {
    this.initializeForm();
    // this.initializeGrid()
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
    return allLines.filter((item) => item.design_code === code);
  });

  productItemGrid!: IGridConfig;

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
        field: 'size.HSN',
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
      groupByField: 'design_code',
      expandAll: false,
      // displayGroupByMenu: true,
    },
  }));

  parseRate(rate: string | number): number {
    if (typeof rate === 'string') {
      return parseFloat(rate.replace(/,/g, ''));
    }
    if (typeof rate === 'number') {
      return rate;
    }
    return 0; // fallback for null, undefined, etc.
  }

  readonly gridDataConfig = computed<GridConfig>(() => ({
    data: this.flatProductLines(),
    columns: [
      {
        key: 's_no',
        label: 'S.No',
        disabled: true,
      },
      {
        key: 'category',
        label: 'Category',
        disabled: false,
      },
      {
        key: 'description',
        label: 'Description',
        disabled: false,
      },
      {
        key: 'design_code',
        label: 'Design Code',
        disabled: false,
      },
      {
        key: 'size',
        label: 'Size',
        disabled: false,
      },
      {
        key: 'color',
        label: 'Color',
        disabled: false,
      },
      {
        key: 'UOM',
        label: 'UOM',
        disabled: false,
      },
      {
        key: 'pieces',
        label: 'Pieces',
        disabled: false,
      },
      {
        key: 'quantity',
        label: 'Quantity',
        disabled: false,
      },
      {
        key: 'rate',
        label: 'Rate',
        disabled: false,
        customTemplate: this.rateTemplate(),
      },
      {
        key: 'MRP_rate',
        label: 'MRP Rate',
        disabled: false,
        customTemplate: this.amountTemplate(),
      },
      {
        key: 'item_discount_percentage',
        label: 'Item Discount %',
        disabled: false,
      },
      {
        key: 'item_discount_amount',
        label: 'Discount Amount',
        disabled: false,
      },
      {
        key: 'product_valued',
        label: 'Product Valued',
        disabled: false,
      },
      {
        key: 'HSN',
        label: 'HsN',
        disabled: false,
      },
      {
        key: 'tax_percentage',
        label: 'Tax %',
        disabled: false,
      },
      {
        key: 'tax_amount',
        label: 'Tax Amount',
        disabled: false,
        customTemplate: this.taxamountTemplate(),
      },
    ],
    rowActions: {
      save: (row) => {
        const index = this.productLineSignal().findIndex(
          (r) => r.s_no === row.s_no
        );
        if (index !== -1) {
          let data = this.productLineSignal();
          data[index] = row;
          this.productLineSignal.set(data);
          this.snackbarService.show(
            'Updated Successfully',
            'success',
            { vertical: 'top', horizontal: 'right' },
            2000,
            'X'
          );
        }
      },
      delete: (row) => {
        const data = this.productLineSignal().filter(
          (r) => r.s_no !== row.s_no
        );
        this.productLineSignal.set(data);
        this.snackbarService.show(
          'Deleted Successfully',
          'success',
          { vertical: 'top', horizontal: 'right' },
          2000,
          'X'
        );
      },
    },
  }));

  private safeArray<T>(value: T | T[] | undefined | null): T[] {
    if (Array.isArray(value)) return value;
    if (value == null || value === '') return [];
    // If it's a single value (string/number), wrap in array
    return [value] as T[];
  }
  flatProductLines = computed(() =>
    this.productLineSignal().flatMap((item, i) => {
      // Defensive check: treat empty string as no size (empty array)
      const rawSizes = item.size?.size;
      const sizes = Array.isArray(rawSizes)
        ? rawSizes
        : rawSizes && rawSizes !== '' // non-empty string
        ? [rawSizes]
        : [];

      const rawPieces = item.size?.pieces;
      const pieces = Array.isArray(rawPieces)
        ? rawPieces
        : rawPieces && rawPieces !== ''
        ? [rawPieces]
        : [];

      const rawQuantities = item.size?.quantity;
      const quantities = Array.isArray(rawQuantities)
        ? rawQuantities
        : rawQuantities && rawQuantities !== ''
        ? [rawQuantities]
        : [];

      const rawRates = item.size?.rate;
      const rates = Array.isArray(rawRates)
        ? rawRates
        : rawRates && rawRates !== ''
        ? [rawRates]
        : [];

      // If sizes array is empty but pieces/quantity are present, create a default sizes array with empty string to map properly:
      const finalSizes = sizes.length > 0 ? sizes : [''];

      return finalSizes.map((sizeLabel: string, index: number) => ({
        s_no: item.s_no,
        category: item.category,
        description: item.description,
        design_code: item.design_code,
        size: sizeLabel,
        color: item.size?.color ?? '',
        UOM: item.size?.UOM ?? '',
        pieces: pieces[index] ?? pieces[0] ?? '',
        quantity: quantities[index] ?? quantities[0] ?? '',
        rate: rates[index] ?? rates[0] ?? 0,
        MRP_rate: item.MRP_rate ?? 0,
        item_discount_percentage: item.item_discount_percentage ?? 0,
        item_discount_amount: item.item_discount_amount ?? 0,
        product_valued: item.product_valued ?? 0,
        HSN: item.HSN ?? '',
        tax_percentage: item.tax_percentage ?? 0,
        tax_amount: item.tax_amount ?? 0,
      }));
    })
  );

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
      groupByField: 'design_code',
      expandAll: false,
      // displayGroupByMenu: true,
    },
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
    this.productLineSignal.set(event.value);
    const updatedList = this.productLineSignal().map((item) =>
      item.s_no === event.value.s_no ? { ...item, ...event.value } : item
    );

    this.productLineSignal.set(updatedList);
    this.dialogService.closeDialog();
  }

  onDeleteRow(row: ProductItem): void {
    this.selectedRowForDelete.set(row);
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
  onDeleteConfirmed(): void {
    const row = this.selectedRowForDelete();
    if (!row) return;

    const updated = this.productLineSignal().filter(
      (item) => item.size !== row.size
    );

    this.productLineSignal.set(updated);
    this.dialogService.closeDialog();
    this.selectedRowForDelete.set(null);
  }
  close() {
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
        this.editSideDrawer().form.patchValue(row);
      },
    });
  }

  invoiceDetails = {
    width: '100%',
    border: 'none',
    'margin-top': '2rem',
    // padding: '1.5rem',
    'background-color': '#ffffff',
  };
}
