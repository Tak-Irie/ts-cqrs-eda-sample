import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "../../generated/graphql";

type Inputs = {
  userName: string;
  password: string;
  email: string;
};

export const RegisterUser = () => {
  const [registerUser] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("data:", data);
      const { email, password, userName } = data;
      const res = await registerUser({
        variables: { email, password, userName },
      });
      console.log("res:", res);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <div className='bg-gray-300 m-10 border-red-200 border-2'>
      <form className='flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          defaultValue='your name'
          {...register("userName", { required: true })}
        />
        <input type='email' defaultValue='email' {...register("email")} />
        <input
          type='password'
          defaultValue={"password"}
          {...register("password", { required: true })}
        />
        {errors.password ||
          (errors.userName && <span>This field is required</span>)}
        <input type='submit' />
      </form>
    </div>
  );
};
