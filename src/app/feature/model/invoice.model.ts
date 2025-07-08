export interface InvoiceData {
  image_binary_data? : string,
  invoice: {
    invoice_number: string;
    invoice_date: string;
    irn_number: string;
    acknowledgement_no: string;
    acknowledgement_data: string;
    e_way_bill_no: string;
  };
  supplier: {
    suplier_name: string;
    supplier_address: string;
    supplier_gst_no: string;
    msme_no: string;
    pan_no: string;
  };
  purchase: {
    order_no: string;
    order_date: string;
    transport_name: string;
    agent_name: string;
    LR_no: string;
    LR_date: string;
    merchandiser_name: string;
  };
  taxes: {
    taxable_value: string;
    CGST_amount: string;
    SGST_amount: string;
    IGST_amount: string;
    total_tax_amount: string;
  };
  discount: {
    discount_percentage: string;
    discount_amount: string;
  };
  charges: {
    other_deductions: string;
    freight_charges: string;
    other_charges: string;
  };
  amount: {
    round_off_amount: string;
    invoice_amount: string;
    amount_in_words: string;
  };
  billing: {
    billed_to: string;
    bank_name: string;
    bank_branch: string;
    account_name: string;
    account_no: string;
    IFSC_code: string;
  };
  product_details: {
    items: ProductItem[];
    total_quantity: number;
    total_net_Amount: number;
  };
}

export interface ProductItem {
  s_no: number;
  category: string;
  description: string;
  design_code: string;
  size: string;
  color: string;
  UOM: string;
  pieces: string;
  quantity: string;
  rate: string;
  MRP_rate: string;
  item_discount_percentage: string;
  item_discount_amount: string;
  product_valued: string;
  HSN: string;
  tax_percentage: string;
  tax_amount: string;
}
