import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export default class Role extends Model {
  public id!: number;
  public name!: string;
  public status!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    name: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.TINYINT
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'roles'
  }
);
