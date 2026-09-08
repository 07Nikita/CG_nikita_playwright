import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';

const logDirectory = path.resolve('logs');
fs.mkdirSync(logDirectory, { recursive: true });
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: path.join(logDirectory, 'execution.log') })],
});
export function maskSecret(value: string): string { return value ? `${value.slice(0, 1)}***` : ''; }
