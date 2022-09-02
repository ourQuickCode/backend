/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [PUT] ( SEND ) EMAIL

  - MODULE EXPORTS

*/

const nodemailer = require('nodemailer')

//------------------------------------------------------------------------------------------------
//1.1 ( SEND ) EMAIL
//------------------------------------------------------------------------------------------------

const sendEmail = async (name, number, email, message) => {
  try {
    if (!name || !number || !email || !message) {
      throw new Error('Missing data')
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'orlandos.casta@gmail.com', // generated ethereal user
        pass: 'jaudqkegahnoqpae' // generated ethereal password
      }
    })

    // send mail with defined transport object
    await transporter.sendMail({
      from: `Portafolio <orlandos.casta@gmail.com>`, // sender address
      to: 'orlandos.casta@gmail.com', // list of receivers
      subject: 'Contacto solicitado desde tu portafolio', // Subject line
      //text: 'Gracias', // plain text body
      html: `
      <label>Numero de telefono: ${number}</label>
      <p>${message}</p>
      `
    })

    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Orlando Castañeda" <orlandos.casta@gmail.com>', // sender address
      to: email, // list of receivers
      subject: '!Gracias por comunicarte!', // Subject line
      //text: 'Gracias', // plain text body
      html: '<b>Pronto me pondre en contacto contigo, por favor ten paciencia, recuerda que puedes contactarme tambien por cualquiera de las redes sociales compartidas en mi pagina, muchas gracias!</b>' // html body
    })

    finalResponse = {
      'System message': 'Mail sent successfully'
    }

    return finalResponse
  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  sendEmail
}
