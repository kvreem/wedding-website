import { Client } from '@notionhq/client';
import * as Server from '@common/server';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { RSVPEmailService } from '../../../services/email/rsvpEmailService';

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
    dietaryNotes,
    guestName,
    guestDietaryPreference,
    guestDietaryNotes
  } = req.body;

  console.log('Received RSVP submission:', {
    name,
    email,
    phone,
    attending,
    dietaryPreference,
    dietaryNotes,
    guestName,
    guestDietaryPreference,
    guestDietaryNotes
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
    
    // Log all available properties
    console.log('Available properties:', Object.keys(guestPage.properties));
    console.log('Full properties:', JSON.stringify(guestPage.properties, null, 2));
    
    // Update the guest's RSVP details
    console.log('Updating RSVP details...');
    const updateProperties: Record<string, any> = {};

    // Use property IDs for standard fields
    updateProperties['vOs_'] = { // RSVP Status
      status: {
        name: attending ? 'Yes' : 'No'
      }
    };

    updateProperties['_BSy'] = { // Email
      email: email || null
    };

    updateProperties['ConT'] = { // Phone
      phone_number: phone || null
    };

    updateProperties['yfWe'] = { // Dietary Preferences
      multi_select: [{
        name: dietaryPreference
      }]
    };

    // Use the correct property names with IDs
    if (dietaryNotes) {
      updateProperties['zQIY'] = { // "Dietary Notes" (without the trailing space now)
        rich_text: [{ type: 'text', text: { content: dietaryNotes } }]
      };
    }

    if (guestName) {
      updateProperties['zpaG'] = { // Guest Name
        rich_text: [{
          type: 'text',
          text: {
            content: guestName
          }
        }]
      };
      
      updateProperties['U{mi'] = { // Guest Dietary Preferences
        multi_select: [{
          name: guestDietaryPreference
        }]
      };
      
      if (guestDietaryNotes) {
        updateProperties['LvWS'] = { // Guest Dietary Notes
          rich_text: [{ type: 'text', text: { content: guestDietaryNotes } }]
        };
      }
    }

    console.log('Update data:', JSON.stringify({ page_id: guestPage.id, properties: updateProperties }, null, 2));
    const updateResponse = await notion.pages.update({
      page_id: guestPage.id,
      properties: updateProperties
    });
    console.log('Update response:', updateResponse);

    // Send confirmation email if attending
    if (attending && email) {
      try {
        await RSVPEmailService.sendRSVPConfirmation(email, name);
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the RSVP process if email fails
      }
    }

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