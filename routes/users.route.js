const userController= require('../controller/user.controller');
const userMiddleWare= require('../middlewares/authmw')

module.exports= function(app){

    app.get('/bcs/api/v1/users',[userMiddleWare.verifyToken,userMiddleWare.isAdmin],userController.findAll);
    
    app.get('/bcs/api/v1/users/:userId',[userMiddleWare.verifyToken,userMiddleWare.isAdmin],userController.findById);

    app.put('/bcs/api/v1/users/:userId',[userMiddleWare.verifyToken,userMiddleWare.checkForUser],userController.update);
    
}