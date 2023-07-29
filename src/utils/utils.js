export const getCurrentPage = ({ next, prev }) => {
  const regexp = /page=(\d+)/;

  if (next) {
    const result = next.match(regexp)[1] || [];
    return +result - 1;
  } else {
    const result = prev.match(regexp)[1] || [];
    return +result + 1;
  }
};
