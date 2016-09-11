var questionController = require('../controllers/questions.server.controller.js');

module.exports = function(app) {
    app.post('/add',function(req,res){

        console.log('post /add is called');
        questionController.add(req, function(err,ans){
            console.log("");
            console.log(ans);
            res.send("Question Addded");
        });

    });

    app.get('/add',function(req,res){

        console.log("get /add is called");
        res.render('add');

    });

    app.post('/delete',function(req,res){
        return questionController.delete(req,res);

    });

    app.get('/listi',function(req,res){


        console.log("get /list is called");
        questionController.list(req,function(err,ans){
            console.log("output of list is");
            console.log(ans);
            res.render('list',{title: "List of Questions", listOfQuestions: ans});

        });
      });

        app.get('/lists',function(req,res){
            console.log("get /list is called");
            questionController.list(req,function(err,ans){
                console.log("output of list is");
                //console.log(ans);

                res.json(ans);
                });
              });






};
