import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const { id, name, email, provider } = await User.create(req.body);

      return res.json({ id, name, email, provider });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

export default new UserController();
