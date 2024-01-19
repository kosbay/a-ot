import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import {
  retrieveOrders,
  OrderProps,
  deleteOrder
} from "../slices/orders";
import OrderDataService from "../services/OrderService";

import Breadcrumb from '../components/Breadcrumb';
import OrdersTable from '../components/OrdersTable';

const mockData = [
  {
    id: "1",
    amount: 37246,
    city: "Royal Oak",
    confirmed: false,
    createdAt: "2024-01-18T05:59:06.966Z",
    messageType: "bypass back-end sensor",
    name: "Lauren Cartwright III",
    phone: "\\K&IvInxL!",
    requestAmount: 58993,
    requestType: "male"
  }
]

const AllOrders = () => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const orders = useSelector((state: { orders: OrderProps[] }) => state.orders);
  const dispatch = useDispatch();

  const initFetch = () => {
    OrderDataService.getAll().then((res: any) => {
      setTotalCount(res.data.length || 0)
    })
    return dispatch(retrieveOrders({ page, limit: 10 }) as any);
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

  return (
    <>
      <Breadcrumb pageName="All Orders" />
      <div className="flex flex-col gap-10">
        <OrdersTable dataRow={orders || mockData} onPageChange={(seletedPage) => {
          setPage(seletedPage)
          initFetch()
        }}
        onRemoveOne={(id) => handleRemoveOne(id)}
        totalCount={totalCount}
        />
      </div>
    </>
  );
};

export default AllOrders;
