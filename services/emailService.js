const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

// Configuração do serviço de e-mail
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const remetente = `"JogosUni" ${config.email.user}`;

async function sendPasswordResetEmail(destinatario, nomeUsuario, linkReset) {
  try {
    const emailHtml = `
    <html>

    <head>
    <style>
    /* Estilos do cabeçalho */
    .header {
      background-color: #f2f2f2;
      padding: 10px;
    }

    .header-logo {
      text-align: center;
    }
    .header-logo h1{
      padding-top: 20px;
    }

    .header-logo-container {
      justify-items: center;
      transform: translate(-50%, -50%);
    }

    .header-logo img {
      max-width: 50px;
      height: auto;
    }

    /* Estilos do conteúdo */
    .content {
      padding: 20px;
    }

    h1 {
      color: #333333;
      margin-bottom: 20px;
    }

    p {
      margin-bottom: 20px;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4caf50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
    }

    .button:hover {
      background-color: #45a049;
    }

    /* Estilos do footer */
    .footer {
      background-color: #f2f2f2;
      padding: 20px;
      text-align: center;
    }

    .footer-social {
      margin-top: 10px;
    }

    .footer-social img {
      max-width: 50px;
      height: auto;
    }

    .footer-social a {
      display: inline-block;
      margin-right: 10px;
      color: #333333;
      text-decoration: none;
    }

    .footer-copyright {
      margin-top: 20px;
      color: #666666;
      font-size: 12px;
    }
  </style>
    </head>
    
    <body>
    <div class="header">
      <div class="header-logo">
        <h1 class="header-logo-container">
          <img src="https://i.imgur.com/gqrFzaj.png" alt="JogosUni">
        </h1>
      </div>
    </div>
      <div class="content">
        <h1>Recuperação de Senha</h1>
        <p>Olá, ${nomeUsuario}!</p>
        <p>Recebemos uma solicitação para redefinir sua senha.</p>
        <p>Para redefinir sua senha, clique no botão abaixo: <strong> O link é válido pelas próximas 2 Horas</strong></p>
        <a class="button" href="${linkReset}">Redefinir Senha</a>
        <p>${linkReset}</p>
        <p>Se você não solicitou uma redefinição de senha, ignore este e-mail.</p>
        <p>Atenciosamente,</p>
        <p>UniProduçôes</p>
      </div>
      <div class="footer">
        <p>Siga-nos nas redes sociais:</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/seu-perfil" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
          </a>
          <a href="https://www.instagram.com/seu-perfil" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
          </a>
          <a href="https://www.twitter.com/seu-perfil" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/889/889147.png" alt="Twitter">
          </a>
        </div>
        <p class="footer-copyright">
          UniProduçôes&copy; Todos os direitos reservados
        </p>
      </div>
    </body>
    
    </html> 
    `;

    const info = await transporter.sendMail({
      from: remetente,
      to: destinatario,
      subject: 'Recuperação de Senha',
      html: emailHtml,
    });

    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

// Exemplo de uso
const linkReset = 'https://example.com/reset-password'; // Link para a página de redefinição de senha
sendPasswordResetEmail('abimael.queirozl@gmail.com', 'Paulo Henrique', linkReset);

