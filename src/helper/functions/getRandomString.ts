const getRandomString = (): string => {
  return `${Date.now()}${Math.random().toString().replace(".", "")}`;
};

export default getRandomString;
