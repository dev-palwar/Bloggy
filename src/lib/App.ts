export const formateDate = (dateString: string): string => {
  const date = new Date(parseInt(dateString, 10));
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  const truncatedText = words.slice(0, maxWords).join(" ");
  return truncatedText;
};
