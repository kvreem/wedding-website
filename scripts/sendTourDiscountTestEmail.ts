import dotenv from 'dotenv';
// Fix the import path based on where you're running the command from
import { EmailService } from '../services/email/emailService';
// Or
// import { EmailService } from './services/email/emailService';

dotenv.config();

async function sendTourDiscountTestEmail() {
  try {
    console.log('Sending test discount email...');
    
    const testEmail = 'kareem@entendre.finance';
    
    const emailContent = `
Dear Family and Friends,

We couldn't be more thrilled to have you join us to celebrate one of the most special moments of our lives! It means the world to us to have you here, and we can't wait to create unforgettable memories together!

We're happy to share that we've partnered with Stamps Tours to help make your trip even more memorable. If you'd like to explore Egypt during your stay, Stamps Tours is offering a 10% discount on all their tours and services exclusively for our guests!

Simply use the discount code HEIDIXKAREEM when booking through their website: www.stampstours.com

If you have any questions, need assistance planning your tours or have any special requests, feel free to reach out to the Stamps Tours team directly:
📞 Phone: +20 10 69684533 (for WhatsApp & Calls)
📧 Email: bookings@stampstours.com

We can't wait to celebrate with you all and hope you enjoy every moment of your time in Egypt!

With love,
Heidi & Kareem
    `;
    
    await EmailService.sendEmail({
      to: [testEmail],
      subject: 'Special Discount for Our Wedding Guests!',
      html: emailContent,
    });
    
    console.log(`Successfully sent test discount email to ${testEmail}`);
  } catch (error) {
    console.error('Error sending test discount email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
  }
}

// Execute the function
sendTourDiscountTestEmail();

// Note: When sending to all guests, we filter using:
// entry.properties['RSVP Status']?.select?.name === 'Yes' 