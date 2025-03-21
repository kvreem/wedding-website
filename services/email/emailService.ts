import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string[];
  subject: string;
  html: string;
  from?: string;
}

export class EmailService {
  private static DEFAULT_FROM = 'Heidi & Kareem Wedding <concierge@heidiandkareem.com>';

  static async sendEmail({ to, subject, html, from = this.DEFAULT_FROM }: EmailOptions) {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });

      if (error) {
        console.error('Failed to send email:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
} 