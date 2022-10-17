const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
    type: DataTypes.DATE,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'user_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, userSchema, User };
