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

// Generate avatar based on name
export function stringAvatar(name: string) {
  const nameUpperLetters = name.replace(/[^A-Z]+/g, "");
  if (nameUpperLetters.length < 2) {
    return {
      color: stringToColor(name),
      name: name[0],
    };
  }
  return {
    color: stringToColor(name),
    name: `${nameUpperLetters[0]}${nameUpperLetters[1]}`,
  };
}
