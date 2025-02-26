import React from "react";
import Image from "next/image";
import ReviewsSlider from "./reviews";
import Popup from "./popup";

const Result = () => {
  return (
    <>
      <div className="bg-blue-600 text-white p-8">
        {/* Blue area with overlay image */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-right opacity-80"
          style={{ backgroundImage: `url(/mask-group.png)` }}
        ></div>

        <div className="relative z-10 text-center pb-36">
          <p className="mb-4">Assessment Report</p>
          <h1 className="text-3xl font-semibold mb-4">
            Hi, Rahul you’ve been diagnosed with
          </h1>
        </div>
      </div>

      <div className="container">
        {/* Diagnosis Section */}
        <div className="text-center border border-gray-200 p-8 -mt-40 z-10 bg-white rounded-lg shadow-lg">
          <div className="flex items-center space-x-4 mb-6 justify-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full">
              <Image
                src="/pr1.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                width={200}
                height={200}
              />
            </div>
            <div className="text-left">
              <p>Your are currently on</p>
              <h2 className="text-xl font-semibold">Male Pattern Baldness</h2>
              <p className="text-lg">Stage 2</p>
            </div>
          </div>

          <p className="text-lg">
            You’ve been diagnosed with Male pattern hair loss Stage-2. This is
            the best time to resolve your hair issue. We will work on regrowth
            of hair wherever possible.
          </p>
          <p className="mt-4 font-semibold">
            We will ensure your hair thickens and the hair line remains intact.
          </p>
        </div>

        {/* Hair Growth Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Your Hair Growth Is Possible
          </h3>

          <div className="flex justify-between items-center text-left w-3/6 m-auto p-6 bg-gray-900 text-white rounded-lg">
            <div>
              <p className="text-lg">Chance of Success</p>
              <p className="mt-2">*It may take 6-8 months</p>
            </div>
            <div className="text-4xl font-semibold">94%</div>
          </div>

          {/* Hair Growth Progress */}
          <div className="mt-12 flex justify-between items-center space-x-6 w-3/6 m-auto">
            <div className="text-center w-1/4">
              <div className="w-20 h-20 bg-gray-200 rounded-full m-auto">
                <Image
                  src="/pr1.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  width={100}
                  height={100}
                />
              </div>
              <p className="mt-2">You are here</p>
            </div>
            <div className="text-center w-1/4 ml-0 font-semibold">
              <p>Get visible results</p>
            </div>
            <div className="text-center w-1/4">
              <div className="w-20 h-20 bg-gray-200 rounded-full m-auto">
                <Image
                  src="/pr1.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  width={100}
                  height={100}
                />
              </div>
              <p className="mt-2">After 6 months</p>
            </div>
          </div>
        </div>

        {/* Treatment Plan */}
        <div className="mt-12 text-center">
          <h4 className="text-2xl font-semibold mb-4">
            Rahul Hair Regrowth Treatment Plan
          </h4>
        </div>

        <div className="container">
          <div className="">
            <div className="bg-blue-700 flex items-start justify-between space-x-4 text-white p-14 pb-0 rounded-2xl  relative w-full">
              <div className="w-1/3">
                <h2 className="text-2xl font-semibold">1 Month Plan</h2>
                <p className="text-4xl font-bold">₹2,250</p>
                <p className="line-through text-gray-300">₹4,950</p>
                <p className="text-sm">You saved 44% off</p>

                <ul className="mt-4 space-y-2 text-white">
                  <li>
                    • Customized doctor prescription:{" "}
                    <span className="font-bold">₹1000</span>
                  </li>
                  <li>
                    • Ayurvedic diet plan:{" "}
                    <span className="font-bold">₹500</span>
                  </li>
                  <li>
                    • Personal hair coach:{" "}
                    <span className="font-bold">₹500</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <Image
                  src="/arrow-r.png"
                  alt="Hair Capsule Small"
                  width={250}
                  height={250}
                  className="w-48 object-contain m-auto pb-4"
                />
                <button className="bg-white text-blue-700 font-bold py-2 px-4 rounded-lg">
                  Buy Now
                </button>
                <p className="text-sm mt-2">
                  Bills and ships every 3 months.
                  <br />
                  Cancel anytime.
                </p>
              </div>

              <div className="flex space-x-4 w-1/3 justify-end items-end">
                <Image
                  src="/tablets/tab1.png"
                  alt="Hair Capsule Small"
                  width={250}
                  height={250}
                  className="w-32 object-contain -mr-5"
                />
                <Image
                  src="/tablets/tab1.png"
                  alt="Hair Capsule"
                  width={250}
                  height={250}
                  className="w-52 object-cover -mb-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg-gray-100 py-10 my-20">
        <div className="container">
          <h4 className="text-2xl font-semibold mb-6 text-center">
            Rahul Doctor Prescribed Plan - (4 Products)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-xl">
              <Image
                src="/tablets/tab1.png"
                alt="Hair Capsule"
                width={250}
                height={250}
                className="w-36 object-contain m-auto mb-4"
              />
              <h2 className="font-semibold text-base">
                Hair Ras hair herbs | 100% nature hair supplement
              </h2>
              <h4 className="text-2xl font-semibold mt-4 text-blue-700">
                ₹ 530.25
              </h4>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <Image
                src="/tablets/tab1.png"
                alt="Hair Capsule"
                width={250}
                height={250}
                className="w-36 object-contain m-auto mb-4"
              />
              <h2 className="font-semibold text-base">
                Hair Ras hair herbs | 100% nature hair supplement
              </h2>
              <h4 className="text-2xl font-semibold mt-4 text-blue-700">
                ₹ 530.25
              </h4>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <Image
                src="/tablets/tab1.png"
                alt="Hair Capsule"
                width={250}
                height={250}
                className="w-36 object-contain m-auto mb-4"
              />
              <h2 className="font-semibold text-base">
                Hair Ras hair herbs | 100% nature hair supplement
              </h2>
              <h4 className="text-2xl font-semibold mt-4 text-blue-700">
                ₹ 530.25
              </h4>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <Image
                src="/tablets/tab1.png"
                alt="Hair Capsule"
                width={250}
                height={250}
                className="w-36 object-contain m-auto mb-4"
              />
              <h2 className="font-semibold text-base">
                Hair Ras hair herbs | 100% nature hair supplement
              </h2>
              <h4 className="text-2xl font-semibold mt-4 text-blue-700">
                ₹ 530.25
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="section p-10">
        <div className="container">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold min-w-80">
              New hair growth now possible with 100% safety
            </h2>
            <p className="md:ml-28">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled
            </p>
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 mt-8 gap-8">
            <div className="">
              <Image
                src="/results/feature1.png"
                alt="Profile"
                className="w-full rounded-2xl"
                width={500}
                height={500}
              />
              <div className="py-6 px-14 text-center relative z-20 -mt-16 w-3/5 m-auto bg-white rounded-2xl shadow-lg">
                <p className="font-semibold text-lg">
                  Scientific natural DHT Inhibitor treatment for male pattern
                  hair
                </p>
              </div>
            </div>
            <div className="">
              <Image
                src="/results/feature2.png"
                alt="Profile"
                className="w-full rounded-2xl"
                width={500}
                height={500}
              />
              <div className="py-6 px-14 text-center relative z-20 -mt-16 w-3/5 m-auto bg-white rounded-2xl shadow-lg">
                <p className="font-semibold text-lg">
                  Scientific natural DHT Inhibitor treatment for male pattern
                  hair
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section py-10">
        <div className="max-w-3xl m-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">
            When will I see results?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="">
              <h3 className="text-2xl font-semibold mb-4">
                Real result in just 4-6 months
              </h3>
              <p>
                Our treatments are 90% effective at stopping hair loss and 66%
                of men experience regrowth.
              </p>
            </div>
            <div className="flex justify-between space-x-5 w-full">
              <Image
                src={"/results/before.png"}
                alt="Profile"
                className=" rounded-2xl"
                width={160}
                height={140}
              />
              <Image
                src={"/results/after.png"}
                alt="Profile"
                className=" rounded-2xl"
                width={160}
                height={140}
              />
            </div>
          </div>
        </div>
      </div>

      <ReviewsSlider />

      {/* Call to Action */}
      <div className="section py-10">
        <div className="container">
          <div className="flex items-center justify-center max-w-screen-md m-auto">
            <div className="w-full">
              <h2 className="text-gray-900 text-2xl font-semibold mb-4">
                Meet Your Consulting Doctor
              </h2>

              <div className="bg-blue-700 text-white p-6 rounded-lg flex items-center relative min-h-60">
                <div className="flex-1">
                  <h1 className="text-3xl font-semibold">Dr. Ketki Mehta</h1>
                  <p className="mt-2 text-base">
                    Trichology's 15+ years of experience
                  </p>
                  <p className="text-base">Treated over 80k+ patients</p>
                </div>
                <div className="absolute right-8 top-[35%] transform -translate-y-1/2">
                  <Image
                    src="/results/doctor.png"
                    alt="Doctor"
                    width={400}
                    height={600}
                    className="w-48 h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup />

    </>
  );
};

export default Result;
