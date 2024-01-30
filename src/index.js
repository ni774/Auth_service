const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');

const db = require('./models/index');
const {User, Role} = require('./models/index');

const apiRoutes = require('./routes/index');
// const UserRepository = require('./repository/user-repository');
const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT,async()=>{
        console.log(`Server Started on Port: ${PORT}`);
        // const repo = new UserRepository();
        // const response = await repo.getById(4);
        // console.log(response);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }

        //! add role
        //    const u1 = await User.findByPk(1);
        //    const r1 = await Role.findByPk(2);
        //    u1.addRole(r1);   

        // const service = new UserService();
        // const newtoken = service.createToken({email: 'raju@gmail.com',id: 1});
        // console.log(newtoken);

        // const token =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanVAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcwNjQ1NzU3MCwiZXhwIjoxNzA2NTQzOTcwfQ.f0cqfpBJjP8TDOtuSMjSDglEDIhtc4rB0x6uc9i_5Sg";
        // const response = await service.verifytoken(token);
        // console.log(response);

    })
}   

prepareAndStartServer();