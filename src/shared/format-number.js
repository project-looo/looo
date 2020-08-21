const formatter = Intl.NumberFormat(undefined, {});

export default function formatNumber(number = 0) {
  return formatter.format(number);
}
