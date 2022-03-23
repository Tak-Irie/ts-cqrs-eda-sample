import type { VFC } from "react";

import { LinkNextjs } from "../../container";
import { TextSmall } from "../atoms";

export const Footer: VFC = () => {
  return (
    <div className='text-sm'>
      <div className='px-4 pt-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='grid gap-16 row-gap-10 mb-8 lg:grid-cols-6'>
          <div className='md:max-w-md lg:col-span-2'>
            <LinkNextjs
              url='/'
              labelOrElement={
                <span className='flex justify-center items-end'>
                  <TextSmall content='くらきち&nbsp;-くらしのあんぜんきち-' />
                </span>
              }
            />
            <span className='flex justify-end'>
              <TextSmall content='福祉のポータルサイト&nbsp;&amp;&nbsp;SNS' />
            </span>
          </div>
          <div className='grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4'>
            <FooterItems
              label='くらきちについて'
              items={[
                { label: "目指すもの", url: "/info/goal" },
                { label: "運営者", url: "/info/committee" },
                { label: "FAQ", url: "/info/faq" },
              ]}
            />
            <FooterItems
              label='規約'
              items={[
                { label: "利用規約", url: "/info/terms-of-service" },
                { label: "プライバシーポリシー", url: "/info/privacy-policy" },
                {
                  label: "情報セキュリティポリシー",
                  url: "/info/information-security-policy",
                },
              ]}
            />
            <FooterItems
              label='ご意見'
              items={[
                { label: "ご意見・ご要望フォーム", url: "/info/opinion" },
                {
                  label: "これまでのご意見と回答",
                  url: "/info/answer-to-opinion",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center py-5 border-t sm:flex-row'>
        <p className='text-sm text-gray-700'>
          © Copyright 2021 kurakichi. All rights reserved.
        </p>
      </div>
    </div>
  );
};

type FooterItemsProps = {
  label: string;
  items: {
    label: string;
    url: string;
  }[];
};

const FooterItems: VFC<FooterItemsProps> = ({ items, label }) => {
  return (
    <div>
      <p className='font-semibold text-gray-700'>{label}</p>
      <ul className='mt-2 space-y-2'>
        {items.map((item) => {
          return (
            <li key={item.label}>
              <LinkNextjs
                overwriteCSS='text-gray-700'
                url={item.url}
                labelOrElement={item.label}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
