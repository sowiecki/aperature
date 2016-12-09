const Kinect2 = require('kinect2');

const handleGesture = require('./handle-gesture');

const kinect = new Kinect2();

if (kinect.open()) {
  console.log('Kinect Opened');

  kinect.on('bodyFrame', (bodyFrame) => {
    for (let i = 0;  i < bodyFrame.bodies.length; i++) {
      if (bodyFrame.bodies[i].tracked) {
        const user = bodyFrame.bodies[i];

        console.log('23', user.joints[23]);
        console.log('24', user.joints[24]);

        handleGesture(user);
      }
    }
  });

  kinect.openBodyReader();

//   setTimeout(() => {
//       kinect.close();
//       console.log('Kinect Closed');
//   }, 15000);
}