import { hasContributions, sendMessage } from './api/cron';

async function main() {
  let hasContributionsBool = await hasContributions();
  if (hasContributionsBool) {
    sendMessage('all good!');
  } else {
    sendMessage("gotta push today's work bbg!");
  }
}

main();
