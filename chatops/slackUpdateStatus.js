/**
 * Follow these steps to configure the webhook in Slack:
 *
 *   1. Navigate to https://<your-team-domain>.slack.com/services/new
 *
 *   2. Search for and select "Incoming WebHooks".
 *
 *   3. Choose the default channel where messages will be sent and click "Add Incoming WebHooks Integration".
 *
 *   4. Copy the webhook URL from the setup instructions and use it in the next section.
 *
 *
 * Follow these steps to encrypt your Slack hook URL for use in this function:
 *
 *   1. Create a KMS key - http://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html.
 *
 *   2. Encrypt the event collector token using the AWS CLI.
 *      $ aws kms encrypt --key-id alias/<KMS key name> --plaintext "<SLACK_HOOK_URL>"
 *
 *      Note: You must exclude the protocol from the URL (e.g. "hooks.slack.com/services/abc123").
 *
 *   3. Copy the base-64 encoded, encrypted key (CiphertextBlob) to the ENCRYPTED_HOOK_URL variable.
 *
 *   4. Give your function's role permission for the kms:Decrypt action.
 *      Example:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1443036478000",
            "Effect": "Allow",
            "Action": [
                "kms:Decrypt"
            ],
            "Resource": [
                "<your KMS key ARN>"
            ]
        }
    ]
}

 */

var AWS = require('aws-sdk');
var url = require('url');
var https = require('https');
var hookUrl, kmsEncyptedHookUrl, slackChannel;


kmsEncyptedHookUrl = 'AQECAHgPiZRaaydINzcDdFk1KFsH1VBu8yYNzxx4SRk3ciKmawAAAKcwgaQGCSqGSIb3DQEHBqCBljCBkwIBADCBjQYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAy6eEdx6FVehh4E1R0CARCAYElB31lGzjk25lYuSTeTH8nozm2a5DKdOXQVgMpipqTUTT/QQLeTkxiGwTfIkQhqSrMvAKIRsEgXCMcSr9oXwpP9iA/FCvQbo4yBqFogZatzXFqkR7JMYccwy1tbhSaURg==';  // Enter the base-64 encoded, encrypted key (CiphertextBlob)
slackChannel = '@ben';  // Enter the Slack channel to send a message to


var postMessage = function(message, callback) {
    var body = JSON.stringify(message);
    var options = url.parse(hookUrl);
    options.method = 'POST';
    options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
    };

    var postReq = https.request(options, function(res) {
        var chunks = [];
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            return chunks.push(chunk);
        });
        res.on('end', function() {
            var body = chunks.join('');
            if (callback) {
                callback({
                    body: body,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage
                });
            }
        });
        return res;
    });

    postReq.write(body);
    postReq.end();
};

var processEvent = function(event, context) {
    console.log(JSON.stringify(event));
    var message = JSON.parse(event.Records[0].Sns.Message);

    /*
    var alarmName = message.AlarmName;
    //var oldState = message.OldStateValue;
    var newState = message.NewStateValue;
    var reason = message.NewStateReason;
    */
    /*var slackMessage = {
        channel: slackChannel,
        text: alarmName + " state is now " + newState + ": " + reason,
    };*/
    var slackMessage = {
        channel: slackChannel,
        text: message.account,
    };
    //console.log("this is a test console log"+JSON.stringify(message));
    postMessage(slackMessage, function(response) {
        if (response.statusCode < 400) {
            console.info('Message posted successfully');
            context.succeed();
        } else if (response.statusCode < 500) {
            console.error("Error posting message to Slack API: " + response.statusCode + " - " + response.statusMessage);
            context.succeed();  // Don't retry because the error is due to a problem with the request
        } else {
            // Let Lambda retry
            context.fail("Server error when processing message: " + response.statusCode + " - " + response.statusMessage);
        }
    });
};


exports.handler = function(event, context) {
    if (hookUrl) {
        // Container reuse, simply process the event with the key in memory
        processEvent(event, context);
    } else if (kmsEncyptedHookUrl && kmsEncyptedHookUrl !== '<kmsEncryptedHookUrl>') {
        var encryptedBuf = new Buffer(kmsEncyptedHookUrl, 'base64');
        var cipherText = { CiphertextBlob: encryptedBuf };

        var kms = new AWS.KMS();
        kms.decrypt(cipherText, function(err, data) {
            if (err) {
                console.log("Decrypt error: " + err);
                context.fail(err);
            } else {
                hookUrl = "https://" + data.Plaintext.toString('ascii');
                processEvent(event, context);
            }
        });
    } else {
        context.fail('Hook URL has not been set.');
    }
};