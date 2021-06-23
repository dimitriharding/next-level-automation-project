require("dotenv").config();
const prettyMilliseconds = require("pretty-ms");
const https = require("https");
const fs = require("fs");

const notifySlack = () => {
  if (process.env.SLACK_WEBHOOK_PATH === undefined) {
    throw new Error(
      "SLACK_WEBHOOK_PATH should be defined as Slack channel hook url"
    );
  }

  const file = process.argv[2];
  if (!file) throw new Error("File path is not given");

  const hookUrl = process.env.SLACK_WEBHOOK_PATH;
  const project =
    process.env.PROJECT_NAME || "Next-level Test Automation Workshop";
  const buildUrl = process.env.BUILD_URL;
  const userName = process.env.NAME;

  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let duration = 0;

  const testData = require(file);
  type = "UI";
  passed = testData["state"]["passed"];
  failed = testData["state"]["failed"];
  skipped = testData["state"]["skipped"];
  total = passed + failed + skipped;

  testData?.suites?.forEach((suite) => (duration = suite.duration + duration));

  const options = {
    method: "POST",
    hostname: "hooks.slack.com",
    path: `${hookUrl}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const testDetails = {
    total,
    passed,
    failed,
    skipped,
    suites: testData.suites,
  };

  const capabilities = testData["capabilities"][0];
  const blocks = slackBlocks(userName, project, capabilities, testDetails);
  const message = JSON.stringify({
    username: "WebdriverIO Slack Reporter",
    channel_id: process.env.SLACK_CHANNEL_ID,
    icon_emoji: ":qualityworkscg_gear:",
    blocks,
    attachments: [
      {
        color: failed === 0 ? "good" : "#C21E56",
        fields: [
          {
            title: "Additional Context",
            short: false,
            value: `${
              buildUrl || `Session ID: _${capabilities.sessionId}_`
            } \n Execution Time: _${prettyMilliseconds(duration)}_`,
          },
        ],
      },
    ],
  });

  if (blocks.length > 50) {
    console.log(
      `Blocks cannot be more than 50! Current number of blocks - ${blocks.length}`
    );
    return;
  }

  return makeRequest(options, message)
    .then((res) => {
      console.log(`Posted results to Slack with status: ${res}`);
    })
    .catch((error) => {
      console.log(`Unable to post results to Slack with status: ${error}`);
    });
};

const slackBlocks = (name, project, capabilities, testDetails) => {
  const blockData = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Test report for ${project}:\n*<fakeLink.toEmployeeProfile.com|${name} - local (${capabilities.platformName})>*`,
      },
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Test Summary for ${project}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Browser:*\n${capabilities.browserName}`,
        },
        {
          type: "mrkdwn",
          text: `*Version:*\n${capabilities.browserVersion}`,
        },
        {
          type: "mrkdwn",
          text: `*Total Tests:*\n${testDetails.total}`,
        },
        {
          type: "mrkdwn",
          text: `*Status:*\n:large_green_circle: - ${testDetails.passed}  :red_circle: - ${testDetails.failed}  :large_blue_circle: - ${testDetails.skipped}`,
        },
      ],
    },
  ];

  testDetails.suites.map((suite) => {
    const divider = {
      type: "divider",
    };

    const header = {
      type: "header",
      text: {
        type: "plain_text",
        text: `${suite.name + ` (${prettyMilliseconds(suite.duration)})`}`,
        emoji: true,
      },
    };

    const section = {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${testData(suite.tests)}`,
      },
    };

    blockData.push(divider);
    blockData.push(header);
    blockData.push(section);
  });

  blockData.push({
    type: "divider",
  });
  return blockData;
};

const testData = (tests) => {
  const statusEmoji = {
    passed: ":large_green_circle:",
    failed: ":red_circle:",
    skipped: ":large_blue_circle:",
  };
  const testStrings = tests.map(
    (test) =>
      `${statusEmoji[test.state]} ${
        test.name + ` (_${prettyMilliseconds(test.duration)}_) `
      } ${test?.error ? `\n ${test.error} \n` : "\n"}`
  );
  return testStrings.join("\n");
};

/*
 * Make a request with options provided.
 *
 * @param {Object} options
 * @param {Object} data
 * @return {Promise} a promise of request
 */
const makeRequest = function (options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(responseBody);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(data);
    req.end();
  });
};

notifySlack();
