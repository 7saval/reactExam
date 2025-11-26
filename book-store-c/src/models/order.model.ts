export interface Order {
    id: number;
    createdAt: string;
    address: string;
    receiver: string;
    contact: string;
    repBookTitle: string;
    totalPrice: number;
}