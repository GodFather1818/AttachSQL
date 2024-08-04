import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ButtonAppBar from "@/components/ui/ButtonAppBar";
import Image from "next/image";
import AddCategoryform from '../components/ui/AddCategoryForm'
export default function Home() {
  return (
    <>        
 <div className="min-h-screen flex flex-col items-center justify-center py-10 m-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-primary">Implementing our Skills!</h1>
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Exploring our ideas together</h1>
        <p className="text-lg text-gray-600">
          This is a project which helped us learn about fullstack projects:
        </p>
        <p className="text-lg text-gray-600">
          Frontend, Backend, and much more.
        </p>
      </div>
      <div className="w-full max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6">Contributions</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Parita</h1>
            <p className="text-lg py-1 text-primary border rounded-lg bg-blue-300">Frontend</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Sahil</h1>
            <p className="text-lg py-1 text-primary border rounded-lg bg-blue-300">Backend</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Dhruv</h1>
            <p className="text-lg py-1 text-primary border rounded-lg bg-blue-300">Frontend and Backend</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Category Page</h1>
            <p className="text-lg text-gray-600">Here you can perform CRUD in categories and view them.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Product Page</h1>
            <p className="text-lg text-gray-600">Here you can perform CRUD in Product and view them.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Project Page</h1>
            <p className="text-lg text-gray-600">Here you can perform CRUD in Projects and view them.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Taks Page</h1>
            <p className="text-lg text-gray-600">Here you can perform CRUD in Taks and view them.</p>
          </div>
        </div>
      </div>
    </div>    
    </>
  );
}
