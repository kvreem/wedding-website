import { Client } from '@notionhq/client';
import * as Server from '@common/server';

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

export default async function getSchema(req, res) {
  await Server.cors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Retrieve the database
    const response = await notion.databases.retrieve({
      database_id: '16c080b8-ce70-80a4-bcba-ff60f01c2a10'
    });

    // Extract and return the properties
    return res.status(200).json({
      properties: response.properties
    });
  } catch (error) {
    console.error('Error retrieving database schema:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve database schema',
      details: error.message
    });
  }
} 