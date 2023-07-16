const ticketController = require('../controller/ticket.controller');
const authMiddleWare = require('../middlewares/authmw');
const verifyReqMiddleware = require('../middlewares/verifyTicketReqBody');

module.exports = function (app) {

    app.post('/bcs/api/v1/ticket', [authMiddleWare.verifyToken, verifyReqMiddleware.validateTicketReq],
        ticketController.createTicket);


    app.put('/bcs/api/v1/ticket/:id', [authMiddleWare.verifyToken, verifyReqMiddleware.validateTicketReq],
        ticketController.findTicketById);

    app.get('/bcs/api/v1/ticket/:id',authMiddleWare.verifyToken,
        ticketController.updateTicket);

    app.get('/bcs/api/v1/tickets', authMiddleWare.verifyToken,
        ticketController.getAllTickets);    

}