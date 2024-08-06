import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonAppBar from "@/components/ui/ButtonAppBar";
import Image from "next/image";
import AddCategoryform from "../components/ui/AddCategoryForm";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-10 m-4 ">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold mb-4 text-primary">
            Implementing our Skills!
          </h1>
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            Exploring our ideas together
          </h1>
          <p className="text-lg text-gray-600 italic">
            This is a project which helped us learn about fullstack projects using Tech Stack Like: (Nestjs and Nextjs)
          </p>
          <p className="text-lg text-gray-600 italic font-semibold">
            Frontend, Backend, and much more.
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl font-semibold text-blue-600 mb-6">
            Contributions
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-r-2 border-gray-300 md:border-r-2">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Dhruv
              </h1>
              <p className="text-lg py-1 text-primary border rounded-lg bg-blue-300">
                Frontend and Backend
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-r-2 border-gray-300 md:border-r-2">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Sahil
              </h1>
              <p className="text-lg py-1 text-primary border rounded-lg bg-blue-300">
                Frontend and Backend
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-r-2 border-gray-300">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Parita
              </h1>
              <p className="text-lg py-1 text-primary border rounded-lg bg-blue-300">
                Frontend
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-blue-600 mb-6">
            Features
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Category Page
              </h1>
              <p className="text-lg text-gray-600">
                Here you can perform CRUD in categories and view them.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Product Page
              </h1>
              <p className="text-lg text-gray-600">
                Here you can perform CRUD in Product and view them.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Project Page
              </h1>
              <p className="text-lg text-gray-600">
                Here you can perform CRUD in Projects and view them.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Tasks Page
              </h1>
              <p className="text-lg text-gray-600">
                Here you can perform CRUD in Tasks and view them.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-primary p-10 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold">26ideas</h2>
          </div>

          <div className="flex flex-col items-center mt-4 md:mt-0">
            <p className="text-gray-400">Contact Us</p>
            <a
              href="mailto:people@26ideas.com"
              className="text-gray-400 hover:text-white"
            >
              people@26ideas.com
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© Copyright 2024 - 26ideas.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
