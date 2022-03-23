import { Fragment } from "react";

export const reactNewLineToBr = (text: string) => {
  const transformedText = text.split(/(\n)/).map((item, index) => {
    return <Fragment key={index}>{item.match(/\n/) ? <br /> : item}</Fragment>;
  });
  return <span>{transformedText}</span>;
};
