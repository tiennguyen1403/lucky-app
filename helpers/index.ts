export const randomId = (length = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const randomValue = (min: number, max: number, step: number): number => {
  if (step <= 0) throw new Error("Step must be a positive number");

  const steps = Math.floor((max - min) / step) + 1;

  const randomStep = Math.floor(Math.random() * steps);

  return min + randomStep * step;
};

export const generateRandomId = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};
