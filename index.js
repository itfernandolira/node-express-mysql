const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const connection=require("./database/database");
const Question=require("./database/Question");
const Answer=require("./database/Answer");

connection
    .authenticate()
    .then(()=> {
        console.log("Success!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    Question.findAll({raw: true, order: [
        ['id','DESC']
    ]}).then(questions => {
        res.render("index",{
            questions: questions
        });
    });
    
});

app.get("/ask",(req,res)=>{
    res.render("ask");
});

app.post("/questionsaved",(req,res)=>{
    var title=req.body.title;
    var description=req.body.description;
    Question.create({
        title: title,
        description: description
    }).then(()=>{
        res.redirect("/");
    });
});

app.get("/questions/:id",(req,res) => {
    var id=req.params.id;
    Question.findOne({
        where: {id: id}
    }).then(question=> {
        if (question!=undefined){
            Answer.findAll({
                where: {question: id},
                raw: true,
                order: [['id','DESC']]
            }).then(answer=> {
                res.render("questions",{
                    question: question,
                    answer: answer
                });
            })
        }else{
            res.redirect("/");
        }
    })
});

app.post("/answered",(req,res)=>{
    var body=req.body.answer;
    var question=req.body.question;
    Answer.create({
        body: body,
        question: question
    }).then(()=>{
        res.redirect("/questions/"+question);
    });
});

app.listen(4000,()=>{
    console.log("Servidor ativo!");
});