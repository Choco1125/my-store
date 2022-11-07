const UserService = require('./users.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodeMailer = require('nodemailer');

const service = new UserService();

class AuthService {
  constructor() {}
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw boom.unauthorized();

    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      config.jwtSecret
    );

    return { user, token };
  }
  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();

    const transporter = nodeMailer.createTransport({
      host: config.emailHost,
      secure: true,
      port: config.emailPort,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    await transporter.sendMail({
      from: config.emailUser,
      to: `${user.email}`,
      subject: 'Este es un nuevo correo',
      text: `Hola Momon`,
      html: '<b>Hola Momon</b>',
    });

    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
