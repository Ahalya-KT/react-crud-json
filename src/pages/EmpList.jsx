import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { Audio } from "react-loader-spinner";

function EmpList() {
  const { empid } = useParams();
  const [empData, setEmpDataChange] = useState(null);
  const navigate = useNavigate();
  const RemoveToast = () => toast.success("Removed Successfully");

  // loading state
  const [loaded, setLoaded] = useState(false);

  // Function to load employee details
  const LoadDetails = (id) => {
    navigate("/employee/Detail/" + id);
  };

  // Function to load employee edit page
  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  // Function to delete an employee
  const LoadDelete = (id) => {
    if (window.confirm("Do you want to remove")) {
      axios
        .delete("http://localhost:8000/employee/" + id, {})
        .then((res) => {
          alert("Removed Successfully");
          window.location.reload(); // Refresh page after deletion (You may consider updating state instead)
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/employee")
      .then((res) => {
        setEmpDataChange(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="">
      {/* heading */}
      <div>
        <h2 className="py-10 text-center text-2xl font-bold text-teal-700">
          EMPLOYEE LIST
        </h2>
      </div>
      {/* button to new employee */}
      <Link to={"/employee/create"}>
        <div className="px-20 py-8 font-semibold text-xl flex gap-1">
          <p>Add New</p>
          <IoMdAddCircle size={30} />
        </div>
      </Link>

      {/* table or loading spinner */}
      <div className="p-20">
        {loaded ? (
          <table className="w-full bg-white border border-gray-200">
            <thead className="text-left bg-slate-100">
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
        ) : (
          <div className="flex items-center justify-center">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EmpList;
