export const formateDate = (dateString: string) : string => {
  const date = new Date(parseInt(dateString, 10));
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
