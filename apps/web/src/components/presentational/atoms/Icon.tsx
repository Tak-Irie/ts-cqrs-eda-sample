import { FC, ReactElement, VFC } from "react";
import {
  ExclamationIcon,
  MenuIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  HomeIcon,
  UserIcon,
  MailIcon,
  CogIcon,
  CheckCircleIcon,
  CloudUploadIcon,
  DocumentAddIcon,
  QuestionMarkCircleIcon,
  LogoutIcon,
  LoginIcon,
  UsersIcon,
  WifiIcon,
  SelectorIcon,
  CheckIcon,
  SearchIcon,
} from "@heroicons/react/outline";

type IconsProps = {
  overwriteCSS?: string;
  icon: ReactElement;
};

const Icons: FC<IconsProps> = ({ icon, overwriteCSS }) => {
  return <div className={overwriteCSS}>{icon}</div>;
};

export const IconsCaution: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-yellow-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<ExclamationIcon />} />;
};

export const IconsMenu: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<MenuIcon />} />;
};

export const IconsDownChevron: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<ChevronDownIcon />} />;
};

export const IconsUpChevron: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<ChevronUpIcon />} />;
};

export const IconsVerticalDots: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<DotsVerticalIcon />} />;
};

export const IconsHome: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<HomeIcon />} />;
};

export const IconsUser: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<UserIcon />} />;
};

export const IconsMail: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<MailIcon />} />;
};

export const IconsCog: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<CogIcon />} />;
};
export const IconsCheck: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<CheckIcon />} />;
};
export const IconsSearch: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<SearchIcon />} />;
};

export const IconsCheckCircle: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<CheckCircleIcon />} />;
};

export const IconsCloudUpload: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<CloudUploadIcon />} />;
};

export const IconsDocumentAdd: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<DocumentAddIcon />} />;
};

export const IconsQuestion: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return (
    <Icons overwriteCSS={overwriteCSS} icon={<QuestionMarkCircleIcon />} />
  );
};
export const IconsLogout: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<LogoutIcon />} />;
};
export const IconsLogin: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<LoginIcon />} />;
};
export const IconsUsers: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<UsersIcon />} />;
};
export const IconsWifi: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<WifiIcon />} />;
};
export const IconsSelector: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<SelectorIcon />} />;
};

export const IconsPost: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return (
    <Icons
      overwriteCSS={overwriteCSS}
      icon={
        <svg
          fill={"rgb(239,68,68)"}
          fillOpacity='0.9'
          height={22}
          width={22}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 193.333 200'>
          <path d='M20,0A19.958,19.958,0,0,0,0,20V180a19.958,19.958,0,0,0,20,20H173.332a19.958,19.958,0,0,0,20-20V20a19.958,19.958,0,0,0-20-20ZM36.669,37.495h120v25h-120Zm0,42.5h120v25h-47.5v64.606h-25V105h-47.5Z' />
        </svg>
      }
    />
  );
};
export const IconsTwitter: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return (
    <Icons
      overwriteCSS={overwriteCSS}
      icon={
        <svg
          fill={"rgb(29,161,242)"}
          height={22}
          width={22}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'>
          <path d='M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z' />
        </svg>
      }
    />
  );
};
export const IconsFaceBook: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return (
    <Icons
      overwriteCSS={overwriteCSS}
      icon={
        <svg
          fill={"rgb(59,89,152)"}
          height={22}
          width={22}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'>
          <path d='M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z' />
        </svg>
      }
    />
  );
};
export const IconsInstagram: FC<Omit<IconsProps, "icon">> = ({
  overwriteCSS = "flex-shrink-0 h-6 w-6 text-gray-500",
}) => {
  return (
    <Icons
      overwriteCSS={overwriteCSS}
      icon={
        <svg
          fill={"rgb(76,76,76)"}
          height={22}
          width={22}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 30 30'>
          <circle cx='15' cy='15' r='4' />
          <path d='M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z' />
        </svg>
      }
    />
  );
};
