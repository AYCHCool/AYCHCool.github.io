import { message as alert } from 'antd';

export default (errMessage, error) => {
  switch (errMessage) {
    case 'No token provided':
      alert.error('You need to login to rate an article');
      break;
    case 'Your account has not been verified, please verify to continue':
      alert.error('Your account has not been verified, please verify to rate article');
      break;
    default:
      alert.error(error);
      break;
  }
};
