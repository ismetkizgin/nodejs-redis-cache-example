const redis = require("redis");

class Redis {
  constructor({ host, port, password, database }) {
    this.client = redis.createClient({
      socket: { host, port },
      password,
    });
    this.client.connect();
  }

  setAsync(key, value, options = null) {
    return this.client.set(key, value, options);
  }

  getAsync(key) {
    return this.client.get(key);
  }

  async deleteWildcardAsync(key) {
    const keys = await this.client.keys(key);
    return this.client.del(keys);
  }
}

module.exports = Redis;
