const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true, notEmpty: true, } },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
}, { paranoid: true });

const Roles = sequelize.define('roles', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const UserRoles = sequelize.define('userRoles', {
  userId: { type: DataTypes.INTEGER, references: { model: Users, key: 'id', } },
  roleId: { type: DataTypes.INTEGER, references: { model: Roles, key: 'id', } },
});

Users.belongsToMany(Roles, { through: UserRoles, foreignKey: 'userId' });
Roles.belongsToMany(Users, { through: UserRoles, foreignKey: 'roleId' });


const Houses = sequelize.define('house', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
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
  timeToBusCityCenter: { type: DataTypes.STRING, allowNull: true },
  internet: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  allHouseBooking: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  tv: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  pool: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  babyCot: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  yard: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  dishwasher: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  washingMachine: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  diningArea: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  freeParking: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  roomCleaning: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  beddingChange: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  sharedKitchen: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  iron: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  bbqGrill: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  refrigerator: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  transferService: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  laundryService: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false }
}, { paranoid: true })

const HousesPictures = sequelize.define('housePictures', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  houseId: { type: DataTypes.INTEGER, allowNull: false }
})

const Rooms = sequelize.define('room', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.DOUBLE, allowNull: true },
  roomCount: { type: DataTypes.INTEGER, allowNull: true },
  bedCount: { type: DataTypes.INTEGER, allowNull: true },
  bedroom: { type: DataTypes.STRING, allowNull: true },
  bathroom: { type: DataTypes.ENUM, allowNull: true, values: ['в номере', 'на этаже'] },
  bathType: { type: DataTypes.ENUM, allowNull: true, values: ['ванна', 'душ'] },
  meal: { type: DataTypes.ENUM, allowNull: true, values: ['в номере', 'отдельно'] },
  facilities: { type: DataTypes.STRING, allowNull: true },
  robotCleaner: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  yandexColumn: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  level: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
  houseId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'houses', key: 'id' } },
}, { paranoid: true });

const RoomsPictures = sequelize.define('roomPictures', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  roomId: { type: DataTypes.INTEGER, allowNull: false }
})


const Aparts = sequelize.define('apart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.DOUBLE, allowNull: true },
  description_1: { type: DataTypes.STRING, allowNull: true },
  description_2: { type: DataTypes.STRING, allowNull: true },
  description_3: { type: DataTypes.STRING, allowNull: true },
  description_4: { type: DataTypes.STRING, allowNull: true },
  bedCount: { type: DataTypes.INTEGER, allowNull: true },
  roomCount: { type: DataTypes.INTEGER, allowNull: true },
  roomCategories: { type: DataTypes.STRING, allowNull: true },
  meal: { type: DataTypes.ENUM, allowNull: true, values: ['в номере', 'отдельно'] },
  bathroom: { type: DataTypes.ENUM, allowNull: true, values: ['в номере', 'на этаже'] },
  bathType: { type: DataTypes.ENUM, allowNull: true, values: ['ванна', 'душ'] },
  bookingConditions: { type: DataTypes.STRING, allowNull: true },
  checkoutTime: { type: DataTypes.STRING, allowNull: true },
  timeToSea: { type: DataTypes.STRING, allowNull: true },
  timeToMarket: { type: DataTypes.STRING, allowNull: true },
  timeToCafe: { type: DataTypes.STRING, allowNull: true },
  timeToBusStop: { type: DataTypes.STRING, allowNull: true },
  timeToBusCityCenter: { type: DataTypes.STRING, allowNull: true },
  level: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
  internet: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  robotCleaner: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  yandexColumn: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  tv: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  pool: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  babyCot: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  yard: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  dishwasher: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  washingMachine: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  diningArea: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  freeParking: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  roomCleaning: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  beddingChange: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  sharedKitchen: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  iron: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  bbqGrill: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  refrigerator: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  transferService: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  laundryService: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false }
}, { paranoid: true })

const ApartsPictures = sequelize.define('apartPictures', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  apartId: { type: DataTypes.INTEGER, allowNull: false }
})

const Bookings = sequelize.define('booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  guestName: { type: DataTypes.STRING, allowNull: true },
  guestContact: { type: DataTypes.STRING, allowNull: false },
  checkInDate: { type: DataTypes.DATE, allowNull: false },
  checkOutDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM, allowNull: true, values: ['В ожидании', 'Отменён', 'Подтверждён'] },
  itemId: { type: DataTypes.INTEGER, allowNull: false },
  itemName: { type: DataTypes.STRING, allowNull: false },
  itemType: { type: DataTypes.STRING, allowNull: false },
  dailyRate: { type: DataTypes.DECIMAL, allowNull: false },
  totalCost: { type: DataTypes.DECIMAL, allowNull: true, defaultValue: 0 },
  address: { type: DataTypes.STRING, allowNull: false },
  houseName: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  guestsCount: { type: DataTypes.INTEGER, allowNull: false },
  petBreed: { type: DataTypes.STRING, allowNull: true, defaultValue: false },
  petWeight: { type: DataTypes.DECIMAL, allowNull: true, defaultValue: false },
  childAge: { type: DataTypes.INTEGER, allowNull: true },
  smoker: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  disabledAccess: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  economyAccommodation: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  maxServiceAccommodation: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  discounts: { type: DataTypes.STRING, allowNull: true },
  bonuses: { type: DataTypes.STRING, allowNull: true },
  transfer: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  breakfastIncluded: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  toursIncluded: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  workInternet: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
}, { paranoid: true });



Aparts.hasMany(ApartsPictures, { foreignKey: 'apartId', as: 'apartPictures', onDelete: 'CASCADE' });
ApartsPictures.belongsTo(Aparts, { foreignKey: 'apartId' });

Houses.hasMany(HousesPictures, { foreignKey: 'houseId', as: 'housePictures', onDelete: 'CASCADE' });
HousesPictures.belongsTo(Houses, { foreignKey: 'houseId' });

Rooms.hasMany(RoomsPictures, { foreignKey: 'roomId', as: 'roomPictures', onDelete: 'CASCADE' });
RoomsPictures.belongsTo(Rooms, { foreignKey: 'roomId' });

Houses.hasMany(Rooms, { foreignKey: 'houseId', as: 'rooms', onDelete: 'CASCADE' });
Rooms.belongsTo(Houses, { foreignKey: 'houseId' });




module.exports = { Users, Roles, UserRoles, Houses, Aparts, Rooms, HousesPictures, RoomsPictures, ApartsPictures, Bookings };
