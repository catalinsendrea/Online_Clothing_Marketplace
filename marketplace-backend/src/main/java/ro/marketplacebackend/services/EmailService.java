package ro.marketplacebackend.services;


import ro.marketplacebackend.entities.Produse;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailService {

    public static void sendEmailUserRegistration(String recepient) throws Exception {

        Properties properties = new Properties();

        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        String myAccountEmail = "qbec132@gmail.com";
        String password = "Matematica123!";

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, password);
            }
        });

        Message message = prepareMessageUserRegistration(session, myAccountEmail, recepient);

        Transport.send(message);
    }

    private static Message prepareMessageUserRegistration(Session session, String myAccountEmail, String recepient){
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(myAccountEmail));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
            message.setSubject("Cont de utilizator qbec-marketplace.ro");
            message.setText("Buna, \n\n Ne bucuram sa te avem printre noi! \n Te-ai inregistrat cu succes pe qbec-marketplace.ro. \n Iti uram shopping placut! \n\n\n Cu stima, \n echipa 'Qbec'");
            return message;

        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return null;
    }



    public static void sendEmailOrderConfirmation(String recepient) throws Exception {

        Properties properties = new Properties();

        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        String myAccountEmail = "qbec132@gmail.com";
        String password = "Matematica123!";

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, password);
            }
        });

        Message message = prepareMessageOrderConfirmation(session, myAccountEmail, recepient);

        Transport.send(message);
    }

    private static Message prepareMessageOrderConfirmation(Session session, String myAccountEmail, String recepient){
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(myAccountEmail));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
            message.setSubject("Confirmare comanda qbec-marketplace.ro");
            message.setText("Buna, \n\n Comanda dumneavoastra a fost plasata cu succes! \n Coletul va ajunge la dumneavoastra in aproximativ 3-5 zile lucratoare. \n Iti uram o zi buna si shopping placut in continuare! \n\n\n Cu stima, \n echipa 'Qbec'");
            return message;

        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return null;
    }


    public static void sendEmailSuggestsProduct(String recepient) throws Exception {

        Properties properties = new Properties();

        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        String myAccountEmail = "qbec132@gmail.com";
        String password = "Matematica123!";

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, password);
            }
        });

        Message message = prepareMessageSuggestsProduct(session, myAccountEmail, recepient);

        Transport.send(message);
    }

    private static Message prepareMessageSuggestsProduct(Session session, String myAccountEmail, String recepient){

        try {

            Produse produs = SuggestsProductService.suggestsProduct();

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(myAccountEmail));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(recepient));
            message.setSubject("Sugestie produs qbec-marketplace.ro");

            String htmlImg = "<h3>Buna ziua,</h3> </br> " +
                             "<p>Poate va intereseaza si urmatorul produs: </p> </br> </br> </br> </br>" +
                             "<h4>" + produs.getTitlu() + " </h4> </br> " +
                             "<img width=300 height=300 display='block' src='" + produs.getImagine() + "'/>" +
                             "<h4> Pret: " + produs.getPret() + " LEI </h4> </br> </br>" +
                             "<p>Produsul este acum disponibil pe www.qbec-marketplace.ro . </p> </br> </br> </br> </br> </br>" +
                             "<p>Va asteptam cu drag! </p> </br> " +
                             "<p>Echipa 'qbec-marketplace' </p> </br>";

            message.setContent(htmlImg,"text/html");

            return message;

        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
