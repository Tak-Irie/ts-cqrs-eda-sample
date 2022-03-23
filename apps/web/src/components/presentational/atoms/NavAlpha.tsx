import { VFC } from "react";

import { LinkNextjs } from "../../container";

export const NavAlpha: VFC = () => {
  return (
    <div className='flex bg-red-200 text-gray-700 border border-gray-100'>
      <LinkNextjs
        labelOrElement='Alpha限定メニュー'
        url='/'
        overwriteCSS='ml-2 text-md'
      />
      <div className='hidden sm:flex ml-5 w-auto space-x-2'>
        <LinkNextjs
          labelOrElement='製作動機'
          url='/alpha/motivation'
          overwriteCSS='hover:bg-red-300 transition duration-300  rounded px-1'
        />
        <LinkNextjs
          labelOrElement='目的'
          url='/alpha/goal'
          overwriteCSS='hover:bg-red-300 transition duration-300  rounded px-1'
        />
        <LinkNextjs
          labelOrElement='実装ロードマップ'
          url='/alpha/load-map'
          overwriteCSS='hover:bg-red-300 transition duration-300  rounded px-1'
        />
      </div>
      <div className='hover:bg-red-300 transition duration-200 px-1 ml-auto mr-2 rounded'>
        <LinkNextjs labelOrElement='簡易ログイン' url='/' />
      </div>
    </div>
  );
};
