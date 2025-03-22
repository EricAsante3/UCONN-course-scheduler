import React from "react";
import { Typography } from "@mui/material";
import studentAdminImg from "../assets/student_admin.png";
import classEnrollImg from "../assets/class_enroll.png";   
import classImg from "../assets/class.png"

function extractCrns(classInfo) {
  const classes = [];

  classInfo.forEach((outerArray) => {
    outerArray.forEach((subArray) => {
      if (subArray.length === 1) {
        const { crn, title } = subArray[0];
        classes.push({ crn, title });
      } else if (subArray.length === 2) {
        const { crn, title } = subArray[1];
        classes.push({ crn, title });
      }
    });
  });

  return classes;
}

const Register_classes = ({ classInfo }) => {
  if (!classInfo) {
    return <p className="text-red-500">No class data available.</p>;
  }

  const classes = extractCrns(classInfo);

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f2937]">How to Register for Classes</h1>
        <p className="text-lg text-gray-600 mt-2">Follow these simple steps to complete your enrollment</p>
      </div>

      {/* Step 1 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-gray-800">1. Log into Student Admin</h2>
        <Typography className="text-gray-700 text-base md:text-lg" sx={{ lineHeight: 1.8 }}>
          Go to <strong>Manage Classes</strong> once you're logged in.
        </Typography>
        <img
          src={studentAdminImg}
          alt="Student Admin Main Page"
          className="rounded-lg shadow-md max-w-full border border-gray-200"
        />
      </div>

      {/* Step 2 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-gray-800">2. Click on "Class Search and Enroll"</h2>
        <img
          src={classEnrollImg}
          alt="Class Search and Enroll Page"
          className="rounded-lg shadow-md max-w-full border border-gray-200"
        />
      </div>

      {/* Step 3 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-gray-800">3. Search for CRNs</h2>
        <Typography className="text-gray-700 text-base md:text-lg" sx={{ lineHeight: 1.8 }}>
          Type the <strong>Course Registration Number (CRN)</strong> in the search bar and click the arrow.
        </Typography>
      </div>

      {/* Step 4 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold text-gray-800">4. Register for Your Classes</h2>
        <Typography className="text-gray-700 text-base md:text-lg" sx={{ lineHeight: 1.8 }}>
          Click on the class that pops-up, this will be the exact class you want.
          <img
          src={classImg}
          alt="Student Admin Main Page"
          className="rounded-lg shadow-md max-w-full border border-gray-200"
        />
        </Typography>
        <Typography className="text-gray-700 text-base md:text-lg" sx={{ lineHeight: 1.8 }}> Proceed to register as normal, and repeat the process for each CRN</Typography>

        {/* List CRNs and Class Names */}
        <div className="">
          <h3 className="text-xl font-bold text-gray-800">Your CRNs</h3>
          <ul className="text-lg text-gray-700 mt-2 space-y-1">
            {classes.length > 0 ? (
              classes.map(({ crn, title }, index) => (
                <li key={index}>
                  <strong>{title}</strong> — CRN: {crn}
                </li>
              ))
            ) : (
              <div className="flex">
                <p className="text-gray-500 mb-auto">No classes found.</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register_classes;
