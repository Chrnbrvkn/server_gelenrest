const Router = require('express')
const router = new Router()
const upload = require('../multerConfig');

const userController = require('../controllers/userController')
const houseController = require('../controllers/houseController')
const apartController = require('../controllers/apartController')
const roomController = require('../controllers/roomController')
const housesPicturesController = require('../controllers/housesPicturesController')
const apartsPicturesController = require('../controllers/apartsPicturesController')
const roomsPicturesController = require('../controllers/roomsPicturesController')

// users
router.get('/users', userController.getUsers)
router.get('/users/:userId', userController.getOneUser)
router.post('/users', upload.none(), userController.createUser)
router.patch('/users/:userId', upload.none(), userController.updateUser)
router.delete('/users/:userId', userController.deleteUser)
// houses
router.get('/houses', houseController.getHouses)
router.get('/houses/:houseId', houseController.getOneHouse)
router.post('/houses', upload.none(), houseController.createHouse)
router.patch('/houses/:houseId', upload.none(), houseController.updateHouse)
router.delete('/houses/:houseId', houseController.deleteHouse)
// aparts
router.get('/aparts', apartController.getAparts)
router.get('/aparts/:apartId', apartController.getOneApart)
router.post('/aparts', upload.none(), apartController.createApart)
router.patch('/aparts/:apartId', upload.none(), apartController.updateApart)
router.delete('/aparts/:apartId', apartController.deleteApart)
// rooms
router.get('/rooms', roomController.getAllRooms)
router.get('/rooms/:houseId', roomController.getRooms)
router.get('/rooms/:houseId/:roomId', roomController.getOneRoom)
router.post('/rooms/:houseId', upload.none(), roomController.createRoom)
router.patch('/rooms/:houseId/:roomId', upload.none(), roomController.updateRoom)
router.delete('/rooms/:houseId/:roomId', roomController.deleteRoom)
// houses pictures
router.get('/house/pictures', housesPicturesController.getAllPictures)
router.get('/house/:houseId/pictures', housesPicturesController.getPictures)
router.get('/house/:houseId/pictures/:imageId', housesPicturesController.getOnePicture)
router.post('/house/:houseId/pictures', upload.array('housesPictures', 10), housesPicturesController.uploadPictures)
router.delete('/house/:houseId/pictures/:imageId', housesPicturesController.deletePicture)
// aparts pictures
router.get('/apart/pictures', apartsPicturesController.getAllPictures)
router.get('/apart/:apartId/pictures', apartsPicturesController.getPictures)
router.get('/apart/:apartId/pictures/:imageId', apartsPicturesController.getOnePicture)
router.post('/apart/:apartId/pictures', upload.array('apartsPictures', 10), apartsPicturesController.uploadPictures)
router.delete('/apart/:apartId/pictures/:imageId', apartsPicturesController.deletePicture)
// rooms pictures
router.get('/room/pictures', roomsPicturesController.getAllPictures)
router.get('/room/:roomId/pictures', roomsPicturesController.getPictures)
router.get('/room/:roomId/pictures/:imageId', roomsPicturesController.getOnePicture)
router.post('/room/:roomId/pictures', upload.array('roomsPictures', 10), roomsPicturesController.uploadPictures)
router.delete('/room/:roomId/pictures/:imageId', roomsPicturesController.deletePicture)

module.exports = router