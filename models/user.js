'use strict'
export default (sequelize, DataType) => {
  const User = sequelize.define('user',{
    id:{
      type:DataType.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name:{
      type:DataType.STRING,
      allowNull: false,
      validation:{
        notEmpty:true
      }
    },
    sector:{
      type:DataType.STRING,
      allowNull: false,
      validation:{
        notEmpty:true
      }
    },
    ramal:{
      type:DataType.INTEGER,
      allowNull: false,
      validation:{
        notEmpty:true
      }
    },
    base:{
      type:DataType.STRING,
      allowNull: false,
      validation:{
        notEmpty:true
      }
    },
    role:{
      type:DataType.BOOLEAN,
      allowNull: true,
    },
    login:{
      type:DataType.STRING,
      allowNull:true,
      unique:true,
    },
    password:{
      type:DataType.STRING,
      allowNull:true,
    }
  });

  return User;
}
