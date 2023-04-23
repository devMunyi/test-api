'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'addedBy', as: 'user' });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }

  }
  Skill.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    addedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_users',
        key: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    },
    csv: {
      type: DataTypes.TEXT
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'tbl_skills'
  });
  return Skill;
};