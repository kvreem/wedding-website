import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import { EmailService } from '../services/email/emailService';

dotenv.config();

const notion = new Client({
  auth: 'ntn_G21595951205JJ0TlF54wFQ1qW6M4eOLhNhId9voJV7c1r'
});

// Calculate days until wedding
function calculateDaysUntilWedding(): number {
  const weddingDate = new Date('2025-09-25');
  const today = new Date();
  const timeDiff = weddingDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

async function sendWeddingCountdownEmails() {
  try {
    console.log('Starting to send wedding countdown emails...');
    
    const daysUntilWedding = calculateDaysUntilWedding();
    console.log(`Days until wedding: ${daysUntilWedding}`);
    
    // Query all guests who have RSVP'd yes
    const response = await notion.databases.query({
      database_id: '16c080b8-ce70-80a4-bcba-ff60f01c2a10',
      filter: {
        and: [
          {
            property: 'RSVP Status',
            status: {
              equals: 'Yes'
            }
          },
          {
            property: 'Email',
            email: {
              is_not_empty: true
            }
          }
        ]
      }
    });

    console.log(`Found ${response.results.length} confirmed guests with email addresses`);
    console.log('All emails will be BCC\'d to groom@heidiandkareem.com for monitoring');

    // Hotel booking links
    const CASA_COOK_DISCOUNT_LINK = 'https://tinyurl.com/4vskhdua';
    const COOKS_CLUB_DISCOUNT_LINK = 'https://tinyurl.com/28se6hhr';
    const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/DrV4KmQ4GcH4Hildyrn6Pe?mode=r_c';

    for (const page of response.results) {
      const properties = (page as any).properties;
      const name = properties['Full Name']?.title[0]?.plain_text;
      const email = properties['Email']?.email;

      if (name && email) {
        try {
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ Travel & Accommodation Reminders</h1>
      <h2>Heidi & Kareem's Wedding Countdown!</h2>
    </div>

    <p>Dear ${name},</p>

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

          // Special case: CC Meena when sending to Jaysen
          const emailOptions: any = {
            to: [email],
            subject: '[Important] ✈️ Travel & Accommodation Reminders - Heidi & Kareem\'s Wedding',
            html: emailContent,
            bcc: ['groom@heidiandkareem.com'] // BCC on all emails for monitoring
          };

          // Add CC for Jaysen's email
          if (email.toLowerCase() === 'jaysen.mutha@gmail.com') {
            emailOptions.cc = ['meena.kallu@gmail.com'];
            console.log(`Adding CC to Meena.kallu@gmail.com for Jaysen's email`);
          }

          await EmailService.sendEmail(emailOptions);

          console.log(`Sent countdown email to ${name} (${email})`);
          
          // Add a small delay between emails to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to send email to ${name}:`, error);
        }
      }
    }

    console.log('Finished sending countdown emails to confirmed guests');
  } catch (error) {
    console.error('Error sending countdown emails:', error);
  }
}

// Execute the function if running directly
if (require.main === module) {
  sendWeddingCountdownEmails();
}

export { sendWeddingCountdownEmails }; 