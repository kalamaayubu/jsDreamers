import Image from "next/image";

const ContinueWithGithub = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-lg cursor-pointer border border-gray-200 hover:bg-gray-100 hover:border-gray-200 bg-white transition duration-200 ease-in-out w-full">
      <Image
        width={1000}
        height={1000}
        src={`/assets/githubLogo.png`}
        alt="GitHub"
        className="w-6 h-6"
        priority={true}
      />
      <p className="text-center md:hidden text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        Continue with GitHub
      </p>
      <p className="hidden md:block text-center text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        Continue with GitHub
      </p>
    </div>
  );
};

export default ContinueWithGithub;
