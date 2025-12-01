import { useEffect, useState } from "react"
import { OrderListItem } from "../models/order.model"
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
      fetchOrders().then((orders) => {
        setOrders(orders);
      })
    }, []);

    const selectOrderItem = (orderId:number) => {
        // 요청 방어
        if(orders.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId);
            return;
        }

        fetchOrder(orderId).then((orderDetail) => {
            // detail 정보를 어디에?
            setSelectedItemId(orderId);
            setOrders(
                orders.map((order) => {
                    if(order.id === orderId){
                        return {
                            ...order,
                            detail: orderDetail
                        }
                    }
                    return order;
                })
            )
        })
    }
    

    return { orders, selectedItemId, selectOrderItem };

}