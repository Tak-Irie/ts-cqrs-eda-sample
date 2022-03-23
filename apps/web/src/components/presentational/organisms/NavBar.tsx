import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

// import {  NavAuthSection } from "../../presentational";
import { HeaderList } from "../atoms";

export const NavBar: FC = () => {
  return (
    <div className='py-5 grid grid-cols-12 border border-gray-200'>
      <div className='flex items-center ml-2 col-start-1 col-span-4'>
        <div className='-mt-5 -ml-2'>
          <Image
            src='/logo_temp.png'
            alt='くらきちロゴ'
            width='50'
            height='50'
          />
        </div>
        <div className='absolute'>
          <Link href='/' passHref>
            <a
              href='replace'
              aria-label='site name'
              className='inline-flex items-center'>
              <span className='ml-6 text-xl font-bold text-gray-800'>
                くらきち ~くらしのあんぜんきち.Alpha~
              </span>
            </a>
          </Link>
        </div>
      </div>
      <ul className='col-start-5 col-end-11 flex justify-around items-center space-x-8'>
        <HeaderList
          linkUrl='/howto'
          ariaLabel='playground'
          linkLabel='つかいかた'
        />
        <HeaderList
          linkUrl='/about-us'
          ariaLabel='aboutUs'
          linkLabel='くらきちについて'
        />
        <HeaderList
          linkUrl='/for-pro'
          ariaLabel='forPros'
          linkLabel='福祉職の皆様へ'
        />
      </ul>
      <span className='col-start-12  mr-2 flex justify-end'>
        <div>placer</div>
        {/* <NavAuthSection /> */}
      </span>
    </div>
  );
};
