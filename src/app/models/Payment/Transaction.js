import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.STRING,
        code: Sequelize.STRING,
        reference: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Transaction;
