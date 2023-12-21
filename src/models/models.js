const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Houses = sequelize.define('house', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  description_1: { type: DataTypes.STRING, allowNull: true },
  description_2: { type: DataTypes.STRING, allowNull: true },
  description_3: { type: DataTypes.STRING, allowNull: true },
  description_4: { type: DataTypes.STRING, allowNull: true },
  roomCount: { type: DataTypes.INTEGER, allowNull: true },
  roomCategories: { type: DataTypes.STRING, allowNull: true },
  meal: { type: DataTypes.STRING, allowNull: true },
  bookingConditions: { type: DataTypes.STRING, allowNull: true },
  checkoutTime: { type: DataTypes.STRING, allowNull: true },
  timeToSea: { type: DataTypes.STRING, allowNull: true },
  timeToMarket: { type: DataTypes.STRING, allowNull: true },
  timeToCafe: { type: DataTypes.STRING, allowNull: true },
  timeToBusStop: { type: DataTypes.STRING, allowNull: true },
  timeToBusCityCenter: { type: DataTypes.STRING, allowNull: true }
})
const HousesPictures = sequelize.define('housePictures', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  houseId: { type: DataTypes.INTEGER, allowNull: false }
})

//добавить поле этаж!!!
const Rooms = sequelize.define('room', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DOUBLE, allowNull: false },
  roomCount: { type: DataTypes.INTEGER, allowNull: false },
  bedroom: { type: DataTypes.STRING, allowNull: false },
  bathroom: { type: DataTypes.STRING, allowNull: false },
  meal: { type: DataTypes.STRING, allowNull: false },
  facilities: { type: DataTypes.STRING, allowNull: false},
  houseId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Houses', key: 'id' } },
});

const RoomsPictures = sequelize.define('roomPictures', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  roomId: { type: DataTypes.INTEGER, allowNull: false }
})


const Aparts = sequelize.define('apart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DOUBLE, allowNull: false },
  description_1: { type: DataTypes.STRING, allowNull: true },
  description_2: { type: DataTypes.STRING, allowNull: true },
  description_3: { type: DataTypes.STRING, allowNull: true },
  description_4: { type: DataTypes.STRING, allowNull: true },
  roomCount: { type: DataTypes.INTEGER, allowNull: true },
  roomCategories: { type: DataTypes.STRING, allowNull: true },
  meal: { type: DataTypes.STRING, allowNull: true },
  bookingConditions: { type: DataTypes.STRING, allowNull: true },
  checkoutTime: { type: DataTypes.STRING, allowNull: true },
  timeToSea: { type: DataTypes.STRING, allowNull: true },
  timeToMarket: { type: DataTypes.STRING, allowNull: true },
  timeToCafe: { type: DataTypes.STRING, allowNull: true },
  timeToBusStop: { type: DataTypes.STRING, allowNull: true },
  timeToBusCityCenter: { type: DataTypes.STRING, allowNull: true }
})
const ApartsPictures = sequelize.define('apartPictures', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  apartId: { type: DataTypes.INTEGER, allowNull: false }
})

Aparts.hasMany(ApartsPictures, { foreignKey: 'apartId', as: 'apartPictures', onDelete: 'CASCADE' });
ApartsPictures.belongsTo(Aparts, { foreignKey: 'apartId' });


Houses.hasMany(HousesPictures, { foreignKey: 'houseId', as: 'housePictures', onDelete: 'CASCADE' });
HousesPictures.belongsTo(Houses, { foreignKey: 'houseId' });

Rooms.hasMany(RoomsPictures, { foreignKey: 'roomId', as: 'roomPictures', onDelete: 'CASCADE' });
RoomsPictures.belongsTo(Rooms, { foreignKey: 'roomId' });

Houses.hasMany(Rooms, { foreignKey: 'houseId', as: 'rooms', onDelete: 'CASCADE' });
Rooms.belongsTo(Houses, { foreignKey: 'houseId' });




module.exports = { Users, Houses, Aparts, Rooms, HousesPictures, RoomsPictures, ApartsPictures };
