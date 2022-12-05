const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ONE_DAY: number = 1000 * 60 * 60 * 24;
const ONE_WEEK: number = 1000 * 60 * 60 * 24 * 7;
const ONE_HOUR: number = 1000 * 60 * 60;
const ONE_MINUTE: number = 1000 * 60;
const ONE_SECOND = 1000;

export type MyDateInput = number | string | Date | undefined | null;
export type MyDate = {
  value: Date;
  isUtc: boolean;
  isUTC(): boolean;
  utc(): MyDate;
  format(string: string): string;
  matchPattern(pattern: string): string | number;
  date(): number;
  day(): string;
  month(): string;
  monthNumber(): number;
  year(): number;
  hours12(): number;
  hours24(): number;
  minutes(): number;
  seconds(): number;
  getDayOfYear(): number;
  formatAMPM(): string;
  formatAMPM(): string;
  valueOf(): number;
  add(amount: number, unit: string): MyDate;
  toDate(): Date;
  hour(number: number): MyDate;
  minute(number: number): MyDate;
  second(number: number): MyDate;
};

export default function myDate(date: MyDateInput): MyDate {
  const newDate = date || new Date();
  return {
    value: new Date(newDate),
    isUtc: false,
    isUTC(): boolean {
      return this.isUtc;
    },
    utc() {
      this.isUtc = true;
      return this;
    },

    format(string: string): string {
      const dateRegex =
        /(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|S{1,9}|yo?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|x|X|zz?|ZZ?)/g;
      const patternArray = string.split(dateRegex);
      let output = '';
      for (const pattern of patternArray) {
        output += this.matchPattern(pattern);
      }
      return output;
    },
    matchPattern(pattern) {
      switch (pattern) {
        case 'd':
          return this.isUTC() ? this.value.getUTCDay() : this.value.getDay();
        case 'dd':
          return this.day().slice(0, 2);
        case 'ddd':
          return this.day().slice(0, 3);
        case 'dddd':
          return this.day();

        case 'D':
          return this.date();
        case 'DD':
          return `0${this.date()}`.slice(-2);
        case 'DDD':
          return this.getDayOfYear();
        case 'DDDD':
          return `0${this.getDayOfYear()}`.slice(-3);

        case 'M':
          return this.monthNumber();
        case 'MM':
          return `0${this.monthNumber()}`.slice(-2);
        case 'MMM':
          return this.month().slice(0, 3);
        case 'MMMM':
          return this.month();

        case 'y':
        case 'yy':
        case 'yyy':
        case 'yyyy':
        case 'YYYY':
        case 'Y':
          return this.year();
        case 'YY':
          return this.year().toString().slice(-2);

        case 'h':
          return this.hours12();
        case 'H':
          return this.hours24();
        case 'hh':
          return `0${this.hours12()}`.slice(-2);
        case 'HH':
          return `0${this.hours24()}`.slice(-2);

        case 'm':
          return this.minutes();
        case 'mm':
          return `0${this.minutes()}`.slice(-2);

        case 's':
          return this.seconds();
        case 'ss':
          return `0${this.seconds()}`.slice(-2);
        case 'a':
        case 'A':
          return this.formatAMPM();

        case 'x':
          return this.valueOf();
        case 'X':
          return Math.floor(this.valueOf() / 1000);
        default:
          return pattern;
      }
    },
    date() {
      return this.isUTC() ? this.value.getUTCDate() : this.value.getDate();
    },
    day() {
      return this.isUTC() ? days[this.value.getUTCDay()] : days[this.value.getDay()];
    },
    month() {
      return this.isUTC() ? months[this.value.getUTCMonth()] : months[this.value.getMonth()];
    },
    monthNumber() {
      return this.isUTC() ? this.value.getUTCMonth() + 1 : this.value.getMonth() + 1;
    },
    year() {
      return this.isUTC() ? this.value.getUTCFullYear() : this.value.getFullYear();
    },
    hours12() {
      return this.isUTC() ? (this.value.getUTCHours() + 24) % 12 || 12 : (this.value.getHours() + 24) % 12 || 12;
    },
    hours24() {
      return this.isUTC() ? this.value.getUTCHours() : this.value.getHours();
    },
    minutes() {
      return this.isUTC() ? this.value.getUTCMinutes() : this.value.getMinutes();
    },
    seconds() {
      return this.isUTC() ? this.value.getUTCSeconds() : this.value.getSeconds();
    },
    getDayOfYear() {
      const now = this.value;
      const start = this.isUTC() ? new Date(now.getUTCFullYear(), 0, 0) : new Date(now.getFullYear(), 0, 0);
      const diff = now.valueOf() - start.valueOf();
      const day = Math.floor(diff / ONE_DAY);
      return day;
    },
    formatAMPM() {
      const hours = this.isUTC() ? this.value.getUTCHours() : this.value.getHours();

      const ampm = hours >= 12 ? 'pm' : 'am';
      return ampm;
    },
    valueOf() {
      return this.value.valueOf();
    },
    add(amount, unit) {
      const lowercaseUnit = unit.toLowerCase();
      switch (lowercaseUnit) {
        case 'y':
        case 'Y':
        case 'year':
        case 'years':
          this.value.setFullYear(this.value.getFullYear() + amount);
          return this;

        case 'd':
        case 'day':
        case 'days':
          this.value = new Date(this.valueOf() + amount * ONE_DAY);
          return this;

        case 'm':
        case 'minutes':
        case 'minute':
          this.value = new Date(this.valueOf() + amount * ONE_MINUTE);
          return this;

        case 'h':
        case 'hours':
        case 'hour':
          this.value = new Date(this.valueOf() + amount * ONE_HOUR);
          return this;

        case 's':
        case 'second':
        case 'seconds':
          this.value = new Date(this.valueOf() + amount * ONE_SECOND);
          return this;

        case 'ms':
        case 'milliseconds':
        case 'millisecond':
          this.value = new Date(this.valueOf() + amount);
          return this;

        case 'week':
        case 'weeks':
        case 'w':
          this.value = new Date(this.valueOf() + amount * ONE_WEEK);
          return this;

        default:
          return this;
      }
    },
    toDate() {
      return this.value;
    },
    hour(number) {
      if (this.isUTC()) {
        this.value.setUTCHours(number);
      } else {
        this.value.setHours(number);
      }
      return this;
    },
    minute(number) {
      if (this.isUTC()) {
        this.value.setUTCMinutes(number);
      } else {
        this.value.setMinutes(number);
      }
      return this;
    },
    second(number) {
      if (this.isUTC()) {
        this.value.setUTCSeconds(number);
      } else {
        this.value.setSeconds(number);
      }
      return this;
    },
  };
}
