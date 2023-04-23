'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Skill }) {
      // define association here
      this.hasOne(Skill, { foreignKey: 'addedBy' })
    }

    //override response body 
    toJSON() {
      return { ...this.get(), id: undefined, deletedAt: undefined, password: undefined }
    }
  }
  User.init({
    uuid: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    technical_skills: {
      type: DataTypes.TEXT
    },
    soft_skills: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'tbl_users',
    paranoid: true, // for soft deletion
  });
  return User;
};