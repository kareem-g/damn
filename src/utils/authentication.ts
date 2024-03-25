import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebase';

export const authenticateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    // return res.user;
  } catch (error) {
    console.log(error);
  }
};
