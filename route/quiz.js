var quizController = require('../controllers/quiz.server.controller.js');
var questionController = require('../controllers/questions.server.controller');
var quizSchema = require('../models/quiz');

module.exports = function(app) {
    app.post('/createQuiz',function(req,res){
        console.log('Create is called');
        var quiz = quizController.create(req);
        console.log(quiz);
        console.log(res);
        res.render('addQuestion',{qid: quiz._id});



    });

    app.get('/createQuiz',function(req,res){

      res.render('createQuiz');
    });

    //app.get('/addQuestion',function(req,res){
    //
    //    res.render('addQuestion');
    //});

    app.post('/addQuestion',function(req,res){
        //TODO add single question to the database and insert into the qid
        //console.log(req.body);
        var que;
        questionController.add(req,function(err,ans){
          que=ans;
          console.log("Question Added");
          update();
        });

        var qid = req.body.qid;
        console.log(que);
        //console.log(que.question);
        console.log(qid);
        //TODO better update query
        // preparing query and update

        function update() {


            var conditions = {_id: qid}
                , update = {
                    $push: {
                        questions: {
                            qid: que._id,
                            question: que.question,
                            answer: que.answer,
                            correct: que.correct
                        }
                    }
                }
                , options = {multi: false};


            quizSchema.update(conditions, update, options, function (err, res) {
                if (err)
                    console.log("Some error");
                else
                    console.log("updated quiz" + res);
            });

        }
        quizSchema.find({_id: qid},function(err,result){
            //console.log(result);


        })


    })

    /*app.get('/quiz',function(req,res){

        var qid=null;
        console.log(qid);

        quizController.list(qid,function(err,result){

            //res.send(req.params.id);
            //console.log(result);
            res.render('quiz',{listOfQuizzes: result});
        })

    });

    app.get('/quiz/:id',function(req,res){

        var qid=null;
        qid = req.params.id;
        console.log(qid);

        quizController.list(qid,function(err,result){

            res.send(result);
            //console.log(result);
            //res.render('quiz',{listOfQuizzes: result});
        })
    }); */
};