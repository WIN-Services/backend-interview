import { Configs } from '../config/config';

export const checkCors = (url: string): boolean => {
  return true;
  if (Configs().env === 'production' || 'prod') {
    return false;
  } else if (Configs().env === 'development' || 'dev') {
    return (
      url === 'http://localhost:3000' ||
      url === 'http://localhost:9000' ||
      url === 'https://yoyo-dev.homingos.com'
    );
  } else if (Configs().env === 'stage') {
    return true;
  } else if (Configs().env === 'acceptance') {
    return false;
  } else if (Configs().env === 'test') {
    return false;
  } else if (Configs().env === 'local_development') {
    return (
      url === 'http://localhost:3000' ||
      url === 'http://localhost:9000' ||
      url === 'https://yoyo-dev.homingos.com'
    );
  }
};