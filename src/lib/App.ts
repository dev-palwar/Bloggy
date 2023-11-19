export const formateDate = (dateString: string): string => {
  const date = new Date(parseInt(dateString, 10));
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const truncateText = (html: string, maxWords: number) => {
  // Removes extra spaces and line breaks
  const cleanedText = html.trim().replace(/\s+/g, " ");

  // Removes HTML tags
  const plainText = cleanedText.replace(/<[^>]*>/g, "");

  // Splits the cleaned text into words
  const words = plainText.split(" ");

  // Truncates the text to the specified number of words
  const truncatedText = words.slice(0, maxWords).join(" ");

  // Adds back the HTML tags
  const truncatedHtml = truncatedText + (words.length > maxWords ? "..." : ""); 
  // Adds ellipsis if truncated

  return truncatedHtml;
};
