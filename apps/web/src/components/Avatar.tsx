import clsx from "clsx";
import type { FC } from "react";
import { Avatar as AvatarSimple, AvatarImage, AvatarFallback } from "./ui/avatar";
import { stringAvatar } from "@/utils";

type AvatarProps = {
  url?: string | null;
  name: string;
  size?: string;
} & JSX.IntrinsicElements["div"];

export const Avatar: FC<AvatarProps> = (props) => {
  const { className, size, name, ...otherProps } = props;

  let imageUrl = props.url;
  if (imageUrl) {
    if (imageUrl.startsWith("/")) imageUrl = `${import.meta.env.VITE_STATIC_FILES_URL}${imageUrl}`;

    return (
      <AvatarSimple
        {...otherProps}
        className={clsx(`shadow-sm rounded-full border-2 border-white w-14 h-14`, className)}
      >
        <AvatarImage src={imageUrl} />
      </AvatarSimple>
    );
  }

  const fallbackData = stringAvatar(name);

  return (
    <AvatarSimple
      {...otherProps}
      className={clsx(`shadow-sm select-none text-lg rounded-full border-2 border-white w-14 h-14`, className)}
    >
      <AvatarFallback style={{ backgroundColor: fallbackData.color }} className="font-bold">
        {fallbackData.name}
      </AvatarFallback>
    </AvatarSimple>
  );
};
