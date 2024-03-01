import React from "react";
import "../Styles/AboutSection.css";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className="bg-green-300 flex items-center justify-center min-h-screen">
      <div className="w-1/2 h-full bg-white rounded-lg py-7">
        <h2 className="text-4xl font-bold text-center  text-green-600 sm:text-5xl underline">
          About Re-Eco
        </h2>
        <p className="text-xl text-gray-800 text-semibold text-center leading-relaxed py-8">
          <div className="text-2xl underline text-green-600 font-semibold">Re-Eco</div> 
          This is your one-stop shop for responsible electronic waste
          management. We're passionate about making it easy for individuals and
          businesses to contribute to a cleaner, greener planet by providing
          convenient and eco-friendly solutions for recycling their old devices.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 mx-8">
            <h3 className="text-3xl font-bold text-green-600 underline">Our Mission</h3>
            <p className="text-m text-gray-600 leading-relaxed">
              ReEco is dedicated to empowering people and organizations to
              recycle their electronic waste responsibly. We strive to simplify
              the recycling process.
            </p>
          </div>
          <div className="space-y-4 mx-8">
            <h3 className="text-3xl font-bold  text-green-600 underline">The Impact</h3>
            <p className="text-m text-gray-600 leading-relaxed">
              By choosing ReEco, you're not just recycling your devices, you're
              making a real difference. You're helping to conserve valuable
              resources.
            </p>
            <Link
              to="/User/login" // Replace with your actual path
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Join Our Mission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
