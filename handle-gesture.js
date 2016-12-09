const { readFileSync } = require('fs');
const path = require('path');
const { map } = require('lodash');

const gestures = require('./gestures');
const sendRequest = require('./send-request');
const requestsPath = path.join(__dirname, '/requests.json');
const requests = JSON.parse(readFileSync(requestsPath, 'utf8'));

const aprox = (v) => Math.floor(v * 100);
const countMatches = (matches) => matches.map((x) => x ? 1 : 0).reduce((a, b) => a + b);
let continueR = true

const handleGesture = (user) => {
  const match = gestures.map((gesture) => {
    const jointKeys = Object.keys(gesture.joints);
    const jointMatches = jointKeys.map((jointKey) => {
      const gestureJoint = gesture.joints[jointKey];
      const userJoint = user.joints[jointKey];

      const propKeys = Object.keys(gestureJoint);

      const propKeyMatches = propKeys.map((propKey) => {
        const gestureJointProp = gestureJoint[propKey];
        const userJointProp = userJoint[propKey];

        return aprox(gestureJointProp) === aprox(userJointProp);
      });

      return countMatches(propKeyMatches);
    });

    if (countMatches(jointMatches) === jointKeys.length) {
      const { options, body } = requests[gesture.requestKey];

      console.log(`Gesture detected, sending ${gesture.requestKey}`);

      sendRequest(options, body);
    }
  });
};

module.exports = handleGesture;