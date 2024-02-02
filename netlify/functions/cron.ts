import { JSDOM } from 'jsdom';

async function sendMessage(message: string) {
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    }
  );
}

async function hasContributions() {
  const res = await fetch(
    'https://www.github.com/' + process.env.GITHUB_USERNAME
  );
  const body = await res.text();
  const dom = new JSDOM(body);
  const document = dom.window._document;

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  let hasContributions = false;

  try {
    const contributions = document
      .querySelector(`.ContributionCalendar-day[data-date="${formattedDate}"]`)
      .getAttribute('data-level');
    if (contributions > 0) {
      hasContributions = true;
    }
  } catch (e) {
    hasContributions = false;
  }

  return hasContributions;
}

async function main() {
  if (!(await hasContributions())) {
    sendMessage("push your today's work bbg!");
  }else{
    sendMessage("dont push your today's work bbg!");
  }
}

exports.handler = async (req: Request) => {
  await main();
  console.log("cron called");
};
