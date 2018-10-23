var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function (app) {


    app.get('/rules', (req, res, err) => {
        var connection = app.persistencia.connection();
        connection.query('select * from rules', (err, rules) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Select Rules : OK");
                res.json(rules);
            }
        });
    })



    app.post('/rules', (req,res,err)=>{
        var connection = app.persistencia.connection();
        
        let ruleData = {
            id: null,
            classification: req.body.classification,
            activity: req.body.activity,
            percentage: req.body.percentage,
            group_id: req.body.group_id
            
        }

        connection.query('INSERT INTO rules set ?', ruleData,(err,rules)=>{
            if(err){
                console.log(err);
                
            }else{
                res.json(ruleData);
            }
        })
    })


    app.post('/rules/delete',(req,res,err)=>{
        var connection = app.persistencia.connection();
        var id = req.body.id;


        connection.query('DELETE FROM rules where id = ?', id, function (err,res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Regra deletado com sucesso");

            }
        });
    })


    app.post('/rules/edit',(req,res,err)=>{
        var connection = app.persistencia.connection();

        let ruleData = {
            id: req.body.id,
            classification: req.body.classification,
            activity: req.body.activity,
            percentage: req.body.percentage,
            group_id: req.body.group_id

        }

        const sql = ` UPDATE users SET 
            classification = ${connection.escape(ruleData.name)},
            activity = ${connection.escape(ruleData.email)},
            percentage = ${connection.escape(ruleData.password)},
            group_id = ${connection.escape(ruleData.user_type)}
             
            WHERE id = ${connection.escape(ruleData.id)}  
    
`
        connection.query(sql, function (err, res) {
            if (err) {
                console.log("Duplicado");
            } else {
                console.log("Alteração realizada ");
            }
        });

    })




    
}