export const generateSixDigitsCode = () => {
  return new Promise<number>((resolve, rejects) => {
    let numbers = [0, 0, 0, 0, 0, 0];
    numbers = numbers.map(() => {
      return Math.floor(Math.random() * 9);
    });
    const code = numbers.join('');
    const numberCode = parseInt(code);
    if (numberCode.toString().length !== 6) {
      rejects();
    }
    resolve(numberCode);
  });
};
