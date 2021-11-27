const mongoose = require('mongoose')
const dbConection =  async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
            
        })
        console.log('Base de datos online ');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la DB');
    }

}

module.exports = {
    dbConection
}