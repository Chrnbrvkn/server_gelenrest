const Router = require('express')
const router = new Router()

const DEV_ACCESS = process.env.DEV_ACCESS.split(',');
const MAIN_ACCESS = process.env.MAIN_ACCESS.split(',');
const ADMIN_ACCESS = process.env.ADMIN_ACCESS.split(',');
const USER_ACCESS = process.env.USER_ACCESS.split(',');

console.log(`ADMIN_ACCESS: ${ADMIN_ACCESS}`);

const { upload, processAndSaveImage } = require('../middleware/multerConfig.js');
const { verifyToken } = require('../middleware/verifyToken.js');
const { checkRole } = require('../middleware/checkRole.js');

const authController = require('../controllers/authController.js')
const userController = require('../controllers/userController')
const houseController = require('../controllers/houseController')
const apartController = require('../controllers/apartController')
const roomController = require('../controllers/roomController')
const housesPicturesController = require('../controllers/housesPicturesController')
const apartsPicturesController = require('../controllers/apartsPicturesController')
const roomsPicturesController = require('../controllers/roomsPicturesController')

const bookingController = require('../controllers/bookingController')

const { sendModalCallback } = require('../controllers/tgBotController');



// users
router.get('/test', userController.test)
router.get('/users', verifyToken, checkRole(ADMIN_ACCESS), userController.getUsers)
router.get('/users/:userId', verifyToken, checkRole(ADMIN_ACCESS), userController.getOneUser)
router.post('/users', verifyToken, checkRole(DEV_ACCESS), upload.none(), userController.createUser)
router.patch('/users/:userId', verifyToken, checkRole(DEV_ACCESS), upload.none(), userController.updateUser)
router.delete('/users/:userId', verifyToken, checkRole(DEV_ACCESS), userController.deleteUser)

// auth
// router.post('/registration', authController.registration)
// router.post('/createRoles', authController.createRole)
router.post('/login', authController.login)
router.get('/getRoles', authController.getRoles)
router.get('/getUserRoles', verifyToken, checkRole(ADMIN_ACCESS), authController.getUserRoles)
// проверка валидности токена
router.get('/validate-token', verifyToken, authController.validateToken);

// houses
router.get('/houses', houseController.getHouses)
router.get('/houses/:houseId', houseController.getOneHouse)
router.post('/houses', verifyToken, checkRole(ADMIN_ACCESS), upload.none(), houseController.createHouse)
router.patch('/houses/:houseId', verifyToken, checkRole(ADMIN_ACCESS), upload.none(), houseController.updateHouse)
router.delete('/houses/:houseId', verifyToken, checkRole(ADMIN_ACCESS), houseController.deleteHouse)
// aparts
router.get('/aparts', apartController.getAparts)
router.get('/aparts/:apartId', apartController.getOneApart)
router.post('/aparts', verifyToken, checkRole(ADMIN_ACCESS), upload.none(), apartController.createApart)
router.patch('/aparts/:apartId', verifyToken, checkRole(ADMIN_ACCESS), upload.none(), apartController.updateApart)
router.delete('/aparts/:apartId', verifyToken, checkRole(ADMIN_ACCESS), apartController.deleteApart)
// rooms
router.get('/rooms', roomController.getAllRooms)
router.get('/rooms/:houseId', roomController.getRooms)
router.get('/rooms/:houseId/:roomId', roomController.getOneRoom)
router.post('/rooms/:houseId', verifyToken, checkRole(ADMIN_ACCESS), upload.none(), roomController.createRoom)
router.patch('/rooms/:houseId/:roomId', verifyToken, checkRole(ADMIN_ACCESS), upload.none(), roomController.updateRoom)
router.delete('/rooms/:houseId/:roomId', verifyToken, checkRole(ADMIN_ACCESS), roomController.deleteRoom)
// houses pictures
router.get('/house/pictures', housesPicturesController.getAllPictures)
router.get('/house/:houseId/pictures', housesPicturesController.getPictures)
router.get('/house/:houseId/pictures/:imageId', housesPicturesController.getOnePicture)
router.post('/house/:houseId/pictures', verifyToken, checkRole(ADMIN_ACCESS), upload.array('housesPictures', 10), processAndSaveImage, housesPicturesController.uploadPictures)
router.delete('/house/:houseId/pictures/:imageId', verifyToken, checkRole(ADMIN_ACCESS), housesPicturesController.deletePicture)
// aparts pictures
router.get('/apart/pictures', apartsPicturesController.getAllPictures)
router.get('/apart/:apartId/pictures', apartsPicturesController.getPictures)
router.get('/apart/:apartId/pictures/:imageId', apartsPicturesController.getOnePicture)
router.post('/apart/:apartId/pictures', verifyToken, checkRole(ADMIN_ACCESS), upload.array('apartsPictures', 10), processAndSaveImage, apartsPicturesController.uploadPictures)
router.delete('/apart/:apartId/pictures/:imageId', verifyToken, checkRole(ADMIN_ACCESS), apartsPicturesController.deletePicture)
// rooms pictures
router.get('/room/pictures', roomsPicturesController.getAllPictures)
router.get('/room/:roomId/pictures', roomsPicturesController.getPictures)
router.get('/room/:roomId/pictures/:imageId', roomsPicturesController.getOnePicture)
router.post('/room/:roomId/pictures', verifyToken, checkRole(ADMIN_ACCESS), upload.array('roomsPictures', 10), processAndSaveImage, roomsPicturesController.uploadPictures)
router.delete('/room/:roomId/pictures/:imageId', verifyToken, checkRole(ADMIN_ACCESS), roomsPicturesController.deletePicture)

// booking
router.get('/reservedDates', bookingController.getReservedDates)
router.get('/booking', verifyToken, checkRole(ADMIN_ACCESS), bookingController.getBookings)
router.get('/booking/:bookingId', verifyToken, checkRole(ADMIN_ACCESS), bookingController.getOneBooking)
router.post('/booking', verifyToken, checkRole(ADMIN_ACCESS), bookingController.createBooking)
router.patch('/booking/:bookingId', verifyToken, checkRole(ADMIN_ACCESS), bookingController.updateBooking)
router.delete('/booking/:bookingId', verifyToken, checkRole(ADMIN_ACCESS), bookingController.deleteBooking)
// tgBot
router.post('/callback-modal', sendModalCallback);
module.exports = router