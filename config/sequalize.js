import { Sequelize } from "sequelize";
import configure from "./config.js";
const sequelize = new Sequelize(configure.development);

// Testing the connection
async function testDbConnect(){
    try {
        await sequelize.authenticate();
        console.log('Database Connected Successfully');
    }catch(error){
        console.log('Unable to connect with database :', error);
    }
}
testDbConnect();

export default sequelize;