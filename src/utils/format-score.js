const formatter = Intl.NumberFormat(undefined, {});

export default function formatScore(number = 0) {
  return formatter.format(Math.round(number));
}
