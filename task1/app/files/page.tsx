"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";

const AddAttachment = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("PRESENTATION");
  const [files, setFiles] = useState([]);
  const [toast, setToast] = useState({
    message: "",
    type: false,
    show: false,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
  };
  console.log("Session:", session);
  console.log("Token:", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    console.log(`TITLE: ${title}, TYPE: ${type}`);

    files.forEach((file) => {
      formData.append("files", file);
    });

    console.log(files);

    try {
      const response = await axios.post(
        "http://localhost:3002/attachments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        alert("Attachment added successfully");
        // Reset form
        setTitle("");
        setType("PRESENTATION");
        setFiles([]);
        showToast(`Successfully added the Attachment!`, "success");
        console.log(toast);
        setTimeout(() => {
          router.push("/");
        }, 4000);
      } else {
        throw new Error("Failed to add attachment");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Setting Up Request:", error.message);
      }
      alert(
        "Failed to add attachment: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Attachment</h2>
        <p className="text-sm text-gray-500 mb-4">
          This action cannot be undone.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter the title..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="PRESENTATION">Presentation</option>
              <option value="RESEARCH">Research</option>
              <option value="FINANCIALS">Financials</option>
              <option value="INVESTOR_DECK">Investor deck</option>
              <option value="ONE_PAGER">One pager</option>
              <option value="OTHER">Other attachments</option>
            </select>
          </div>

          <div
            {...getRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input {...getInputProps()} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF or PPTX up to 5 files</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">
                Selected Files:
              </h4>
              <ul className="list-disc pl-5">
                {files.map((file) => (
                  <li key={file.name} className="text-sm text-gray-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
      {/* <Toast
        message="Test message"
        type="success"
        onClose={() => setToast({ ...toast, show: false })}
        style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000, backgroundColor: "white", padding: "10px", border: "1px solid black" }}
      /> */}

      {
        toast.show &&
        (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
            style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000, backgroundColor: "white", padding: "10px", border: "1px solid black" }}

          />
        )}
    </div>
  );
};

export default AddAttachment;
