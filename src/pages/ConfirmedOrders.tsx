import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import {
  retrieveOrders,
  OrderProps,
  deleteOrder
} from "../slices/orders";

import Breadcrumb from '../components/Breadcrumb';
import OrdersTable from '../components/OrdersTable';

const ConfirmedOrders = () => {
  const orders = useSelector((state: { orders: OrderProps[] }) => state.orders);
  const dispatch = useDispatch();

  const initFetch = () => {
    return dispatch(retrieveOrders({}) as any);
  }

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const handleRemoveOne = (id: string) => {
    dispatch(deleteOrder({ id }) as any)
      .unwrap()
      .then(() => {
        initFetch();
        toast('Successfully removed!');
      })
      .catch(() => {
        toast('Something went wrong, please try again!');
      });
  }

  const memoizedOrders = useMemo(() => {
    return orders.filter((order: OrderProps) => order.confirmed === true)
  }
  , [orders])

  return (
    <>
      <Breadcrumb pageName="Confirmed Orders" />
      <div className="flex flex-col gap-10">
        <OrdersTable dataRow={memoizedOrders}
        onRemoveOne={(id) => handleRemoveOne(id)}
        />
      </div>
    </>
  );
};

export default ConfirmedOrders;
