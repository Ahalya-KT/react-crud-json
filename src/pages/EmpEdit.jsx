import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function EmpEdit() {
  const { empid } = useParams();
  const [employee, setEmployee] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        console.log(res, "ressss");
        return res.json();
      })
      .then((resp) => {
        setEmployee(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // e.preventDefault();
    const empData = { ...values };
    console.log(empData, "empData");

    fetch("http://localhost:8000/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empData),
    })
      .then((res) => {
        alert("Saved Sucsessfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const EmpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required(" name is Required"),

    phone: Yup.string().required(" phone  is Required"),
    email: Yup.string().email("Invalid email").required(" Email is Required"),
  });
  return (
    <div>
      <p className="text-center py-8 font-semibold text-xl">Edit Employee</p>

      <Formik
        initialValues={{
          id: employee?.id || "",
          name: employee?.name || "",
          phone: employee?.phone || "",
          email: employee?.email || "",
        }}
        validationSchema={EmpSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // This prop will reinitialize the form with new initialValues
      >
        <Form className="flex flex-col items-center justify-center py-20">
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              ID
            </label>
            <Field
              type="text"
              id="id"
              name="id"
              // disabled="disabled"
              className="mt-2 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="mt-2 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="name"
              className="text-red-500 text-sm"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {/* bt submit avunillaaa form */}
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="mt-2 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="email"
              className="text-red-500 text-sm"
              component="p"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Field
              type="text"
              id="phone"
              name="phone"
              className="mt-2 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="phone"
              className="text-red-500 text-sm"
              component="p"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>

            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              <Link to={"/"}>Back</Link>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EmpEdit;
