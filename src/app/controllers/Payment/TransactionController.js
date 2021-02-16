import dotenv from 'dotenv';
import axios from 'axios';
import qs from 'qs';
import convert from 'xml-js';

import Transaction from '../../models/Payment/Transaction';

dotenv.config();

class TransactionController {
  async create(req, res) {
    const transaction = {};

    transaction.email = process.env.PAYMENT_EMAIL;
    transaction.token = process.env.PAYMENT_TOKEN;
    transaction.paymentMode = 'default';
    transaction.paymentMethod = 'creditCard';
    transaction.receiverEmail = process.env.PAYMENT_EMAIL;
    transaction.currency = 'BRL';
    transaction.extraAmount = '0.00';
    transaction.itemId1 = '0001';
    transaction.itemDescription1 = 'Produto 1';
    transaction.itemAmount1 = '100.00';
    transaction.itemQuantity1 = '1';
    transaction.notificationURL = 'http://localhost';
    transaction.reference = 'REF1234';
    transaction.senderName = 'Cliente Nome';
    transaction.senderCPF = '22111944785';
    transaction.senderAreaCode = '38';
    transaction.senderPhone = '56273440';
    transaction.senderEmail = 'c68109601911131144296@sandbox.pagseguro.com.br';
    transaction.senderHash =
      '6e7651000acb9a59a98ecb4ce9380f88cd98fe214e6008e68cd850c55283e821';
    transaction.shippingAddressRequired = false;
    transaction.creditCardToken = '9b63aadd0bb942ad80a2ece334cd1b20';
    transaction.installmentQuantity = 1;
    transaction.installmentValue = parseFloat('100.00').toFixed(2);
    transaction.noInterestInstallmentQuantity = '2';
    transaction.creditCardHolderName = 'Jose Comprador';
    transaction.creditCardHolderCPF = '22111944785';
    transaction.creditCardHolderBirthDate = '27/10/1987';
    transaction.creditCardHolderAreaCode = '11';
    transaction.creditCardHolderCPF = '22111944785';
    transaction.creditCardHolderPhone = '56273440';
    transaction.billingAddressStreet = 'Av. Brig. Faria Lima';
    transaction.billingAddressNumber = '1384';
    transaction.billingAddressComplement = '5o andar';
    transaction.billingAddressDistrict = 'Jardim Paulistano';
    transaction.billingAddressPostalCode = '01452002';
    transaction.billingAddressCity = 'Sao Paulo';
    transaction.billingAddressState = 'SP';
    transaction.billingAddressCountry = 'BRA';

    const { data } = await axios({
      method: 'post',
      url: process.env.PAYMENT_TRANSACTION_ENDPOINT,
      data: qs.stringify(transaction),
    });

    const transactionComplete = JSON.parse(
      convert.xml2json(data, {
        compact: true,
        ignoreComment: true,
        ignoreDeclaration: true,
        spaces: 4,
      })
    );

    const { code } = await Transaction.create({
      date: transactionComplete.transaction.date._text,
      code: transactionComplete.transaction.code._text,
      reference: transactionComplete.transaction.reference._text,
    });

    return res.json({ code });
  }

  async show(req, res) {
    const { data } = await axios.get(
      `${process.env.PAYMENT_STATUS_ENDPOINT}/${req.params.transactionCode}?email=${process.env.PAYMENT_EMAIL}&token=${process.env.PAYMENT_TOKEN}`
    );

    const transaction = JSON.parse(
      convert.xml2json(data, {
        compact: true,
        ignoreComment: true,
        ignoreDeclaration: true,
        spaces: 4,
      })
    );

    return res.json(transaction);
  }
}

export default new TransactionController();
