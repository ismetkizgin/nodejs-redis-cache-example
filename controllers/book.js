const config = require("../utils/config");
const Redis = require("../utils/redis");
const redisClient = new Redis(config.redis);
const HttpStatusCode = require("http-status-codes");

class Book {
  static async getAsync(req, res) {
    try {
      const cacheName = `bookPaginationCache_${req.query.limit}_${req.query.offset}`;
      await redisClient.setAsync(cacheName, JSON.stringify(cacheName));
      res.send(cacheName);
    } catch (err) {
      res
        .status(err?.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(err.message);
    }
  }

  static async checkCacheAsync(req, res, next) {
    try {
      const cacheName = `bookPaginationCache_${req.query.limit}_${req.query.offset}`;
      const response = await redisClient.getAsync(cacheName);
      if (response) res.send(response);
      else next();
    } catch (err) {
      res
        .status(err?.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(err.message);
    }
  }

  static async insertAsync(req, res) {
    try {
      await redisClient.deleteWildcardAsync("bookPaginationCache_*");
      res.send("OK");
    } catch (err) {
      res
        .status(err?.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(err.message);
    }
  }
}

module.exports = Book;
