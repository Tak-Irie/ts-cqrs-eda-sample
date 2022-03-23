import { ReactElement, VFC } from "react";
import Link from "next/link";

type LinkNextjsProps = {
  url: string;
  labelOrElement: string | ReactElement;
  as?: string;
  overwriteCSS?: string;
  ariaLabel?: string;
  ariaRole?: string;
  onClick?: () => void;
};

/**
 * props is passed to \<a ...props>{labelOrElement}\</a> except for as and url
 */
export const LinkNextjs: VFC<LinkNextjsProps> = ({
  as,
  url,
  labelOrElement,
  overwriteCSS = "inline-flex items-center",
  ariaLabel,
  ariaRole,
  onClick,
}) => {
  return (
    <Link href={url} as={as} passHref>
      <a
        href='replace'
        className={overwriteCSS}
        aria-label={ariaLabel}
        title={ariaLabel}
        role={ariaRole}
        onClick={onClick}>
        {labelOrElement}
      </a>
    </Link>
  );
};
