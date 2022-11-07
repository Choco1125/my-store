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

    console.log(user);

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
  async sendMail(infoMail) {
    const transporter = nodeMailer.createTransport({
      host: config.emailHost,
      secure: true,
      port: config.emailPort,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'Mail sent' };
  }

  async sendResetPasswordEmail(email) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();

    const token = jwt.sign({ sub: user.id }, config.jwtSecret, {
      expiresIn: '15min',
    });
    const link = `http://fontent.com/recovery?token=${token}`;

    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: config.emailUser,
      to: `${user.email}`,
      subject: 'Restaurar tu contraseña',
      html: `<b>Ingresa a este link para recuperar tu contraseña ${link}</b>`,
    };

    return await this.sendMail(mail);
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) throw boom.unauthorized();

      const hash = await bcrypt.hash(password, 10);

      await service.update(user.id, { recoveryToken: null, password: hash });

      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
