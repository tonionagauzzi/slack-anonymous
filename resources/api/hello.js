exports.handler = async () => {
  return {
    statusCode: 200,
    body: `Hello ${process.env.SLACK_CHANNEL}`,
  };
};
