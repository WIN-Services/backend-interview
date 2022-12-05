import myDate, { MyDateInput } from './Date';

export const formatDateTime = (dateTime: MyDateInput): string =>
  myDate(dateTime).utc().format('dddd, D MMMM YYYY, h:mm:ss a');
export const formatTimeStamp = (dateTime: MyDateInput): string => myDate(dateTime).utc().format('X');
export const formatTimeStampDashBoard = (dateTime: MyDateInput): string => myDate(dateTime).utc().format('X');

export const formatDay = (dateTime: MyDateInput): string => myDate(dateTime).utc().format('dddd');
export const formatDayDashBoard = (dateTime: MyDateInput): string => myDate(dateTime).format('dddd');

export const formatMonth = (dateTime: MyDateInput): string => myDate(dateTime).utc().format('MMM');
export const formatMonthDashboard = (dateTime: MyDateInput): string => myDate(dateTime).format('MMM');

export const formatDate = (dateTime: Date | number | string): string => myDate(dateTime).utc().format('D MMMM YYYY');

export const formatTime = (dateTime: MyDateInput): string => myDate(dateTime).utc().format('H:mm');

// export const stringToDate = (dateString: moment.MomentInput): Date =>
//   moment(dateString, 'D MMMM YYYY').toDate();

export const formatDateForDB = (dateTime: MyDateInput): string => myDate(dateTime).format('YYYY-MM-DD');
