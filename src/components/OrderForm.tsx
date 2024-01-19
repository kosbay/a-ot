import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import cl from 'classnames';

import { createOrder, OrderProps } from "../slices/orders";
import "react-datepicker/dist/react-datepicker.css";

const initialValues: OrderProps = {
  name: '',
  amount: 0,
  phone: '',
  requestType: 'male',
  createdAt: '',
  confirmed: false,
  messageType: 'rain',
  id: '',
  city: '',
  requestAmount: 0,
}

const OrderForm = () => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const { register, control, handleSubmit, formState, reset } = useForm<OrderProps>({
    defaultValues: initialValues
  });

  const { errors, isDirty } = formState;

  const dispatch = useDispatch();

  const onSubmit = (data: OrderProps) => {
    setIsSending(true);
    dispatch(createOrder(data) as any)
      .unwrap()
      .then(() => {
        toast('Success!');
        reset(initialValues);
        setIsSending(false);
      })
      .catch(() => {
        toast('Some error, please try again!')
        setIsSending(false);
      });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Create new order
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register('name', { required: true })}
                type="text"
                placeholder="Enter your name"
                className={cl(
                  "w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary",
                    errors?.name && 'border-meta-1'
                  )}
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Amount
              </label>
              <input
                {...register('amount')}
                type="number"
                placeholder="Enter your amount"
                className={"w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}
              />
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Phone number <span className="text-meta-1">*</span>
            </label>
            <InputMask
              {...register('phone', { required: true })}
              placeholder="Enter your phone number"
              className={cl("w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary", 
                errors?.phone && 'border-meta-1')}
              mask="+7 (799) 999-9999"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Gender
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register('requestType')}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Created date
            </label>
            <Controller
              control={control}
              name='createdAt'
              render={({ field }) => (
                <DatePicker
                  placeholderText='Select date'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value as unknown as Date}
                  wrapperClassName="w-full"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              )}
            />
          </div>

          <div className="mb-4.5 flex items-center">
            <label className="block text-black dark:text-white mr-2">
              Confirmed
            </label>
            <input
              type="checkbox"
              className="cursor-pointer"
              {...register("confirmed")}
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Message
            </label>
            <label htmlFor="field-rain mr-2">
              <input
                {...register("messageType")}
                type="radio"
                value="sms"
                id="field-sms"
                className="mr-2"
              />
              SMS
            </label>
            <div/>
            <label htmlFor="field-wind">
              <input
                {...register("messageType")}
                type="radio"
                value="email"
                id="field-email"
                className="mr-2"
              />
              Email
            </label>
          </div>
          <div className="flex gap-2">
            <button
              className="flex w-full justify-center rounded bg-secondary p-3 font-medium text-white disabled:cursor-default disabled:text-black disabled:bg-whiter"
              disabled={!isDirty}
              type="button"
              onClick={() => { reset(initialValues) }}
            >
              {isSending ? 'Loading...' : 'Clear'}
            </button>
            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white disabled:cursor-default disabled:text-black disabled:bg-whiter" disabled={isSending} type="submit">
              {isSending ? 'Loading...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default OrderForm;