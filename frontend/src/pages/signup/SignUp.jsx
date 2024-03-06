import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })

  const {loading,signup} =  useSignup()

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const onCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs)
    await signup(inputs.fullName,inputs.username,inputs.email,inputs.password,inputs.confirmPassword,inputs.gender)
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'> ChatPulse</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-900'>Full Name</span>
            </label>
            <input type='text' onChange={onChange} name="fullName" value={inputs.fullName} placeholder='John Doe' className='w-full input input-bordered  h-10' />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text text-gray-900'>Username</span>
            </label>
            <input type='text' onChange={onChange} name="username" value={inputs.username} placeholder='johndoe' className='w-full input input-bordered h-10' />
          </div>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text text-gray-900'>Email</span>
            </label>
            <input type='text' onChange={onChange} name="email" value={inputs.email} placeholder='johndoe@gmail.com' className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text text-gray-900'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              name="password"
              onChange={onChange}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text text-gray-900'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              name="confirmPassword"
              onChange={onChange}
            />
          </div>

          <GenderCheckbox onCheckboxChange={onCheckboxChange} selectedGender={inputs.gender} />

          <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to='/login'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;