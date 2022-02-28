import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const app = express()
//configuraciones y middlelweasrs
app.use(express.json())
dotenv.config() // leer los archivos y busca el .env
conectarDB()

/** va a escuchar el path y luego ejecuta el routes */
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
	console.log('Servidor corriendo en el puerto: ', PORT)
})
