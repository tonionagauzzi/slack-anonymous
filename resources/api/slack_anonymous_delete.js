const { WebClient } = require('@slack/web-api');
const token = process.env.TOKEN;
const web = new WebClient(token);
const querystring = require('querystring');

exports.handler = async (event) => {
    const body = querystring.parse(event.body);
    const text = body.text;
    const ts_no_period = text.substr(text.indexOf('/p')+2, 16);
    const channel = text.substr(text.indexOf('/C')+1, 11);
    const ts = ts_no_period.substr(0, 10) + "." + ts_no_period.substr(10, 6);
    console.log(`channel=${channel}, ts=${ts}`);
    const result = await web.chat.delete({
        token: process.env.SLACK_BOT_OAUTH_TOKEN,
        ts: ts,
        channel: channel,
    });
    return {
        statusCode: 200,
        body: 'Deleted your message as anonymous.',
    };
};
