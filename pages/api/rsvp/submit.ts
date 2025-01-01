import { Client } from '@notionhq/client';
import * as Server from '@common/server';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: 'ntn_G21595951205JJ0TlF54wFQ1qW6M4eOLhNhId9voJV7c1r'
});

export default async function submitRSVP(req, res) {
  await Server.cors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    name,
    email,
    phone,
    attending,
    dietaryPreference,
    guestName,
    guestDietaryPreference
  } = req.body;

  console.log('Received RSVP submission:', {
    name,
    email,
    phone,
    attending,
    dietaryPreference,
    guestName,
    guestDietaryPreference
  });

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    // First, find the guest's page in Notion
    console.log('Finding guest in Notion...');
    const response = await notion.databases.query({
      database_id: '16c080b8-ce70-80a4-bcba-ff60f01c2a10',
      filter: {
        property: 'Full Name',
        rich_text: {
          contains: name.toLowerCase()
        }
      }
    });

    console.log('Database query response:', response);

    if (response.results.length === 0) {
      return res.status(404).json({ error: 'Guest not found' });
    }

    const guestPage = response.results[0] as PageObjectResponse;
    console.log('Found guest page:', guestPage.id);
    
    // Update the guest's RSVP details
    console.log('Updating RSVP details...');
    const properties: Record<string, any> = {
      'RSVP Status': {
        status: {
          name: attending ? 'Yes' : 'No'
        }
      },
      'Email': {
        email: email || null
      },
      'Phone': {
        phone_number: phone || null
      },
      'Dietary Preferences': {
        multi_select: [{
          name: dietaryPreference
        }]
      }
    };

    if (guestName) {
      properties['Guest Name'] = {
        rich_text: [{
          type: 'text',
          text: {
            content: guestName
          }
        }]
      };
      properties['Guest Dietary Preferences'] = {
        multi_select: [{
          name: guestDietaryPreference
        }]
      };
    }

    console.log('Update data:', JSON.stringify({ page_id: guestPage.id, properties }, null, 2));
    const updateResponse = await notion.pages.update({
      page_id: guestPage.id,
      properties
    });
    console.log('Update response:', updateResponse);

    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error('Detailed error:', error);
    console.error('Error message:', error.message);
    if (error.body) {
      console.error('Error body:', JSON.stringify(error.body, null, 2));
    }
    return res.status(500).json({ 
      error: 'Failed to submit RSVP',
      details: error.message,
      body: error.body
    });
  }
} 