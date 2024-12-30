import { Client } from '@notionhq/client';
import * as Server from '@common/server';
import { PageObjectResponse, CheckboxPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: 'ntn_G21595951205JJ0TlF54wFQ1qW6M4eOLhNhId9voJV7c1r'
});

export default async function verifyGuest(req, res) {
  await Server.cors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name } = req.body;
  console.log('Received request to verify guest:', name);

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    console.log('Querying Notion database...');
    const response = await notion.databases.query({
      database_id: '16c080b8-ce70-80a4-bcba-ff60f01c2a10',
      filter: {
        property: 'Full Name',
        rich_text: {
          contains: name.toLowerCase()
        }
      }
    });

    console.log('Notion API Response:', JSON.stringify(response, null, 2));

    if (response.results.length > 0) {
      const guest = response.results[0] as PageObjectResponse;
      console.log('Guest data:', JSON.stringify(guest, null, 2));
      console.log('Guest properties:', JSON.stringify(guest.properties, null, 2));
      
      const plusOneProperty = guest.properties['Plus 1'] as CheckboxPropertyItemObjectResponse;
      const hasPlusOne = plusOneProperty?.checkbox || false;
      
      return res.status(200).json({
        found: true,
        hasPlusOne
      });
    }

    return res.status(200).json({
      found: false
    });

  } catch (error: any) {
    console.error('Detailed error:', error);
    console.error('Error message:', error.message);
    if (error.body) {
      console.error('Error body:', error.body);
    }
    return res.status(500).json({ 
      error: 'Failed to verify guest',
      details: error.message 
    });
  }
} 