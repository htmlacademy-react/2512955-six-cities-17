const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'GMT',
});

export const getDateDescription = (date: number): string => {
  let result = dateFormatter.format(date);
  // eslint-disable-next-line no-useless-escape
  const matches = /\s\d{1,2}\,/g.exec(dateFormatter.format(date));
  matches?.forEach((current) => {
    result = result.replace(current, '');
  });
  return result;
};
