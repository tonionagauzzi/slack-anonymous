const { WebClient } = require('@slack/web-api');
const token = process.env.TOKEN;
const web = new WebClient(token);
const querystring = require('querystring');

exports.handler = async (event) => {
    const body = querystring.parse(event.body);
    const text = body.text;
    const patternSplitURL = /[\/]/;
    const ts_no_period = text.split(patternSplitURL).filter(function(textSplitted) {
        return textSplitted.charAt(0) == 'p';
    })[0].substring(1);
    const ts = ts_no_period.substr(0, 10) + "." + ts_no_period.substr(10, 6);
    const channel = text.split(patternSplitURL).filter(function(textSplitted) {
        return textSplitted.charAt(0) == 'C';
    })[0];
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
