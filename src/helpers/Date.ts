export const ISOStringToDate = (data: any) => {
  const dateTime = new Date(data);

  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const ISOStringToTime = (data: any) => {
  const dateTime = new Date(data);

  const hours = dateTime.getHours() % 12 || 12;
  const minutes = dateTime.getMinutes();
  const ampm = dateTime.getHours() >= 12 ? 'pm' : 'am';

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;
  return formattedTime;
};
