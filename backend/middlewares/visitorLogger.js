const VisitorLog = require('../models/VisitorLog');

module.exports = async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.useragent.source;

    await VisitorLog.create({
      ip,
      userAgent,
      path: req.originalUrl
    });
  }
  next();
};
