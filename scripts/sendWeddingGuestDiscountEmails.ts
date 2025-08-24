import { getNotionDatabase } from '../services/notion/notionService';
import { EmailService } from '../services/email/emailService';
import dotenv from 'dotenv';

dotenv.config();

const NOTION_DATABASE_ID = process.env.NOTION_RSVP_DATABASE_ID;

async function sendWeddingGuestDiscountEmails() {
  try {
    console.log('Starting to send discount emails to confirmed guests...');
    
    if (!NOTION_DATABASE_ID) {
      throw new Error('NOTION_RSVP_DATABASE_ID environment variable is not set');
    }
    
    // Get all RSVP entries from Notion
    const rsvpEntries = await getNotionDatabase(NOTION_DATABASE_ID);
    
    // Filter for guests who RSVP'd "yes"
    const confirmedGuests = rsvpEntries.filter(entry => 
      entry.properties['RSVP Status']?.select?.name === 'Yes'
    );
    
    console.log(`Found ${confirmedGuests.length} confirmed guests`);
    
    // Send email to each confirmed guest
    for (const guest of confirmedGuests) {
      const email = guest.properties.Email?.email;
      const firstName = guest.properties['First Name']?.rich_text[0]?.plain_text || '';
      
      if (!email) {
        console.log(`No email found for guest: ${firstName}`);
        continue;
      }
      
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
        to: [email],
        subject: 'Special Discount for Our Wedding Guests!',
        text: emailContent,
      });
      
      console.log(`Sent discount email to ${email}`);
    }
    
    console.log('Finished sending discount emails to confirmed guests');
  } catch (error) {
    console.error('Error sending discount emails:', error);
  }
}

// Execute the function
sendWeddingGuestDiscountEmails(); 