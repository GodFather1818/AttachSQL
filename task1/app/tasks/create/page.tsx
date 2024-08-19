// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import toast from "react-hot-toast";
// import { createTask, TaskCreateDto } from "@/utils/api"; // Ensure this function is properly defined in utils/api.ts
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// const CreateTask = () => {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [stage, setStage] = useState("");
//   const [due, setDue] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [contactName, setContactName] = useState("");
//   const [users, setUsers] = useState([]);

//   // const [assignedTo, setAssignedTo] = useState([]);

//   const { data: session } = useSession();
//   const permissions = session?.user?.permissions.category;
//   console.log(permissions);
//   const token = session?.user.token;
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3002/user/api/getUsers"
//         );
//         console.log(response.data);
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error Fetching Users: ", error);
//         toast.error("Failed to fetch users");
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const newTask: TaskCreateDto = {
//       title,
//       description,
//       stage,
//       due: new Date(due),
//       assigned_to: assignedTo.split(",").map((str) => str.trim()),
//       companyName,
//       contactName,
//     };
//     try {
//       await axios.post("http://localhost:3002/tasks", newTask, { headers });
//       toast.success("Task created successfully!");
//       setTimeout(() => {
//         router.push("/tasks");
//       }, 2000);
//     } catch (error) {
//       console.error("Error creating task:", error);
//       toast.error("Failed to create task");
//     }
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ mt: 3, maxWidth: 500, width: "100%" }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Create New Task
//         </Typography>
//         <TextField
//           label="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           fullWidth
//           multiline
//           rows={4}
//           margin="normal"
//         />
//         <TextField
//           label="Stage"
//           value={stage}
//           onChange={(e) => setStage(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Due Date"
//           type="date"
//           value={due}
//           onChange={(e) => setDue(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//         />
//         <InputLabel id="assigned-to-label">Assigned To</InputLabel>
//         <Select
//           labelId="assigned-to-label"
//           multiple
//           value={assignedTo}
//           onChange={(e) => setAssignedTo(e.target.value)}
//           renderValue={(selected) => selected.join(", ")}
//         >
//           {users.map((user) => (
//             <MenuItem key={user._id} value={user._id}>
//               {user.name}
//             </MenuItem>
//           ))}
//         </Select>
//         <TextField
//           label="Company Name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Contact Name"
//           value={contactName}
//           onChange={(e) => setContactName(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//         >
//           Create Task
//         </Button>
//       </Box>
//     </div>
//   );
// };

// export default CreateTask;
"use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Box, Button, Chip, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import Layout from '@/components/ui/Layout';

// const CreateTask = () => {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [stage, setStage] = useState("");
//   const [due, setDue] = useState("");
//   const [assignedTo, setAssignedTo] = useState([]);
//   const [companyName, setCompanyName] = useState("");
//   const [contactName, setContactName] = useState("");
//   const [users, setUsers] = useState([]);

//   const { data: session } = useSession();
//   const token = session?.user.token;
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3002/user/api/getUsers"
//         );
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error Fetching Users: ", error);
//         toast.error("Failed to fetch users");
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(assignedTo);

//     const newTask = {
//       title,
//       description,
//       stage,
//       due: new Date(due),
//       assigned_to: assignedTo,
//       companyName,
//       contactName,
//     };

//     try {
//       await axios.post("http://localhost:3002/tasks", newTask, { headers });
//       toast.success("Task created successfully!");
//       setTimeout(() => {
//         router.push("/tasks");
//       }, 2000);
//     } catch (error) {
//       console.error("Error creating task:", error);
//       toast.error("Failed to create task");
//     }
//   };

// <<<<<<< Updated upstream
//     return (
//         <Layout>
//         <div className="w-full h-screen flex items-center justify-center">
//             <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{ mt: 3, maxWidth: 500, width: '100%' }}
             
//             >
//                 <Typography variant="h4" gutterBottom>
//                     Create New Task
//                 </Typography>
//                 <TextField
//                     label="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     fullWidth
//                     required
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     fullWidth
//                     multiline
//                     rows={4}
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Stage"
//                     value={stage}
//                     onChange={(e) => setStage(e.target.value)}
//                     fullWidth
//                     required
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Due Date"
//                     type="date"
//                     value={due}
//                     onChange={(e) => setDue(e.target.value)}
//                     fullWidth
//                     required
//                     margin="normal"
//                     InputLabelProps={{ shrink: true }}
//                 />
//                 <TextField
//                     label="Assigned To (comma separated)"
//                     value={assignedTo}
//                     onChange={(e) => setAssignedTo(e.target.value)}
//                     fullWidth
//                     required
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Company Name"
//                     value={companyName}
//                     onChange={(e) => setCompanyName(e.target.value)}
//                     fullWidth
//                     required
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Contact Name"
//                     value={contactName}
//                     onChange={(e) => setContactName(e.target.value)}
//                     fullWidth
//                     required
//                     margin="normal"
//                 />
//                 <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//                     Create Task
//                 </Button>
//             </Box>
//         </div>
//         </Layout>
//     );
// =======
//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <div className="mb-7 mt-[20]">
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ mt: 3, maxWidth: 500, width: "100%" }}
//       >
//         <Typography variant="h4" gutterBottom className="mt-[20]">
//           Create New Task
//         </Typography>
//         <TextField
//           label="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           fullWidth
//           multiline
//           rows={4}
//           margin="normal"
//         />
//         <TextField
//           label="Stage"
//           value={stage}
//           onChange={(e) => setStage(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Due Date"
//           type="date"
//           value={due}
//           onChange={(e) => setDue(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//         />
//          <FormControl fullWidth margin="normal">
//             <InputLabel id="assigned-to-label">Assigned To</InputLabel>
//             <Select
//               labelId="assigned-to-label"
//               multiple
//               value={assignedTo}
//               onChange={(e) => setAssignedTo(e.target.value as string[])}
//               renderValue={(selected) => (
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                   {selected.map((value) => (
//                     <Chip key={value} label={users.find(user => user._id === value)?.name || value} />
//                   ))}
//                 </Box>
//               )}
//             >
//               {users.map((user) => (
//                 <MenuItem key={user._id} value={user._id}>
//                   {user.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         <TextField
//           label="Company Name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           label="Contact Name"
//           value={contactName}
//           onChange={(e) => setContactName(e.target.value)}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//         >
//           Create Task
//         </Button>
//       </Box>
//       </div>
//     </div>
//   );
// >>>>>>> Stashed changes
// };

// export default CreateTask;


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
// import { Select } from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Check } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("");
  const [due, setDue] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [users, setUsers] = useState([]); // Assume this is populated with user data
    const { data: session } = useSession();
  const token = session?.user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3002/user/api/getUsers"
            );
            setUsers(response.data);
          } catch (error) {
            console.error("Error Fetching Users: ", error);
            toast.error("Failed to fetch users");
          }
        };
        fetchUsers();
      }, []);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(assignedTo);

    const newTask = {
      title,
      description,
      stage,
      due: new Date(due),
      assigned_to: assignedTo,
      companyName,
      contactName,
    };

    try {
      await axios.post("http://localhost:3002/tasks", newTask, { headers });
      toast.success("Task created successfully!");
      setTimeout(() => {
        router.push("/tasks");
      }, 2000);
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };
  const handleSelectChange = (value) => {
    setAssignedTo((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((id) => id !== value)
        : [...prevSelected, value]
    );
  };

  return (
    <Layout>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="mb-7 mt-20 max-w-[500px] w-full">
          <h2 className="text-3xl font-bold mb-6">Create New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="stage" className="block text-sm font-medium text-gray-700">Stage</label>
              <input
                type="text"
                id="stage"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="due" className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                id="due"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assigned To</label>
              {/* <Select onValueChange={(value) => setAssignedTo(value)}>
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
               {/* <Select onValueChange={handleSelectChange}>
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Select users">
                    {assignedTo.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {assignedTo.map((id) => (
                          <span
                            key={id}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                          >
                            {users.find((user) => user._id === id)?.name || id}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "Select users"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem
                      key={user._id}
                      value={user._id}
                      onSelect={() => handleSelectChange(user._id)}
                    >
                      <div className="flex items-center">
                        <span className="flex-grow">{user.name}</span>
                        {assignedTo.includes(user._id) && (
                          <Check className="ml-2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Select users">
                    {assignedTo.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {assignedTo.map((id) => (
                          <span
                            key={id}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                          >
                            {users.find((user) => user._id === id)?.name || id}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "Select users"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem
                      key={user._id}
                      value={user._id}
                      onSelect={() => handleSelectChange(user._id)}
                    >
                      <div className="flex items-center">
                        <span className="flex-grow">{user.name}</span>
                        {assignedTo.includes(user._id) && (
                          <Check className="ml-2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">Contact Name</label>
              <input
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create Task
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}