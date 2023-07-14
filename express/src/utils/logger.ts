import { hideTokens } from './hideTokens';

type LoggerLevel = 'error' | 'info' | 'warn';

const log = (level: LoggerLevel, message: string, data?: unknown, location?: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(level, message, data);
    return;
  }

  const logData = {
    time: new Date().toISOString(),
    level: level.toUpperCase(),
    location: location ? location : 'server',
    message,
    // If data is from http middleware allow those fields, stringify objects/arrays, pass strings and numbers
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: location === 'http' ? data : typeof data === 'object' ? JSON.stringify(hideTokens(data)) : data,
  };

  //TODO:: add prod logging
};

export default log;
