<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $mensaje = htmlspecialchars($_POST['mensaje']);

  $destino = "adivince2022@gmail.com"; // 📧 Cambia esto por tu email
  $asunto = "Nuevo mensaje desde la landing page";
  $cuerpo = "Has recibido un nuevo mensaje desde tu landing:\n\n" .
            "Email: $email\n" .
            "Mensaje: $mensaje";

  $cabeceras = "From: $email";

  if (mail($destino, $asunto, $cuerpo, $cabeceras)) {
    echo "<p>✅ Mensaje enviado correctamente.</p>";
  } else {
    echo "<p>❌ Error al enviar el mensaje. Inténtalo más tarde.</p>";
  }
} else {
  echo "<p>Acceso no permitido.</p>";
}
?>
