const Mock = require('mockjs');
const moment = require('moment');

module.exports = ({ Service }) => {
  class UserService extends Service {
    constructor(ctx) {
      super(ctx);
      this.user = this.ctx.db.user;
    }

    async getUsers(page = 1) {
      return await this.ctx.provider_getJson('/api/v1/users', { page });
    }

    async find(username, password) {
      if (username === 'admin' && password === 'admin') {
        return {
          name: 'admin',
          nickName: 'admin',
        };
      }
      const user = this.user.findOne({
        username,
        password,
      });
      return user;
    }

    async findAll(limit = 50) {
      const user = this.user.find();
      return user.slice(0, limit);
    }

    async create(username, birth, gender, image_url, introduce, state) {
      const user = await this.ctx.provider_postJson('/api/v1/users', { username, birth, gender, image_url, introduce, state });
      console.log('user',user)
      return user;
    }

    async delete(_id) {
      this.user.remove({ _id }, false);
    }
  }

  return UserService;
};
