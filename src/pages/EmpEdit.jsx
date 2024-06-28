import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

function EmpEdit() {
  const { empid } = useParams();
  const [empData, setEmpDataChange] = useState({});
  const SuccessfulToast = () => toast.success("Saved Successfully");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/employee/" + empid)
      .then((res) => {
        setEmpDataChange(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  const handleSubmit = (values) => {
    axios
      .put("http://localhost:8000/employee/" + empid, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        SuccessfulToast();
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
      .required("Name is Required"),
    phone: Yup.string().required("Phone is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
  });

  return (
    <div>
      <p className="text-center py-8 font-semibold text-xl">Edit Employee</p>

      <Formik
        initialValues={{
          id: empData.id || "",
          name: empData.name || "",
          phone: empData.phone || "",
          email: empData.email || "",
        }}
        validationSchema={EmpSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
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
              disabled
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
