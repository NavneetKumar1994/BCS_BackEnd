const authController= require('../controller/auth.controller');

module.exports= function(app){
    app.post("/bcs/auth/signup",authController.signup);

    app.post("/bcs/auth/signin",authController.signin);

}