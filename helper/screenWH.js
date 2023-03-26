const getScreenWH = () => {
  const result = {};
  const detectSize = () => {
    result = {
      winWidth: typeof window !== "undefined" && window.innerWidth,
      winHeight: typeof window !== "undefined" && window.innerHeight,
    };
  };

  typeof window !== "undefined" &&
    window.addEventListener("resize", detectSize);

  return result;
};

export default getScreenWH;
