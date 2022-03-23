import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className='bg-gray-300 m-10 border-red-200 border-2'>
      <form className='flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue='test' {...register("example")} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type='submit' />
      </form>
    </div>
  );
};
