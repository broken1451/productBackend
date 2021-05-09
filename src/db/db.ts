import mongoose from 'mongoose';

export const db =  async () => {
    try {
        mongoose.set("useFindAndModify", false);
        mongoose.Promise = global.Promise;
        await mongoose.connect(String(process.env.DB),  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('BD online')
        
    } catch (error) {
        console.log({error})
        // process.exit(1) // detenemos la app
        throw new Error("Error al iniciar la bd");
        
    }

}