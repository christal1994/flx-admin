module.exports = (app) => {
  class DashboardController extends app.Controller {
    async index() {
      const { ctx } = this;
      ctx.body = await this.service.user.findAll();
      ctx.status = 200;
    }

    async create() {
      const { ctx } = this;
      const {
        username,
        birth,
        gender,
        image_url,
        introduce,
        state,
      } = ctx.request.body;
      const user = await this.service.user.create(
        username,
        birth,
        gender,
        image_url,
        introduce,
        state,
      );
      ctx.body = user;
      ctx.status = 201;
    }

    async destroy() {
      const { ctx } = this;
      const { id } = ctx.params;
      await this.service.user.delete(id);
      ctx.status = 204;
    }
  }

  return DashboardController;
};
