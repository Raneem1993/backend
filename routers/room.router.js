const Router = require('express');
const Room = require('../models/room.model');
const asyncHandler = require('express-async-handler');
const router = Router();

router.get("/", async (req, res) => {
    const rooms = await Room.find();
    res.send(rooms);
});

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
      const searchRegex = new RegExp(req.params.searchTerm, 'i');
      const rooms = await Room.find({name:{$regex:searchRegex}})
      res.send(rooms);
    }
  ))

  router.get("/tags", asyncHandler(
    async (req, res) => {
      const tags = await Room.aggregate([
        {
          $unwind:'$tags'
        },
        {
          $group:{
            _id: '$tags',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await Room.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
    }
  ))

  router.get("/tag/:tagName",asyncHandler(
    async (req, res) => {
      const rooms = await Room.find({tags: req.params.tagName})
      res.send(rooms);
    }
  ))
  router.get("/:roomId", asyncHandler(
    async (req, res) => {
      const room = await Room.findById(req.params.roomId);
      res.send(room);
    }
  ))
  



module.exports = router;


