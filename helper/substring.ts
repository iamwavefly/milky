const substring = (text: string, len: number) => {
  return text.length > len ? text.substring(0, len) + "..." : text;
};

export default substring;
