const { WebClient } = require('@slack/web-api');
const token = process.env.TOKEN;
const web = new WebClient(token);
const querystring = require('querystring');

exports.handler = async (event) => {
    const token = process.env.SLACK_BOT_OAUTH_TOKEN;
    const body = querystring.parse(event.body);
    const channel = event.channel;
    const result = await web.chat.postMessage({
        token: token,
        text: body.text,
        channel: channel,
    });
    return {
        statusCode: 200,
        body: 'Posted your message as anonymous.',
    };
};
