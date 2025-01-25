import { EmailService } from './emailService';

function capitalizeFullName(name: string): string {
  // Split by space or hyphen
  return name
    .split(/[\s-]+/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export class RSVPEmailService {
  static async sendRSVPConfirmation(email: string, name: string) {
    const capitalizedName = capitalizeFullName(name);
    const subject = 'RSVP Confirmation - Heidi & Kareem\'s Wedding';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Thank you for your RSVP! 🎉</h2>
        
        <p>Dear ${capitalizedName},</p>
        
        <p>Thank you for confirming your RSVP to our wedding celebration. We're thrilled that you'll be joining us for this special occasion! ✨</p>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>🏨 Our concierge team will be reaching out to you soon to assist with special rates for accommodations and gathering your travel arrangements.</li>
          <li>🌍 If you're interested in exploring Egypt after the wedding, we'll be happy to assist with further travel arrangements - just let our team know when they reach out about accommodations.</li>
          <li>🌟 Keep checking our website for updates and additional information.</li>
        </ul>
        
        <h3>Stay Connected:</h3>
        <p>
          - ✉️ Feel free to email us at any time with questions at concierge@heidiandkareem.com<br>
          - 💬 We'll be creating a WhatsApp group for updates and coordination... coming soon!<br>
          - 📸 Follow our Instagram account for the latest updates and announcements @heidiandkareem
        </p>
        
        <p>We can't wait to celebrate with you! 💫</p>
        
        <p>Best regards,<br>Heidi+Kareem's Wedding Team 💝</p>
      </div>
    `;

    return EmailService.sendEmail({
      to: [email],
      subject,
      html,
    });
  }
} 