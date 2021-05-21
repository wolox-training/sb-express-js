const user = {
  name: 'Santiago',
  lastName: 'Bedoya',
  password: 'santiago123',
  email: 'santiago.bedoya@wolox.co'
};

const shortPassword = 'santi';
const nonAlphaNumericPassword = 'santiago_123$';
const externalMail = 'santiago.bedoya@gmail.com';
const anotherEmail = 'santiago.betancur@wolox.co';
const nonFormatEmail = 'santiago_bedoya@wolox.co';

module.exports = {
  user,
  anotherEmail,
  externalMail,
  shortPassword,
  nonFormatEmail,
  nonAlphaNumericPassword
};
