module.exports = function(app) {
    app.get('/remove',function(req,res){
      res.clearCookie("token");
      res.send("Hi your cookies are removed :( ");
    });
  }
