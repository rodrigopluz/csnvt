<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

function sendMessage() {
  try {
    if (!isset($_POST) || empty($_POST)) {
      // Alterar a mensagem de retorno caso der errado o envio.
      return json_encode([
        'success' => false,
        'message' => 'Sorry email not sent, try again!'
      ]);
    }
          
    $name = ucfirst($_POST['name']);
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $subject = ucfirst("Contact from website");
    $message = ucfirst($_POST['message']);

    if (!isset($name) || !isset($email) || !isset($message)) {
      // Alterar a mensagem de retorno caso os campos não forem preenchidos corretamente.
      return json_encode([
        'success' => false,
        'message' => 'Please complete all form before submit!'
      ]);
    }

    //REMETENTE --> ESTE EMAIL TEM QUE SER VALIDO DO DOMINIO
    //==================================================== 
    $email_remetente = "website@cleansea.com.br"; // deve ser uma conta de email do seu dominio 
    //====================================================

    //Configurações do email, ajustar conforme necessidade
    //==================================================== 
    // Caso queira enviar para vários destinatarios, tem que separar por ,
    $email_destinatario = "website@cleansea.com.br"; // pode ser qualquer email que receberá as mensagens
    $email_reply = $email; 
    $email_assunto = $subject; // Este será o assunto da mensagem
    //====================================================

    //Monta o Corpo da Mensagem
    //====================================================
    $email_conteudo = "
      <p>Nome: $name</p>
      <p>Telefone: $phone</p>
      <p>E-mail: $email</p>
      <p>Mensagem: $message</p>
    ";
    //====================================================

    //Seta os Headers (Alterar somente caso necessario) 
    //==================================================== 
    $email_headers = "From: $email_remetente". "\r\n" ."Reply-To: $email_reply". "\r\n" ."Subject: $email_assunto". "\r\n" ."Return-Path: $email_remetente". "\r\n" ."MIME-Version: 1.0". "\r\n" ."X-Priority: 3". "\r\n" ."Content-Type: text/html; charset=UTF-8";
    //====================================================

    $return = [];

    //Enviando o email 
    //==================================================== 
    if (mail($email_destinatario, $email_assunto, $email_conteudo, $email_headers)) {
      // Alterar a mensagem de retorno caso der certo o envio.
      $return = [
        'success' => true,
        'message' => 'Email sent, we will answer asap!'
      ];
    } else {
      // Alterar a mensagem de retorno caso der errado o envio.
      $return = [
        'success' => false,
        'message' => 'Please check your credetials before submit!'
      ];
    }

    return json_encode($return);
  } catch (Exception $e) {
    return json_encode([
      'success' => false,
      'message' => 'Sorry email not sent, try again!!'
    ]);
  }
}

echo sendMessage();