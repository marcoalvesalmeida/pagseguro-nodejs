import dotenv from 'dotenv';
import axios from 'axios';
import convert from 'xml-js';

dotenv.config();

class SessionController {
  async create(req, res) {
    const { data } = await axios.post(
      `${process.env.PAYMENT_SESSION_ENDPOINT}?email=${process.env.PAYMENT_EMAIL}&token=${process.env.PAYMENT_TOKEN}`
    );

    const { session } = JSON.parse(
      convert.xml2json(data, {
        compact: true,
        ignoreComment: true,
        ignoreDeclaration: true,
        spaces: 4,
      })
    );

    const sessionId = session.id._text;

    return res.json({ session: sessionId });
  }
}

export default new SessionController();
