import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto p-4 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
              width={20}
              height={8}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Gommerce
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © { new Date().getFullYear() }{" "}
          <a href="#" className="hover:underline">
            Gommerce
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
export default Footer;