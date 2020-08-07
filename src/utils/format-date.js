const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
});
export default function formatDate(date) {
  return formatter.format(new Date(date));
}
