var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function (app) {


    // Lista Users
    app.get('/users', (req, res, err) => {
        var connection = app.persistencia.connection();
        connection.query('select * from users', (err, users) => {

            console.log('Select tudo :::::::: ok;');
            console.log('....');
            console.log('Sv conectado');
            res.json(users);
        });
    })


    // add users
    app.post('/users', (req, res, err) => {
        var connection = app.persistencia.connection();
        let userData = {
            id: null,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            user_type: req.body.user_type,
            google_id: null,

        };


        connection.query('INSERT INTO users set ?', userData, (err, user) => {
            if (err) {
                console.log(err);

            } else {
                res.json(userData);
            }
        })
    }
    );

    // edita User
    app.post('/users/edit', (req, res, err) => {
        var connection = app.persistencia.connection();
        let userData = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            user_type: req.body.user_type,
            google_id: null,

        };
        const sql = ` UPDATE users SET 
            name = ${connection.escape(userData.name)},
            email = ${connection.escape(userData.email)},
            password = ${connection.escape(userData.password)},
            user_type = ${connection.escape(userData.user_type)}
             
            WHERE id = ${connection.escape(userData.id)}  
    
`


        connection.query(sql, function (err, res) {
            if (err) {
                console.log("Duplicado");
            } else {
                console.log("Alteração realizada ");
            }
        });


    })



    app.post('/users/delet', (req,res,err)=>{
            var connection = app.persistencia.connection();
             var id = req.body.id;

        

        connection.query('DELETE FROM users where id = ?', id, function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log("User deletado com sucesso");
                
            }
        });
    })
}