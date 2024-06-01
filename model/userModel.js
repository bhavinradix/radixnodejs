import sequelize from '../config/sequalize.js';

// Creating user model.
const User = sequelize.define('user',{
    username:{
        type : sequelize.Sequelize.STRING,
        allowNull : false,
    },
    email:{
        type : sequelize.Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password:{
        type : sequelize.Sequelize.STRING,
        allowNull : false
    }
});

// Now sync the database with it.
async function syncUserData(){
    await sequelize.sync();
    console.log('Database Synchronised');
}
await syncUserData();

export default User;