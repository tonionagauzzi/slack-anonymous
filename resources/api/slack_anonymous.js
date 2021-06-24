const { WebClient } = require('@slack/web-api');
const token = process.env.TOKEN;
const web = new WebClient(token);
const querystring = require('querystring');

exports.handler = async (event) => {
    const body = querystring.parse(event.body);
    if (body.thread_ts) {
        const result = await web.chat.postMessage({
            token: process.env.SLACK_BOT_OAUTH_TOKEN,
            thread_ts: body.thread_ts,
            text: body.text,
            channel: body.channel_id,
        });
        return {
            statusCode: 200,
            body: 'Posted your message in thread as anonymous.',
        };
    }
    const result = await web.chat.postMessage({
        token: process.env.SLACK_BOT_OAUTH_TOKEN,
        text: body.text,
        channel: body.channel_id,
    });
    return {
        statusCode: 200,
        body: 'Posted your message as anonymous.',
    };
};
