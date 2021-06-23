const { WebClient } = require('@slack/web-api');
const token = process.env.TOKEN;
const web = new WebClient(token);
const querystring = require('querystring');

exports.handler = async (event) => {
    const body = querystring.parse(event.body);
    const result = await web.chat.postMessage({
        token: process.env.SLACK_BOT_OAUTH_TOKEN,
        text: body.text,
        channel: process.env.SLACK_CHANNEL,
    });
    return {
        statusCode: 200,
        body: 'Posted your message as anonymous.',
    };
};
