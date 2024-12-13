export interface RespCurrencyRates {
  base: string;
  rates: {
    USD: number;
    EUR: number;
  };
}

export const fetchFakeCurrencyRates = (): Promise<RespCurrencyRates> => {
  return new Promise((resolve) => {
    const getRandomRate = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    setTimeout(() => {
      resolve({
        base: "RU",
        rates: {
          USD: getRandomRate(95, 110),
          EUR: getRandomRate(100, 115),
        },
      });
    }, 1000);
  });
};
