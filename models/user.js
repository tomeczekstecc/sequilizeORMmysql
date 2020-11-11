'use strict';
const {
  foreign_key
} = require('inflection');
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
    static associate({
      Post
    }) {
      this.hasMany(Post, {
        foreign_key: "userId",
        as: 'posts'
      })
    }

    // nadpisz output  np w celu ukrycia jakiegoś pola
    toJSON() {
      return {
        ...this.get(),
        id: undefined
      }
    }

  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User must have a name'
        },
        notEmpty: {
          msg: 'User must have a name'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Należy podać prawidłowy adres email'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};