import { TemplateRef } from "@angular/core";

export interface GridColumn {
    key: string;
    label: string;
    disabled?: boolean;
    customTemplate?: TemplateRef<any>;
  }
  
  export interface GridConfig {
    data: any;
    columns: GridColumn[];
    rowActions: {
    //   edit: (row: any) => void;
      save: (row: any) => void;
    //   cancel: () => void;
      delete: (row: any) => void;
    };
  }