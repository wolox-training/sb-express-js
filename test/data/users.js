const user = {
  name: 'Santiago',
  last_name: 'Bedoya',
  password: 'santiago123',
  email: 'santiago.bedoya@wolox.co'
};

const shortPassword = 'santi';
const nonAlphaNumericPassword = 'santiago_123$';
const externalMail = 'santiago.bedoya@gmail.com';
const anotherEmail = 'santiago.betancur@wolox.co';
const nonFormatEmail = 'santiago_bedoya@wolox.co';

const expiredToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTYW50aWFnbyIsImlhdCI6MTYyMjA4OTM1NCwiZXhwIjoxNjIyMTAzNzU0fQ.81ZsUW9u8q1LC-HVSV4pti3ETT9kGxCi3EHBXEDAcB0';

module.exports = {
  user,
  anotherEmail,
  externalMail,
  expiredToken,
  shortPassword,
  nonFormatEmail,
  nonAlphaNumericPassword
};
