import Navbar from './ButtonAppBar';

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="ml-64 w-full">
        {children}
      </div>
    </div>
  );
}