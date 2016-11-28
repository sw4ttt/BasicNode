/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `ChatController.comment()`
   */
  comment: function (req, res) 
  {
      console.log('GET - Comment.');
      // Make sure this is a socket request (not traditional HTTP)
      if (!req.isSocket) 
      {
          return res.badRequest();
      }

      console.log(req.param('msg'));
      // Broadcast a notification to all the sockets who have joined
      // the "room001" room, excluding our newly added socket:
      
      //sails.sockets.emit('ZjY1ZsHhr7XMn0NkAAAD', 'privateMessage', {from: req.session.userId, msg: 'Hi!'});

      /*
      sails.sockets.subscribers('room001', function(err, socketIds) 
      {
        console.log('socketIds=',socketIds.length);
        for (i = 0; i < socketIds.length; i++) 
        {
            console.log('socketIds=',socketIds[i]); 
            //sails.sockets.broadcast('room001', 'hello', {from: sails.sockets.getId(req), msg: 'Hi! broadcast'});
            //sails.sockets.broadcast('room001', 'hello', {from: sails.sockets.getId(req), msg: 'Hi! broadcast'},req);
            //sails.sockets.emit(socketIds[i], 'hello', {from: sails.sockets.getId(req), msg: 'Hi! emit'});           
        }
      });
      */

      sails.sockets.broadcast('room001', 'chat', {from: sails.sockets.getId(req), msg: req.param('msg')});

      sails.io.sockets.in('room001').clients(function(error, clients) 
      {
          if (error) throw error;
          //console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
      });

      //sails.sockets.blast('hello', {from: sails.sockets.getId(req), msg: 'Hi! blast'});

      return res.json({
          exit: 'comment'
      });
  },


  /**
   * `ChatController.joinRoom()`
   */
  joinRoom: function (req, res) 
  {
      console.log('GET - Join.');
      // Make sure this is a socket request (not traditional HTTP)
      if (!req.isSocket) 
      {
          return res.badRequest();
      }

      // Have the socket which made the request join the "room001" room.
      sails.sockets.join(req, 'room001', function(err) 
      {
          if (err) {
              return res.serverError(err);
          }
          sails.sockets.broadcast('room001', 'join', {name: sails.sockets.getId(req)});
          console.log('Joined Room= room001, with id='+sails.sockets.getId(req));
      });
      return res.json({
          exit: 'joinRoom'
      });
  },


  /**
   * `ChatController.createRoom()`
   */
  createRoom: function (req, res) {
    return res.json({
      todo: 'createRoom() is not implemented yet!'
    });
  },


  /**
   * `ChatController.destroyRoom()`
   */
  destroyRoom: function (req, res) {
    return res.json({
      todo: 'destroyRoom() is not implemented yet!'
    });
  }
};

