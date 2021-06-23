const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const token = process.env.TOKEN;
const web = new WebClient(token);
const querystring = require('querystring');

console.log(process.env.SLACK_SIGNING_SECRET);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

slackEvents.on('message', async (slackEvent) => {
    console.log(slackEvent.channel);
    const token = process.env.SLACK_BOT_OAUTH_TOKEN;
    const body = querystring.parse(slackEvent.body);
    const channel = slackEvent.channel;
    const result = await web.chat.postMessage({
        token: token,
        text: body.text,
        channel: channel,
    });
    return {
        statusCode: 200,
        body: 'Posted your message as anonymous.',
    };
});
