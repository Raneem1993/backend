const Router = require('express');
const router = Router();
const Order = require('../models/order.model');




router.post('/create',
async (req, res) => {
    const requestOrder = req.body;
    if(requestOrder.items.length <= 0){
        return res.status(400).send('Cart Is Empty!');
        
    }

    await Order.deleteOne({
        user: req.params.id,
        
    });
    const newOrder = new Order({...requestOrder,user: req.params.id});
    await newOrder.save();
    res.send(newOrder);
})


router.get('/newOrderForCurrentUser',  async (req = any,res ) => {
    const order= await getNewOrderForCurrentUser(req);
    if(order) res.send(order);
    else res.status(401).send();
})

router.post('/pay',  async (req, res) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(400).send('Order Not Found!');
        return;
       
    }

    order.paymentId = paymentId;
    await order.save();

    res.send(order._id);
})

router.get('/track/:id',  async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.send(order);
})


async function getNewOrderForCurrentUser(req ) {
    return await Order.findOne({ user:req.params.id });
}





    
 
   
   










module.exports = router;

