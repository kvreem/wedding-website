import dotenv from 'dotenv';
import { Resend } from 'resend';
import fs from 'fs';

// Load environment variables from all possible .env files
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.development' });
dotenv.config({ path: '.env.production' });

console.log('=== RESEND TEST SCRIPT ===');

// Check if Resend is installed
try {
  console.log('Resend package version:', require('resend/package.json').version);
} catch (error) {
  console.error('Could not find Resend package. Is it installed?');
  console.error('Try running: yarn add resend');
  process.exit(1);
}

// List all environment variables (without values for security)
console.log('\nEnvironment variables found:');
Object.keys(process.env)
  .filter(key => key.includes('RESEND') || key.includes('EMAIL') || key.includes('MAIL'))
  .forEach(key => {
    console.log(`- ${key}: ${process.env[key]?.substring(0, 5)}...`);
  });

// Check for .env files
console.log('\nChecking for .env files:');
['.env', '.env.local', '.env.development', '.env.production'].forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`- ${file}: EXISTS`);
    // Print RESEND related variables from file (without values)
    const content = fs.readFileSync(file, 'utf8');
    const resendVars = content
      .split('\n')
      .filter(line => line.includes('RESEND') || line.includes('EMAIL') || line.includes('MAIL'))
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));
    
    if (resendVars.length > 0) {
      console.log(`  Contains ${resendVars.length} email-related variables`);
    } else {
      console.log('  No email-related variables found');
    }
  } else {
    console.log(`- ${file}: NOT FOUND`);
  }
});

// Initialize Resend with API key
const apiKey = process.env.RESEND_API_KEY;
console.log('\nResend API Key:', apiKey ? `${apiKey.substring(0, 8)}...` : 'NOT FOUND');

if (!apiKey) {
  console.error('No RESEND_API_KEY found in environment variables!');
  process.exit(1);
}

const resend = new Resend(apiKey);

// Test the connection to Resend
async function testResendConnection() {
  try {
    console.log('\nTesting connection to Resend API...');
    
    // Simple test email
    const data = await resend.emails.send({
      from: 'Heidi & Kareem <noreply@heidiandkareem.com>',
      to: ['kareem@entendre.finance'],
      subject: 'Resend API Test',
      html: '<p>This is a test email to verify Resend API connectivity.</p>',
    });
    
    console.log('Success! Email sent successfully');
    console.log('Full response:', JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to connect to Resend API:');
    console.error(error);
    return false;
  }
}

// Run the test
testResendConnection()
  .then(success => {
    if (success) {
      console.log('\n✅ Resend API test completed successfully!');
    } else {
      console.error('\n❌ Resend API test failed!');
    }
  })
  .catch(error => {
    console.error('\n❌ Unexpected error during test:', error);
  })
  .finally(() => {
    console.log('\nTest script completed.');
  }); 