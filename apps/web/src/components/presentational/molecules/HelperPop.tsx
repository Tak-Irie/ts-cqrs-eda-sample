import { VFC } from "react";

import { IconsQuestion } from "../atoms";
import { PopOnIcon } from ".";
import { Placement } from "@popperjs/core";

type HelperPopProps = {
  text: string;
  popPlace?: Placement;
};

export const HelperPop: VFC<HelperPopProps> = ({ text, popPlace }) => {
  return (
    <PopOnIcon placement={popPlace} icon={<IconsQuestion />} content={text} />
  );
};
