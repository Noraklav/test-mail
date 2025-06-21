import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, mensaje } = req.body;

  // Validación básica
  if (!email || !mensaje) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  // Configura el transportador con tus credenciales
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Landing Page" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'Nuevo mensaje desde la landing',
      text: `Email: ${email}\nMensaje:\n${mensaje}`,
      replyTo: email
    });

    res.status(200).json({ message: '✅ Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: '❌ Error al enviar el correo' });
  }
}
