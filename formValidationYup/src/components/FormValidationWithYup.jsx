import React, { useState } from "react";
import "../styles/FormValidationWithoutYup.css";
import * as Yup from "yup";

const FormValidationWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    phoneNumber: "",
    gender: "",
    interests: [],
    birthDate: '',
  });
  const [errors, setErrors] = useState({});

  const handleChangeInterest = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = formData.interests;
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest != name
      );
    }
    setFormData({ ...formData, interests: updatedInterests });
  };

  const handleChange = (e) => {
    console.log(
      "events, name : ",
      e.target.name,
      " , value : ",
      e.target.value
    );
    const { name, value } = e.target;
    if(name == 'birthDate')
    {
      let dt = new Date(value);
      console.log(' date : ',name,value,'dt : ',dt)
      setFormData({ ...formData, [name]: value });
    }else{
      setFormData({ ...formData, [name]: value });
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string().email("Invalid email format"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8,"Password must be at least 8 characters long")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one Uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one Lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Confirm Password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot older than 100 years")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
    birthDate: Yup.date().required("Date of birth is required"),
  });
  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      const data = await validationSchema.validate(formData,{abortEarly : false});
      console.log('form data :',formData,data);
      console.log('date conversion : ',new Date(formData.birthDate));
      console.log('form data submitted')
    } catch (error) {
      let newErrors = {};
      // console.log('errors : ',error);
      error.inner.forEach((err)=>{
        newErrors[err.path] = err.message;
      })
      console.log('errors : ',newErrors);
      setErrors({...newErrors})
      console.log('Form submission failed');
    }
    
  };
  return (
    <>
      <div className="form-container">
        <form action="">
          <div className="field">
            <label htmlFor="">First Name* :</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter Your First Name ..."
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="">Last Name* :</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Your last Name ..."
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
          <div className="field">
            <label htmlFor="">Email*:</label>
            <input
              type="email"
              name="email"
              placeholder="Please Enter Your Email address ..."
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="field">
            <label htmlFor="">Password* :</label>
            <input
              type="password"
              name="password"
              placeholder="Please Enter Password ..."
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
          <div className="field">
            <label htmlFor="">Confirm Password* :</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Please Re-enter Password ..."
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="">Phone Number* :</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Please Enter Your Number "
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="">Age* :</label>
            <input
              type="number"
              name="age"
              placeholder="Please Enter Your Age "
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <div className="error">{errors.age}</div>}
          </div>
          <div className="field">
            <label>Gender* :</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <div className="error">{errors.gender}</div>}
          </div>
          <div className="field">
            <label htmlFor="">Interests* :</label>
            <label htmlFor="">
              <input
                type="checkbox"
                name="coding"
                checked={formData.interests.includes("coding")}
                onChange={handleChangeInterest}
              />
              Coding
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                name="sports"
                checked={formData.interests.includes("sports")}
                onChange={handleChangeInterest}
              />
              Sports
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                name="reading"
                checked={formData.interests.includes("reading")}
                onChange={handleChangeInterest}
              />
              Reading
            </label>
            {errors.interests && (
              <div className="error">{errors.interests}</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="">Birth Date * :</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
            {errors.birthDate && (
              <div className="error">{errors.birthDate}</div>
            )}
          </div>
          <button type="submit" className="submit" onClick={onSubmitHandler}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormValidationWithYup;
//278
