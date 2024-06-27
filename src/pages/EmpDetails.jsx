import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function EmpDetails() {
  const { empid } = useParams();
  const [empData, setEmpDataChange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((resp) => {
        setEmpDataChange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="text-center py-32">
      {empData && (
        <div>
          <p className="text-xl">
            The Employee name is: {empData.name} ({empData.id})
          </p>
          <p className="pt-5">Email:{empData.email}</p>
          <p> Phone Number:{empData.phone}</p>
          <Link to={"/"} className="text-cyan-600">
            Back to List
          </Link>
        </div>
      )}
    </div>
  );
}

export default EmpDetails;
