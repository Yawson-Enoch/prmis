export const formatDate = (
  country: 'US' | 'UK',
  style: 'full' | 'long' | 'medium' | 'short',
  date = new Date()
): string => {
  const { format } = new Intl.DateTimeFormat(`en-${country}`, {
    dateStyle: style,
  });
  return format(date).toString();
};
