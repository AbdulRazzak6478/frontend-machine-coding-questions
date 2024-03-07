import React, { useState } from "react";
import "../styles/FormValidationWithoutYup.css";

const FormValidationWithoutYup = () => {
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
    birthDate: "",
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
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    // regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };
  const isValidPhoneNumber = (phoneNumber) => {
    // regular expression for basic phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const isValidPassword = (password) => {
    //Regular expression for password validation
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      uppercase.test(password) &&
      lowercase.test(password)
    );
  };

  const isValidAge = (age) =>{
    return parseInt(age) >= 18 && parseInt(age) <=100;
  }

  const validateFormWithOutYup = () => {
    let newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number, one lowercase, one uppercase";
    }
    if(!formData.age)
    {
      newErrors.age = 'Age is Required';
    }else if(!isValidAge(formData.age)){
      newErrors.age = 'You must be at least 18 years old and not older than 100 years';
    }

    if(!formData.gender)
    {
      newErrors.gender = 'Gender is required';
    }

    if(formData.interests.length === 0)
    {
      newErrors.interests = 'Select at least one interest';
    }

    if(!formData.birthDate){
      newErrors.birthDate = 'Date of birth is required';
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const isValid = validateFormWithOutYup();
    if (isValid) {
      console.log("form is submitted ", formData);
    } else {
      console.log("Form Validation is Failed");
    }
    // console.log('form data : ',formData);
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
            {errors.firstName && <div className="error">{errors.firstName}</div>}
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
             {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
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
             {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
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
            {errors.interests && <div className="error">{errors.interests}</div>}
          </div>
          <div className="field">
            <label htmlFor="">Birth Date * :</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
             {errors.birthDate && <div className="error">{errors.birthDate}</div>}
          </div>
          <button type="submit" className="submit" onClick={onSubmitHandler}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormValidationWithoutYup;
