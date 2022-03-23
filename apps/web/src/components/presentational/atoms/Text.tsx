import { VFC } from "react";
import { reactNewLineToBr } from "../../../util/reactNewLineToBr";

type TextProps = {
  content: string;
  overwriteCSS?: string;
  label?: string;
  color?: "gray" | "green" | "blue" | "red" | "yellow";
};

// TODO:, consider what props should be customizable, color and something.
// size should be controlled by components (also responsive feat)

/**
 *If you wanna use \n, give string in object to content
 *@example ok:content={"hello\nworld"} fail:content="hello\nworld"
 */
export const TextBase: VFC<TextProps> = ({
  content,
  overwriteCSS = "text-base text-gray-700",
}) => {
  if (content) {
    const _content = reactNewLineToBr(content);
    return <p className={overwriteCSS}>{_content}</p>;
  }
  return <p className={overwriteCSS}>{content}</p>;
};

export const TextSmall: VFC<TextProps> = ({ content, color = "gray" }) => {
  return (
    <TextBase content={content} overwriteCSS={`text-small text-${color}-700`} />
  );
};

export const Text2xl: VFC<TextProps> = ({ content, color = "gray" }) => {
  return <p className={`text-2xl text-${color}-700`}>{content}</p>;
};

export const TextH1: VFC<TextProps> = ({ content, color = "gray" }) => {
  return <h1 className={`text-4xl font-bold text-${color}-700`}>{content}</h1>;
};
export const TextH2: VFC<TextProps> = ({ content, color = "gray" }) => {
  return <h2 className={`text-3xl font-bold text-${color}-700`}>{content}</h2>;
};
export const TextH3: VFC<TextProps> = ({ content, color = "gray" }) => {
  return <h3 className={`text-2xl font-bold text-${color}-700`}>{content}</h3>;
};

export const TextLabel: VFC<Omit<TextProps, "label">> = ({
  content,
  color = "gray",
}) => {
  return (
    <div className='mb-2'>
      <label className={`underline font-bold text-base  text-${color}-700`}>
        {content}
      </label>
    </div>
  );
};

export const TextLabeled: VFC<TextProps> = ({ content, label, color }) => {
  return (
    <div className='flex flex-col'>
      <label className='text-sm font-medium text-gray-500'>{label}</label>
      <TextBase content={content} overwriteCSS='text-sm ' />
    </div>
  );
};

export const TextWithDivider: VFC<Omit<TextProps, "label">> = ({
  content,
  color,
}) => {
  return (
    <div className='relative my-4 flex justify-center items-center'>
      <div className='border-t border-gray-300 w-full' />
      <p className='absolute px-2 bg-white text-gray-700'>{content}</p>
    </div>
  );
};
