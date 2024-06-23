import clsx from "clsx";
import type { FC } from "react";
import { Avatar as AvatarSimple, AvatarImage, AvatarFallback } from "./ui/avatar";

// Get random number based on name
// Source: https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

// Get random avatar based on name
function stringAvatar(name: string) {
  const nameUpperLetters = name.replace(/[^A-Z]+/g, "");
  return {
    color: stringToColor(name),
    name: `${nameUpperLetters[0]}${nameUpperLetters[1]}`,
  };
}

type AvatarProps = {
  url?: string | null;
  name: string;
  size?: string;
} & JSX.IntrinsicElements["div"];

export const Avatar: FC<AvatarProps> = (props) => {
  const { className, size, name, ...otherProps } = props;

  let imageUrl = props.url;
  if (imageUrl) {
    if (imageUrl.startsWith("/")) imageUrl = process.env.NEXT_PUBLIC_API_URL + imageUrl;

    return (
      <AvatarSimple {...otherProps} className={clsx(`w-${size || "14"} h-${size || "14"} shadow-sm`, className)}>
        <AvatarImage src={imageUrl} />
      </AvatarSimple>
    );
  }

  const fallbackData = stringAvatar(name);

  return (
    <AvatarSimple
      {...otherProps}
      className={clsx(`w-${size || "14"} h-${size || "14"} shadow-sm select-none`, className)}
    >
      <AvatarFallback style={{ backgroundColor: fallbackData.color }} className=" font-bold text-lg">
        {fallbackData.name}
      </AvatarFallback>
    </AvatarSimple>
  );
};
