import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './utils/validation';
import WrappedForm from '../Wrappers/WrappedForm/WrappedForm';
import { useMutation } from '@tanstack/react-query';
import WrappedTextField from '../Wrappers/WrappedInput/WrappedTextField';
//import RegisterService from '../Services/RegisterService';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
        setPosts(response.data);
        })
        .catch(error => {
        console.error(error);
        });
    }, []);  

  const useFormMethods = useForm({
    resolver: zodResolver(registerSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const mutation = useMutation({
    mutationFn: () => { //TODO: call service
      //throw new Error('Participant is already registered.');
      throw new Error('Error in registration.');
    },
  });

  return (
    <WrappedForm
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutation={mutation as any}
      useFormMethods={useFormMethods}
    >
      Event
      <select>
        {posts.map(post => (
          <option key={post.id} value={post.id}>{post.title}</option>
        ))}
      </select>
      <WrappedTextField
        control={useFormMethods.control}
        name="firstName"
        label="First Name *"
        required
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="lastName"
        label="Last Name *"
        required
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="email"
        label="Email Address *"
        required
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="phoneNumber"
        label="Phone Number *"
        required
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="fullAddress"
        label="Address"
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="password"
        label="Password"
        type="password"
      />
      <WrappedTextField
        control={useFormMethods.control}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
      />
    </WrappedForm>
  );
};

export default RegisterForm;
