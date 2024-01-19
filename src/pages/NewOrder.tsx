import OrderForm from "../components/OrderForm";
import Breadcrumb from "../components/Breadcrumb";

const NewOrder = () => {
  return (
    <>
      <Breadcrumb pageName="Order Page" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <OrderForm />
          </div>
      </div>
    </>
  );
};

export default NewOrder;
