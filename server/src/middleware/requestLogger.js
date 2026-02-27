// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const ms = Date.now() - start;
    const status = res.statusCode;
    const color = status >= 500 ? '🔴' : status >= 400 ? '🟡' : '🟢';
    console.log(`${color} ${method} ${originalUrl} ${status} ${ms}ms`);
  });

  next();
};

module.exports = requestLogger;
