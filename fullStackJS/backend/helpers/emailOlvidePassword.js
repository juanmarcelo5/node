import nodemailer from 'nodemailer'
 const EmailOlvidePassword = async (datos)=>{
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
    subject:'Reestablece tu password',
    text:'Reestablece tu password',
    html:`<p>Hola:${nombre},has solicitado restablecer tu password.</p>
      <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace</p>
      <a href="${process.env.FRONT_URL}/olvide-password/${token}">Restablecer password</a>
      <p>Si tu no creaste esta cuenta, puedes ignorear este mensaje</p>
    
    `
  })
  console.log('Mensaje enviado %s',info.messageId);

  
}
export default EmailOlvidePassword