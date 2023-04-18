export const dateFormat = (val: string) => {
  const date = new Date(Date.parse(val)).toLocaleString();
  return date;
};
