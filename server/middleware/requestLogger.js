import logger from '../utils/logger.js';

export function logRequests(req, res, next) {
  const logMessage = ` ${req.method} ${req.originalUrl} - body: ${JSON.stringify(req.body)} - query: ${JSON.stringify(req.query)}`;
  
  logger.info(logMessage);

  next();
}

