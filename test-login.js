import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('response', response => {
    if (response.url().includes('/user/login')) {
      console.log('LOGIN RESPONSE:', response.status());
    }
  });

  await page.goto('http://localhost:5173/');
  
  // Wait for login form
  await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
  
  console.log('Typing credentials...');
  // Fill in email
  await page.type('input[type="text"]', 'master@phn.com');
  // Fill in password
  await page.type('input[type="password"]', 'password');
  
  console.log('Clicking login...');
  await page.click('button[type="submit"]');
  
  // Wait for 2 seconds to see what happens
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await browser.close();
})();
