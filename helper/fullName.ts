const fullNameStr = (firstName: string, lastName: string) => {
  const strMerge = firstName + " " + lastName;
  return strMerge.length > 12 ? strMerge.substring(0, 12) + "..." : strMerge;
};

export default fullNameStr;
