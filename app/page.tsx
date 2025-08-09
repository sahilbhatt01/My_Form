"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/homepage");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-800 text-white p-8 relative overflow-hidden">
      {/* Subtle SVG Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20200%20200%22%3E%3Cpath%20fill=%22none%22%20stroke=%22rgba(255%2C255%2C255%2C0.1)%22%20stroke-width=%222%22%20d=%22M0%2C0L100%2C100L200%2C0%22/%3E%3Cpath%20fill=%22none%22%20stroke=%22rgba(255%2C255%2C255%2C0.1)%22%20stroke-width=%222%22%20d=%22M0%2C100L100%2C200L200%2C100%22/%3E%3C/svg%3E')] bg-repeat opacity-30 z-0"></div>
      {/* Welcome Section */}
      <div className="text-center mb-10 max-w-2xl mx-auto z-10 relative">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Welcome to Our Platform!
        </h1>
        <p className="text-xl leading-relaxed mb-6">
          {`We're excited to have you here. Click below to get started and explore
          everything we have to offer!`}
        </p>
        <button
          onClick={handleButtonClick}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-xl hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started
        </button>
      </div>

      {/* Developer Content Section */}
      <div className="mt-16 max-w-4xl mx-auto bg-white text-black p-10 rounded-lg shadow-2xl z-10 relative">
        <h2 className="text-4xl font-semibold text-center mb-8">
          Developer Resources
        </h2>
        <p className="text-lg text-center mb-8">
          {`Welcome, developer! Here you'll find all the resources you need to
          integrate, extend, and utilize our platform. Whether you're working on
          API integrations, exploring SDKs, or diving into our documentation,
          everything you need is right here.`}
        </p>

        <div className="space-y-6">
          <div className="border-b pb-6">
            <h3 className="text-2xl font-semibold">API Documentation</h3>
            <p className="text-md mb-4">
              Check out our comprehensive API docs to get started with
              integrations, managing data, and performing various tasks on our
              platform.
            </p>
            <a
              href="/api-docs"
              className="text-blue-600 hover:underline font-medium"
            >
              View API Documentation
            </a>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-2xl font-semibold">SDKs & Libraries</h3>
            <p className="text-md mb-4">
              Access our SDKs and libraries to simplify integration with your
              application. We offer support for various programming languages
              and frameworks.
            </p>
            <a
              href="/sdks"
              className="text-blue-600 hover:underline font-medium"
            >
              Explore SDKs & Libraries
            </a>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-2xl font-semibold">Community Forum</h3>
            <p className="text-md mb-4">
              Join our community forum to discuss ideas, ask questions, and
              collaborate with other developers working with our platform.
            </p>
            <a
              href="/community"
              className="text-blue-600 hover:underline font-medium"
            >
              Join the Community Forum
            </a>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">API Reference</h3>
            <p className="text-md mb-4">
              The API reference provides detailed information on the endpoints,
              methods, and data structures available in our API.
            </p>
            <a
              href="/api-reference"
              className="text-blue-600 hover:underline font-medium"
            >
              View API Reference
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
