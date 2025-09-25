import * as Yup from 'yup';

export const signupSchema = Yup.object({
  name: Yup.string().min(3).required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).required('Password must be at least 6 chars'),
});

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
