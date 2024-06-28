import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoPersonCircleSharp } from "react-icons/io5";

function EmpDetails() {
  const { empid } = useParams();
  const [empData, setEmpDataChange] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/employee/" + empid)
      .then((res) => {
        console.log(res);
        setEmpDataChange(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100">
      <div className="text-center">
        <p>EMPLOYEE DETAILS</p>
      </div>
      {empData && (
        <div className="bg-white shadow-lg rounded-lg p-20 flex flex-col justify-center items-center ">
          <div className="py-5">
            <IoPersonCircleSharp size={60} />
          </div>

          <p className="text-xl font-semibold mb-4">
            {empData?.name} ({empData.id})
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {empData.email}
          </p>
          <p className="mb-4">
            <strong>Phone Number:</strong> {empData.phone}
          </p>
          <Link to={"/"} className="text-cyan-600 hover:underline">
            Back to List
          </Link>
        </div>
      )}
    </div>
  );
}

export default EmpDetails;
