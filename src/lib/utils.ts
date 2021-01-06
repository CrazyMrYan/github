import dayjs from 'dayjs';
import { TIMEOUT, YEAR_START, YEAR_END, YEAR_LAST } from '@/lib/constant';

export const qs = () => {
  const { href } = window.location;
  const result: any = {};
  let param = null;
  const reg = /[?&](.*?)=([^&#]*)/g;
  param = reg.exec(href);
  while (param) {
    try {
      result[param[1]] = decodeURIComponent(param[2]);
    } catch (e) {
      try {
        result[param[1]] = unescape(param[2]);
      } catch (escapeErr) {
        result[param[1]] = param[2]; // eslint-disable-line
      }
    }
    param = reg.exec(href);
  }
  return result;
};

export const pick = (obj: any, propertyArr: string[] = []) => {
  const pickObj: any = {};
  propertyArr.forEach(property => {
    if (typeof obj[property] !== 'undefined') {
      pickObj[property] = obj[property];
    }
  });
  return pickObj;
};

export const timeoutFn = (promise: any) => Promise.race([
  promise,
  new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error('request timeout'));
    }, TIMEOUT);
  }),
]);

export const inStartEndYear = (date?: string) => {
  const temp = dayjs(date);
  const start = dayjs(YEAR_START);
  const end = dayjs(YEAR_END);
  return temp.isBefore(end, 'day') && temp.isAfter(start, 'day');
};

export const inLastStartYear = (date: string) => {
  const temp = dayjs(date);
  const start = dayjs(YEAR_LAST);
  const end = dayjs(YEAR_START);
  return temp.isBefore(end, 'day') && temp.isAfter(start, 'day');
};

export const toPercent = (point: number) => {
  const str = `${Number(point * 100).toFixed(2)}%`;
  return str;
};

export const compareYearData = (year: any, lastYear: any) => {
  let result = '';
  if (year === lastYear) {
    result = '今年和去年持平';
  } else {
    result = `${year > lastYear ? '同比增长' : '同比减少'} ${toPercent((year - lastYear) / lastYear)}，继续加油`;
  }
  return result;
};

export const fetchImage = (url: string) => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = url;
  // eslint-disable-next-line func-names
  img.onload = function () {
    resolve();
  };
  // eslint-disable-next-line func-names
  img.onerror = function () {
    reject();
  };
});
