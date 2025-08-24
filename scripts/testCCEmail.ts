import dotenv from 'dotenv';
import path from 'path';

// Load the .env.production file specifically
dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });

// Import EmailService after loading env vars
import { EmailService } from '../services/email/emailService';

// Calculate days until wedding
function calculateDaysUntilWedding(): number {
  const weddingDate = new Date('2025-09-25');
  const today = new Date();
  const timeDiff = weddingDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

async function testCCEmail() {
  try {
    console.log('Sending test email with CC to verify functionality...');
    
    // Test with your email but showing CC logic
    const testEmail = 'kareem@entendre.finance'; // Change to jaysen.mutha@gmail.com for real test
    const testName = 'Kareem (Test for Jaysen)';
    
    const daysUntilWedding = calculateDaysUntilWedding();
    console.log(`Days until wedding: ${daysUntilWedding}`);
    
    // Hotel booking links
    const CASA_COOK_DISCOUNT_LINK = 'https://tinyurl.com/4vskhdua';
    const COOKS_CLUB_DISCOUNT_LINK = 'https://tinyurl.com/28se6hhr';
    const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/DrV4KmQ4GcH4Hildyrn6Pe?mode=r_c';
    
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .section { margin-bottom: 25px; }
    .highlight { background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 10px 0; }
    h2 { color: #2c3e50; }
    .deadline { font-weight: bold; color: #e74c3c; }
    .footer { text-align: center; margin-top: 40px; font-size: 14px; }
    .test-notice { background-color: #fffacd; padding: 10px; border: 1px solid #ffd700; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="test-notice">
      <strong>TEST EMAIL</strong> - This is a test of the CC functionality. In production, Jaysen's email will CC Meena.kallu@gmail.com
    </div>
    
    <div class="header">
      <h1>✈️ Travel & Accommodation Reminders</h1>
      <h2>Heidi & Kareem's Wedding Countdown!</h2>
    </div>

    <p>Dear ${testName},</p>

    <p>Can you believe it? We're just <strong>${daysUntilWedding} days</strong> away from celebrating together in beautiful El Gouna! We're counting down the days until September 25-26, 2025, and we couldn't be more excited to share this special moment with you.</p>

    <p>Here are some important reminders to help make your trip as smooth as possible:</p>

    <div class="section">
      <h3>🏨 Hotel Booking Deadline: <span class="deadline">July 31st</span></h3>
      <div class="highlight">
        <p>Please book your accommodations at either Casa Cook or Cooks Club through our special discount links by July 31st to secure our group rates:</p>
        <p style="margin-top: 10px;">
          • <a href="${CASA_COOK_DISCOUNT_LINK}">Casa Cook</a><br>
          • <a href="${COOKS_CLUB_DISCOUNT_LINK}">Cooks Club</a>
        </p>
        <p style="margin-top: 10px; font-size: 14px;">If you don't find availability through our links or would like to explore different room options, you can also visit the hotel websites directly:</p>
        <p style="font-size: 14px;">
          • Casa Cook El Gouna: <a href="https://casacook.com/casa-cook-el-gouna">casacook.com/casa-cook-el-gouna</a><br>
          • Cooks Club: <a href="https://www.cooksclub.com/en">cooksclub.com</a>
        </p>
      </div>
    </div>

    <div class="section">
      <h3>✈️ Share Your Flight Details by <span class="deadline">August 15th</span></h3>
      <div class="highlight">
        <p>To ensure we can provide the best assistance upon your arrival, please share your flight itinerary with us by August 15th by simply replying to this email.</p>
        <p>All hotels in El Gouna offer complimentary shuttle services to and from Hurghada Airport, and our concierge team will coordinate everything for you.</p>
      </div>
    </div>

    <div class="section">
      <h3>🌟 Explore Egypt with Stamps Tours</h3>
      <div class="highlight">
        <p>If you're planning to explore Egypt before or after the wedding, we've partnered with Stamps Tours to offer you exclusive discounts! Use code <strong>HEIDIXKAREEM</strong> for 10% off all tours and services.</p>
        <p style="margin-top: 10px;">Stamps Tours will accommodate dates and durations to your liking – you don't have to pick from their default tour choices. Just let them know what you'd like to do and your ideal dates, and they'll take care of the rest!</p>
        <p style="margin-top: 10px;">
          📱 Website: <a href="https://www.stampstours.com">www.stampstours.com</a><br>
          📞 WhatsApp/Phone: +20 10 69684533<br>
          📧 Email: <a href="mailto:bookings@stampstours.com">bookings@stampstours.com</a>
        </p>
      </div>
    </div>

    <div class="section">
      <h3>💬 Join Our WhatsApp Group <span class="deadline">(Highly Recommended!)</span></h3>
      <div class="highlight">
        <p><strong>We highly recommend joining our WhatsApp group</strong> as this will be our primary way to broadcast updates and important information as we get closer to the wedding.</p>
        <p style="margin-top: 10px;">Stay connected and receive real-time updates about schedules, transportation, and any last-minute details.</p>
        <p style="margin-top: 10px;"><a href="${WHATSAPP_GROUP_LINK}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Join WhatsApp Group</a></p>
      </div>
    </div>

    <p>We're here to help make your trip unforgettable! If you have any questions or need assistance with anything, please don't hesitate to reach out to <a href="mailto:concierge@heidiandkareem.com">concierge@heidiandkareem.com</a>.</p>

    <p>Looking forward to celebrating with you soon!</p>

    <div class="footer">
      <p><strong>With love and excitement,<br>Heidi & Kareem 💕</strong></p>
    </div>
  </div>
</body>
</html>
    `;

    // Test the CC functionality
    const emailOptions = {
      to: [testEmail],
      subject: '[TEST CC] [Important] ✈️ Travel & Accommodation Reminders - Heidi & Kareem\'s Wedding',
      html: emailContent,
      cc: ['kareem.a.khattab@gmail.com'] // Test CC address
    };

    console.log('Sending email with CC to:', emailOptions.cc);
    
    await EmailService.sendEmail(emailOptions);

    console.log(`Successfully sent test CC email to ${testEmail} with CC to kareem.a.khattab@gmail.com`);
  } catch (error) {
    console.error('Error sending test CC email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
  }
}

// Execute the function
testCCEmail(); 