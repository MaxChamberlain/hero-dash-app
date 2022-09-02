import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { handleRegister } from '../../utils/functions/userHandler/loginRegisterHandler';
const logo = require('../../assets/images/logo.png');
const arrow = require('../../assets/images/arrow.png');

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const company_code = urlParams.get('id');

  return (
    <>
      <Link to='/'>
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          exit={{ x: -100 }}
          style={{ backgroundColor: '#fff', borderRadius: '50%', position: 'fixed', top: 20, left: 20, cursor: 'pointer' }}
          className='shadow-md'
        >
          <img src={arrow} alt="logo" className="w-12 rotate-90" />
        </motion.div>
      </Link>
      {error && <motion.div
        className="bg-red-500 text-white text-center p-2 fixed z-[9998] top-20 left-20 transform -translate-x-1/2"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {error}
      </motion.div>}
      <motion.div classNames='w-full h-full'
        initial={{ opacity: 0, x: -50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <section className="h-full gradient-form md:h-full w-full ">
          <div className="container py-12 px-6 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div className="xl:w-10/12 shadow-md">
                <div className="block bg-white shadow-lg rounded-lg">
                  <div className="lg:flex lg:flex-wrap g-0">
                    <div className="lg:w-6/12 px-4 md:px-0">
                      <div className="md:p-12 md:mx-6">
                        <div className="text-center">
                          <img
                            className="mx-auto w-48"
                            src={logo}
                            alt="logo"
                          />
                          <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">ViDash</h4>
                        </div>
                        <form>
                          <p className="mb-4">Please create to your account</p>
                          <div className="mb-4 flex">
                            <input
                              type="text"
                              className="mr-2 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="first-name-input"
                              placeholder="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="last-name-input"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="username-input"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {(email && !(email.includes('@') && email.includes('.'))) && <div className='text-red-500 text-xs'>Please enter a valid email</div>}
                          </div>
                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="password-input"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="confirm-password-input"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {(email && confirmPassword && (password !== confirmPassword)) && <div className='text-red-500 text-xs'>Password does not match confirm password</div>}
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="company-name-input"
                              placeholder="Enter New Company Name"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                            />
                            {companyName && <div className='text-red-500 text-xs'>This cannot be changed later!</div>}
                          </div>
                          <div className="text-center pt-1 mb-12 pb-1">
                            <button
                              className="color-white inline-block px-6 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                              type="button"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                              style={{
                                background: `linear-gradient(
                                  to right,
                                  #ffbb00,
                                  #ff8000,
                                  #ff8000`,
                                  opacity: (email && email.includes("@") && email.includes(".") && password && confirmPassword && firstName && lastName && (password === confirmPassword)) ? 1 : 0.5,
                                  color: 'white'
                                }}
                                onClick={() => (email && email.includes("@") && email.includes(".") && password && confirmPassword && firstName && lastName && (password === confirmPassword)) && handleRegister(firstName, lastName, email, password, companyName, company_code, setError)}
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Already using ViDash?</p>
                            <Link to='/login'>
                              <button
                                type="button"
                                className="inline-block px-6 py-2 border-2 text-black-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                data-mdb-ripple="true"
                                style={{ borderColor: '#ff8000' }}
                                data-mdb-ripple-color="light"
                              >
                                login
                              </button>
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                      style={{background: `linear-gradient(
                        to right,
                        #ffbb00,
                        #ff8000,
                        #ff8000`}}>
                      <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                        <h4 className="text-xl font-semibold mb-6">Dive into your ShipHero metrics</h4>
                        <p className="text-sm">
                          ViDash provides an elegant solution for viewing and understanding your ShipHero Metrics in granular detail. 
                          From a picker and packer basis, to a large scale shipment level, 
                          ViDash is the perfect tool for you to understand your ShipHero metrics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}