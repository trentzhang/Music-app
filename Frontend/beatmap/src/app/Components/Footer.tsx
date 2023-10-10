export const Footer = () => {
  return (
    <footer className=" w-1/3 rounded-lg  backdrop-blur-lg bg-gray-200 text-gray-800  dark:bg-gray-800 m-2">
      <div className="w-full mx-auto max-w-screen-xl p-2 text-sm font-medium  md:flex md:items-center md:justify-evenly ">
        <span className="sm:text-center ">By Trent Zhang</span>
        <ul className="flex flex-wrap items-center mt-3   sm:mt-0">
          <li>
            <a
              href="mailto:trentzhang68@icloud.com?subject=BeatMap Feedback: "
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
