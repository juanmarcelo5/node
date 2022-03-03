import nodemailer from 'nodemailer'
 const emailRegistro = async (datos)=>{
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const {email,nombre,token}=datos;

  //enviar el mail
  const info = await transport.sendMail({
    from:'APV-Administrador de pacientes de veterinaria',
    to:email,
    subject:'Comprueba tu cuenta en APV',
    text:'Comprueba tu cuenta en APV',
    html:`<p>Hola:${nombre}, comprueba tu cuenta en APV.</p>
      <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace</p>
      <a href="${process.env.FRONT_URL}/confirmar/${token}">Comprobar cuenta</a>
      <p>Si tu no creaste esta cuenta, puedes ignorear este mensaje</p>
    
    `
  })
  console.log('Mensaje enviado %s',info.messageId);

  
}
export default emailRegistro