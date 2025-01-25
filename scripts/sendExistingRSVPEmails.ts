import { Client } from '@notionhq/client';
import { RSVPEmailService } from '../services/email/rsvpEmailService';

const notion = new Client({
  auth: 'ntn_G21595951205JJ0TlF54wFQ1qW6M4eOLhNhId9voJV7c1r'
});

interface NotionProperties {
  'Full Name': {
    title: Array<{
      plain_text: string;
    }>;
  };
  'Email': {
    email: string;
  };
}

async function sendExistingRSVPEmails() {
  try {
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

    console.log(`Found ${response.results.length} guests with 'Yes' RSVP and email addresses`);

    // Process each guest
    for (const page of response.results) {
      const properties = (page as any).properties as NotionProperties;
      const name = properties['Full Name']?.title[0]?.plain_text;
      const email = properties['Email']?.email;

      if (name && email) {
        try {
          console.log(`Sending confirmation email to ${name} (${email})`);
          await RSVPEmailService.sendRSVPConfirmation(email, name);
          console.log(`Successfully sent email to ${name}`);
          // Add a small delay between emails to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to send email to ${name}:`, error);
        }
      }
    }

    console.log('Finished sending confirmation emails to existing guests');
  } catch (error) {
    console.error('Error querying Notion database:', error);
  }
}

// Run the script
sendExistingRSVPEmails(); 