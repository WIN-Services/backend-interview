import { injectable } from 'inversify';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { IMail } from './Mail.interface';
import appConfig from '../../config/Index.interface';

@injectable()
export class Mail implements IMail {
  public async sendRegistrationEmail(email: string): Promise<void> {
    const body = `<tr>hello</tr>`;
    let html = fs.readFileSync(`${process.env.NODE_PATH}/src/resources/templates/EmailTemplate.html`, 'utf8');
    html = html.replace('{{ logo }}', `${appConfig.app.backend.baseUrl}/images/backend.svg`);
    html = html.replace('{{{ body }}}', body);

    return Mail.sendEmail(email, 'Thank you for registering with backend', html);
  }

  private static async sendEmail(email: string, sub: string, body: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: appConfig.aws.ses.host,
      port: appConfig.aws.ses.port,
      secure: appConfig.aws.ses.secure,
      auth: {
        user: appConfig.aws.ses.auth.user,
        pass: appConfig.aws.ses.auth.pass,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: appConfig.aws.ses.fromEmail,
      to: email,
      subject: sub,
      html: body,
    });
  }
}
