import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 backdrop-blur-md shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
      <nav className="space-x-4 p-10">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link to="/login" className="text-blue-500 hover:underline">
          login
        </Link>
      </nav>
    </header>
  );
}

export default Header;
