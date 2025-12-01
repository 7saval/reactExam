export interface Order {
    id: number;
    created_at: string;
    address: string;
    receiver: string;
    contact: string;
    rep_book_title: string;
    total_price: number;
    total_quantity: number;
}

export interface OrderSheet {
    items: number[];
    totalQuantity: number;
    totalPrice: number;
    repBookTitle: string;
    delivery: Delivery;
}

export interface Delivery {
    address: string;
    receiver: string;
    contact: string;
}

export interface OrderDetailItem {
    book_id: number;
    title: string;
    author: string;
    price: number;
    quantity: number;
}

export interface OrderListItem extends Order {
    detail?: OrderDetailItem[];
}