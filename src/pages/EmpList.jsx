import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";

function EmpList() {
  const { empid } = useParams();
  const [empData, setEmpDataChange] = useState(null);
  const navigate = useNavigate();

  // function for Details
  const LoadDetails = (id) => {
    navigate("/employee/Detail/" + id);
  };

  //  function for edit
  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  // function for delete
  const LoadDelete = (id) => {
    if (window.confirm("Do you want to remove")) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed Sucsessfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/employee")
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
    <div>
      {/* heading */}
      <div>
        <h2 className="text-center py-10 text-2xl font-semibold">
          Employee Listing
        </h2>
      </div>
      {/* button to new employee */}
      <div className="px-10 font-semibold text-xl">
        <Link to={"/employee/create"}>Add New</Link>
      </div>
      {/* table  */}
      <div className="p-20">
        <table className="w-full bg-white border border-gray-200">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {empData &&
              empData.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py- border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">{item.email}</td>
                  <td className="px-4 py-2 border-b">{item.phone}</td>
                  <td className="px-5 py-5 border-b text-center flex gap-4">
                    {/* edit */}
                    <div className="text-green-600">
                      <FaEdit
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        size={23}
                      />
                    </div>

                    {/* delete */}
                    <div className="text-red-500">
                      <MdDelete
                        onClick={() => {
                          LoadDelete(item.id);
                        }}
                        size={23}
                      />
                    </div>

                    {/* details */}
                    <div className="text-blue-500">
                      <FcViewDetails
                        onClick={() => {
                          LoadDetails(item.id);
                        }}
                        className="cursor-pointer"
                        size={23}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmpList;
