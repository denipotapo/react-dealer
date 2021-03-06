
export interface ProductSearchModel {
    product_id: string;
    pricelist_reference: string;
    reference: string;
    brand_reference: string;
    brand_title: string;
    group_reference: string;
    group_title: string;
    serie_id: number;
    serie_reference: string;
    category_reference: string;
    category_breadcrumb: string;
    title: string;
    description?: string;
    characteristic?: string;
    price: number;
    list_price: number;
    price_saving: number;
    public_price?: number;
    map_price?: number;
    total_discount: number;
    discount_1: number;
    discount_2: number;

    available_stock: number;
    next_available_stock: number;
    next_available_stock_at: string;
    stock_updated_at: string;
    stock_level: string;
    next_stock_level: string;
    avg_monthly_sale_qty: number;

    flag_new: string ;
    barcode_ean?: number;
    barcode_upc?: number;
    is_promotional: string;
    is_liquidation: string;
    bestseller_rank?: number ;
    trending_rank?: number;
    popular_rank?: number;
    deal_rank?: number;
    fresh_rank?: number;
    rankable_breadcrumb?: string;
    weight?: number;
    volume?: number;
    length?: number;
    width?: number;
    height?: number;
    diameter?: number;
    format?: number;
    currency_reference: string;
    currency_symbol: string;
    unit_reference: string;
    type_reference: string;
    flag_till_end_of_stock: string;
    flag_end_of_lifecycle: string;
    remaining_available_stock?: string;
    remaining_total_available_stock?: string;
    available_at?: string;
    picture_media_id?: string;
    picture_media_filemtime: string;
    alternate_medias: string;
    search_relevance?: number;
}

