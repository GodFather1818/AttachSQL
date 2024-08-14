"use client"
import { useState } from 'react';

// Main Component
export default function AddRole() {
  const [roleName, setRoleName] = useState('');
  const [categoryPermissions, setCategoryPermissions] = useState({
    CREATE: false,
    READ: false,
    UPDATE: false,
    DELETE: false,
  });
  const [productsPermissions, setProductsPermissions] = useState({
    CREATE: false,
    READ: false,
    UPDATE: false,
    DELETE: false,
  });
  const [projectsPermissions, setProjectsPermissions] = useState({
    CREATE: false,
    READ: false,
    UPDATE: false,
    DELETE: false,
  });
  const [tasksPermissions, setTasksPermissions] = useState({
    CREATE: false,
    READ: false,
    UPDATE: false,
    DELETE: false,
  });

  // Handler for permission change
  const handlePermissionChange = (section: string, permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE') => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      switch (section) {
        case 'Category':
          setCategoryPermissions((prev) => ({ ...prev, [permission]: checked }));
          break;
        case 'Products':
          setProductsPermissions((prev) => ({ ...prev, [permission]: checked }));
          break;
        case 'Projects':
          setProjectsPermissions((prev) => ({ ...prev, [permission]: checked }));
          break;
        case 'Tasks':
          setTasksPermissions((prev) => ({ ...prev, [permission]: checked }));
          break;
        default:
          break;
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: roleName,
      Category: categoryPermissions,
      Products: productsPermissions,
      Projects: projectsPermissions,
      Tasks: tasksPermissions,
    };

    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success (e.g., clear form, show success message)
        console.log('Role added successfully!');
      } else {
        // Handle error
        console.error('Failed to add role');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Role</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleName">
            Role Name
          </label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <PermissionSection
          title="Category Permissions"
          permissions={categoryPermissions}
          onPermissionChange={handlePermissionChange('Category')}
        />
        <PermissionSection
          title="Products Permissions"
          permissions={productsPermissions}
          onPermissionChange={handlePermissionChange('Products')}
        />
        <PermissionSection
          title="Projects Permissions"
          permissions={projectsPermissions}
          onPermissionChange={handlePermissionChange('Projects')}
        />
        <PermissionSection
          title="Tasks Permissions"
          permissions={tasksPermissions}
          onPermissionChange={handlePermissionChange('Tasks')}
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Role
          </button>
        </div>
      </form>
    </div>
  );
}

// PermissionSection Component
interface PermissionSectionProps {
  title: string;
  permissions: Record<'CREATE' | 'READ' | 'UPDATE' | 'DELETE', boolean>;
  onPermissionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PermissionSection({ title, permissions, onPermissionChange }: PermissionSectionProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      {Object.keys(permissions).map((permission) => (
        <label key={permission} className="block text-gray-600">
          <input
            type="checkbox"
            checked={permissions[permission as keyof typeof permissions]}
            onChange={onPermissionChange}
            className="mr-2 leading-tight"
          />
          {permission}
        </label>
      ))}
    </div>
  );
}
