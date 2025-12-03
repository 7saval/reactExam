import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./http";

// export const order = async (orderData:OrderSheet) => {
//     const response = await httpClient.post("/orders", orderData); // 모델 타입
//     return response.data;
// }

// 리팩토링
export const order = async (orderData:OrderSheet) => {
    return await requestHandler<OrderSheet>("post", "/orders", orderData);
}

export const fetchOrders = async () => {
    return await requestHandler<Order[]>("get", "/orders");
}

export const fetchOrder = async (orderId:number) => {
    return await requestHandler<OrderDetailItem[]>("get", `/orders/${orderId}`);
}