// "use client"
// import axios from 'axios';
// import { useState } from 'react';

// const NewUserPage = () => {
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState({ CREATE: false, READ: false, UPDATE: false, DELETE: false });
//   const [products, setProducts] = useState({ CREATE: false, READ: false, UPDATE: false, DELETE: false });
//   const [projects, setProjects] = useState({ CREATE: false, READ: false, UPDATE: false, DELETE: false });
//   const [tasks, setTasks] = useState({ CREATE: false, READ: false, UPDATE: false, DELETE: false });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newUser = { name, category, products, projects, tasks };
//     console.log('Submitting newUser:', newUser); // Debugging line
//     try {
//       const response = await axios.post('http://localhost:3002/roles/api/add', newUser);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     const { name, checked } = e.target;
//     setCategory((prevState) => {
//       const newState = { ...prevState, [name]: checked };
//       console.log('Updated Category State:', newState); // Debugging line
//       return newState;
//     });
//   };

//   const handleProductsChange = (e) => {
//     const { name, checked } = e.target;
//     setProducts((prevState) => {
//       const newState = { ...prevState, [name]: checked };
//       console.log('Updated Products State:', newState); // Debugging line
//       return newState;
//     });
//   };

//   const handleProjectsChange = (e) => {
//     const { name, checked } = e.target;
//     setProjects((prevState) => {
//       const newState = { ...prevState, [name]: checked };
//       console.log('Updated Projects State:', newState); // Debugging line
//       return newState;
//     });
//   };

//   const handleTasksChange = (e) => {
//     const { name, checked } = e.target;
//     setTasks((prevState) => {
//       const newState = { ...prevState, [name]: checked };
//       console.log('Updated Tasks State:', newState); // Debugging line
//       return newState;
//     });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Create New Role</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="form-group">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//           />
//         </div>
//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700">Category Permissions</label>
//           {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((perm) => (
//             <div key={perm} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`category-${perm}`}
//                 name={perm}
//                 checked={category[perm]}
//                 onChange={handleCategoryChange}
//                 className="mr-2"
//               />
//               <label htmlFor={`category-${perm}`} className="text-sm">{perm}</label>
//             </div>
//           ))}
//         </div>
//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700">Products Permissions</label>
//           {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((perm) => (
//             <div key={perm} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`products-${perm}`}
//                 name={perm}
//                 checked={products[perm]}
//                 onChange={handleProductsChange}
//                 className="mr-2"
//               />
//               <label htmlFor={`products-${perm}`} className="text-sm">{perm}</label>
//             </div>
//           ))}
//         </div>
//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700">Projects Permissions</label>
//           {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((perm) => (
//             <div key={perm} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`projects-${perm}`}
//                 name={perm}
//                 checked={projects[perm]}
//                 onChange={handleProjectsChange}
//                 className="mr-2"
//               />
//               <label htmlFor={`projects-${perm}`} className="text-sm">{perm}</label>
//             </div>
//           ))}
//         </div>
//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700">Tasks Permissions</label>
//           {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((perm) => (
//             <div key={perm} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`tasks-${perm}`}
//                 name={perm}
//                 checked={tasks[perm]}
//                 onChange={handleTasksChange}
//                 className="mr-2"
//               />
//               <label htmlFor={`tasks-${perm}`} className="text-sm">{perm}</label>
//             </div>
//           ))}
//         </div>
//         <button
//           type="submit"
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewUserPage;

"use client"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useRouter } from "next/navigation";
import io from 'socket.io-client';
import Toast from '@/components/ui/Toast';

const NewRolePage = () => {
  
  const [name, setName] = useState('');
  
  const [permissions, setPermissions] = useState({
    category: { CREATE: false, READ: false, UPDATE: false, DELETE: false },
    products: { CREATE: false, READ: false, UPDATE: false, DELETE: false },
    projects: { CREATE: false, READ: false, UPDATE: false, DELETE: false },
    tasks: { CREATE: false, READ: false, UPDATE: false, DELETE: false },
  });
  
  const [toast, setToast] = useState({ message: '', type: 'info', show: false });
  
  const router = useRouter();

  const socket = io('http://localhost:3002'); 

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
  };

  useEffect(() => {

    socket.on('roleAdded', (role) => {
      showToast(`${role.name} has been added to roles.`, "success");
    });

    return () => {
      socket.off('roleAdded');
    };
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRole = { name, ...permissions };
    console.log('Submitting newRole:', newRole); // Debugging line
    try {
      const response = await axios.post('http://localhost:3002/roles/api/add', newRole);
      console.log(response.data);
      setTimeout(()=> {
        // showToast(`New Role:- ${newRole.name} added successfuly`, "success");
        router.push('/admin/roles');
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePermissionChange = (category, permission) => {
    setPermissions(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [permission]: !prevState[category][permission]
      }
    }));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create New Role
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>CREATE</TableCell>
                <TableCell>READ</TableCell>
                <TableCell>UPDATE</TableCell>
                <TableCell>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(permissions).map(([category, perms]) => (
                <TableRow key={category}>
                  <TableCell component="th" scope="row">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TableCell>
                  {['CREATE', 'READ', 'UPDATE', 'DELETE'].map((action) => (
                    <TableCell key={action}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={perms[action]}
                            onChange={() => handlePermissionChange(category, action)}
                          />
                        }
                        label=""
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '2rem' }}
        >
          Submit
        </Button>
      </form>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </Container>
  );
};

export default NewRolePage;