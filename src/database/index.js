import Sequelize from 'sequelize';

import User from '../app/models/User';
import Transaction from '../app/models/Payment/Transaction';

import databaseConfig from '../config/database';

const models = [User, Transaction];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
