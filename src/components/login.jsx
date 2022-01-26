/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from './Error/error-message';
import * as Realm from 'realm-web';
import { useNavigate } from "react-router-dom";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};


// And now we can use these
const SignupForm = () => {
  let navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
            password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const app = new Realm.App({ id: "groot-scnkt" });
          const credentials = Realm.Credentials.anonymous();
          try {
            const user = await app.logIn(credentials);
            const isValidUser = await user.functions.isValidUser(values);
            console.log(Boolean(isValidUser));
            if(Boolean(isValidUser)){
              localStorage.setItem('loginId', isValidUser?._id);
              navigate("/dashboard")
             }
            setSubmitting(false);
          } catch(err) {
            console.error("Failed to log in", err);
          }

        }}
      >
        <Form>
        <h1>Sign in</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
          <MyTextInput
            label=""
            name="email"
            type="email"
            placeholder="Email"
          />

          <MyTextInput
            label=""
            name="password"
            type="password"
            placeholder="Password"
          />

          <a href="#">Forgot your password?</a>
          <button type="submit" >Sign In</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignupForm;