"use client";

import React, { useState } from "react";

interface Field {
  name: string;
  label: string;
  type: "text" | "radio" | "checkbox" | "textarea" | "select" | "tel" | "email";
  options?: string[]; // For radio, checkbox, and select fields
  visibleIf?: (formValues: any) => boolean; // Conditional visibility function
}

interface SubStep {
  title: string;
  fields: Field[];
}

interface Step {
  name: string;
  fields: SubStep[];
}

const StepForm: React.FC = () => {
  const steps: Step[] = [
    {
      name: "Personal Information",
      fields: [
        {
          title: "Name",
          fields: [{ name: "name", label: "Your Name", type: "text" }],
        },
        {
          title: "Phone Number",
          fields: [{ name: "phone", label: "Phone Number", type: "text" }],
        },
        {
          title: "Email",
          fields: [{ name: "email", label: "Your Email", type: "email" }],
        },
        {
          title: "Gender",
          fields: [
            {
              name: "gender",
              label: "Gender",
              type: "radio",
              options: ["Male", "Female"],
            },
          ],
        },
      ],
    },
    {
      name: "Hair Health",
      fields: [
        {
          title: "Male & Female Check",
          fields: [
            {
              name: "hairLossDescribeImage",
              label: "Which image best describes your hair loss?",
              type: "radio",
              options: ["Image 11", "Image 22", "Image 33"],
              visibleIf: (formValues) => formValues.gender === "Male",
            },
            {
              name: "hairLookLikeNaturally",
              label: "What Does Your Hair Look Like Naturally?",
              type: "radio",
              options: ["Straight", "Wavy", "Curly", "Coily"],
              visibleIf: (formValues) => formValues.gender === "Female",
            },
          ],
        },
        {
          title: "Male & Female Check",
          fields: [
            {
              name: "familiyHistoryOfHairLossMother",
              label: "Do You Have a Family History of Hair Loss (Mother)?",
              type: "radio",
              options: ["Mother", "Father", "Both", "None"],
              visibleIf: (formValues) =>
                formValues.gender === "Male" &&
                formValues.hairLossDescribeImage === "Image 11",
            },
            {
              name: "noticingHairLoss",
              label: "Where are you noticing Hair Loss?",
              type: "radio",
              options: ["Front", "Top", "Both Side"],
              visibleIf: (formValues) =>
                formValues.gender === "Male" &&
                formValues.hairLossDescribeImage === "Image 22",
            },
            {
              name: "mostImportantGoalCurrently",
              label: "What is your most important goal currently?",
              type: "radio",
              options: [
                "Control Hairfall",
                "Regrow Hair",
                "Improve Hair Quality",
              ],
              visibleIf: (formValues) =>
                formValues.gender === "Female" &&
                formValues.hairLookLikeNaturally === "Straight" ||
                formValues.hairLookLikeNaturally === "Wavy" ||
                formValues.hairLookLikeNaturally === "Curly" ||
                formValues.hairLookLikeNaturally === "Coily",
            },
          ],
        },
        {
          title: "Have you experienced any of the below in the last 1 year?",
          fields: [
            {
              name: "familiyHistoryOfHairLossMother",
              label: "Do You Have a Family History of Hair Loss (Mother)?",
              type: "radio",
              options: ["Mother", "Father", "Both", "None"],
              visibleIf: (formValues) =>
                formValues.gender === "Male" &&
                formValues.noticingHairLoss === "Front" ||
                formValues.noticingHairLoss === "Top" ||
                formValues.noticingHairLoss === "Both Side",
            },
            {
              name: "youreFacingHairFallMoreThanUsual?",
              label:
                "Do you feel like you're facing Hair Fall more than usual?",
              type: "radio",
              options: [
                "Yes, extreme hair fall",
                "Mild hair fall",
                "No Hair fall",
              ],
              visibleIf: (formValues) =>
                formValues.gender === "Female" &&
                formValues.mostImportantGoalCurrently === "Control Hairfall" ||
                formValues.mostImportantGoalCurrently === "Regrow Hair" ||
                formValues.mostImportantGoalCurrently === "Improve Hair Quality",
            },
            {
              name: "experiencedAnyOfBelow",
              label:
                "Have you experienced any of the below in the last 1 year?",
              type: "radio",
              options: [
                "None",
                "Severe Illness",
                "Heavy Weight Loss / Heavy Weight Gain",
                "Surgery / heavy medication",
              ],
              visibleIf: (formValues) =>
                (formValues.hairLossDescribeImage === "Image 11" &&
                  formValues.familiyHistoryOfHairLossMother === "Mother") ||
                formValues.familiyHistoryOfHairLossMother === "Father" ||
                formValues.familiyHistoryOfHairLossMother === "Both" ||
                formValues.familiyHistoryOfHairLossMother === "None",
            }
          ],
        },
        {
          title: "Front top both side",
          fields: [
            {
              name: "experiencedAnyOfBelow2",
              label:
                "Have you experienced any of the below in the last 1 year?",
              type: "radio",
              options: [
                "None",
                "Severe Illness",
                "Heavy Weight Loss / Heavy Weight Gain",
                "Surgery / heavy medication",
              ],
              visibleIf: (formValues) =>
                formValues.familiyHistoryOfHairLossMother === "Mother" ||
                formValues.familiyHistoryOfHairLossMother === "Father" ||
                formValues.familiyHistoryOfHairLossMother === "Both" ||
                formValues.familiyHistoryOfHairLossMother === "None",
            },
          ],
        },
      ],
    },
    {
      name: "Your Lifestyle",
      fields: [
        {
          title: "address2",
          fields: [{ name: "address2", label: "Address2", type: "text" }],
        },
      ],
    },
    {
      name: "Scalp Assessment",
      fields: [
        {
          title: "address3",
          fields: [{ name: "address3", label: "Address3", type: "text" }],
        },
      ],
    },
    // {
    //   name: 'Completion',
    //   fields: ['Thank you for completing the form'],
    // },
  ];

  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(0); // Main step
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0); // inner stepss
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  console.log("formValues", formValues);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Function to check if a field should be visible based on form values
  const checkVisibleCondition = (field: Field, formValues: any) => {
    console.log("field", field.label);
    if (field.visibleIf) {
      console.log("fields", field.visibleIf(formValues));
      return field.visibleIf(formValues);
    }
    return true; // If no condition is provided, return true to make it visible by default
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: string
  ) => {
    const { name } = e.target;
    const selectedOptions = formValues[name] || [];
    if (e.target.checked) {
      setFormValues({ ...formValues, [name]: [...selectedOptions, option] });
    } else {
      setFormValues({
        ...formValues,
        [name]: selectedOptions.filter((item: string) => item !== option),
      });
    }
  };

  const handleNext = () => {
    if (currentFieldIndex < steps[currentStep].fields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1); // Move to the next field in the current main step
    } else if (currentStep < totalSteps - 1) {
      // If all fields are done in the current main step, move to the next main step
      setCurrentStep(currentStep + 1);
      setCurrentFieldIndex(0); // Reset to the first field for the next main step
    }
  };

  // const handlePrevious = () => {
  //   if (currentFieldIndex > 0) {
  //     setCurrentFieldIndex(currentFieldIndex - 1); // Go to the previous field in the current main step
  //   } else if (currentStep > 0) {
  //     // If there are no more fields to go back to, go to the previous main step
  //     setCurrentStep(currentStep - 1);
  //     setCurrentFieldIndex(steps[currentStep - 1].fields.length - 1); // Set the last field of the previous step
  //   }
  // };

  const handlePrevious = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1); // Go to the previous field in the current main step
    } else if (currentStep > 0) {
      // If there are no more fields to go back to, go to the previous main step
      setCurrentStep(currentStep - 1);
      setCurrentFieldIndex(steps[currentStep - 1].fields.length - 1); // Set the last field of the previous step
    }

    // Remove the value of the current field from formValues if it's visible and currently filled
    const currentField = steps[currentStep].fields[currentFieldIndex].fields[0];
    console.log("currentField needs deletion", currentField.name);
    if (formValues[currentField.name]) {
      setFormValues((prev) => {
        const updatedFormValues = { ...prev };
        delete updatedFormValues[currentField.name]; // Remove the value of the field from formValues
        return updatedFormValues;
      });
    }
  };

  const progress =
    ((currentStep + currentFieldIndex / steps[currentStep].fields.length) /
      totalSteps) *
    100;

  // console.log("step current ,,,", steps[currentStep].fields[currentFieldIndex]);

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Step Form</h2>

      {/* Progress Bar */}
      <div className="relative pt-1 mb-6">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
            Progress: {Math.round(progress)}%
          </div>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Step Names */}
      <div className="mb-4 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`inline-block mx-2 px-3 py-1 rounded-md text-sm ${
              index <= currentStep ? "text-green-600" : "text-gray-400"
            }`}
          >
            {step.name}
          </div>
        ))}
      </div>

      {/* Main Form Steps with Inner Fields */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">{steps[currentStep].name}</h3>
        <div>
          <label className="block text-gray-700 mb-2">
            {/* {steps[currentStep].fields[currentFieldIndex]} */}
            {steps[currentStep].fields[currentFieldIndex].title}
          </label>
          {steps[currentStep].fields[currentFieldIndex].fields.map(
            (field, index) => (
              <div key={index}>
                {checkVisibleCondition(field, formValues) ? (
                  <>
                    {field.type === "text" && (
                      <input
                        type="text"
                        name={field.name}
                        value={formValues[field.name] || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                    {field.type === "email" && (
                      <input
                        type="email"
                        name={field.name}
                        value={formValues[field.name] || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                    {field.type === "textarea" && (
                      <textarea
                        name={field.name}
                        value={formValues[field.name] || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                    {field.type === "select" && (
                      <select
                        name={field.name}
                        value={formValues[field.name] || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option: any, i: any) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.type === "radio" && (
                      <div className="mt-2">
                        {field.options?.map((option, i) => (
                          <div key={i} className="flex items-center">
                            <input
                              type="radio"
                              name={field.name}
                              value={option}
                              checked={formValues[field.name] === option}
                              onChange={handleInputChange}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    {field.type === "checkbox" && (
                      <div className="mt-2">
                        {field.options?.map((option, i) => (
                          <div key={i} className="flex items-center">
                            <input
                              type="checkbox"
                              name={field.name}
                              checked={
                                formValues[field.name]?.includes(option) ||
                                false
                              }
                              onChange={(e) => handleCheckboxChange(e, option)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          disabled={currentStep === 0 && currentFieldIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {currentStep === totalSteps - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepForm;

// import React, { useState } from 'react';

// const StepForm: React.FC = () => {
//   const steps = [
//     'About You',
//     'Hair Health',
//     'Your Lifestyle',
//     'Scalp Assessment'
//   ];
//   const totalSteps = steps.length;

//   const [currentStep, setCurrentStep] = useState(0);

//   const handleNext = () => {
//     if (currentStep < totalSteps - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const progress = ((currentStep + 1) / totalSteps) * 100;

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">Step Form</h2>

//       {/* Progress Bar */}
//       <div className="relative pt-1 mb-6">
//         <div className="flex mb-2 items-center justify-between">
//           <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
//             Progress: {Math.round(progress)}%
//           </div>
//         </div>
//         <div className="w-full bg-gray-300 rounded-full h-2.5">
//           <div
//             className="bg-green-600 h-2.5 rounded-full"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* Step Names */}
//       <div className="mb-4 text-center">
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className={`inline-block mx-2 px-3 py-1 rounded-md text-sm ${
//               index <= currentStep ? 'text-green-600' : 'text-gray-400'
//             }`}
//           >
//             {step}
//           </div>
//         ))}
//       </div>

//       {/* Form Steps */}
//       <div className="space-y-6">
//         {currentStep === 0 && (
//           <div>
//             <h3 className="text-lg font-semibold">About You</h3>
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded"
//               placeholder="Enter your name"
//             />
//           </div>
//         )}
//         {currentStep === 1 && (
//           <div>
//             <h3 className="text-lg font-semibold">Hair Health</h3>
//             <input
//               type="email"
//               className="w-full p-2 border border-gray-300 rounded"
//               placeholder="Enter your email"
//             />
//           </div>
//         )}
//         {currentStep === 2 && (
//           <div>
//             <h3 className="text-lg font-semibold">Your Lifestyle</h3>
//             <p className="text-gray-600">Review your information before submitting.</p>
//           </div>
//         )}
//         {currentStep === 3 && (
//           <div>
//             <h3 className="text-lg font-semibold">Scalp Assessment</h3>
//             <p className="text-green-600">Thank you for completing the form!</p>
//           </div>
//         )}
//         {/* {currentStep === 4 && (
//           <div>
//             <h3 className="text-lg font-semibold">Completion</h3>
//             <p className="text-green-600">Thank you for completing the form!</p>
//           </div>
//         )} */}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={handlePrevious}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
//           disabled={currentStep === 0}
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNext}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StepForm;

// import React, { useState, useEffect } from "react";

// // Define TypeScript interfaces
// interface Field {
//   name: string;
//   label: string;
//   type: "text" | "radio" | "checkbox" | "textarea" | "select" | "tel" | "email";
//   options?: string[]; // For radio, checkbox, and select fields
//   visibleIf?: (formValues: Record<string, any>) => boolean; // Conditional visibility function
// }

// interface SubStep {
//   title: string;
//   fields: Field[];
// }

// interface Step {
//   title: string;
//   subSteps: SubStep[];
// }

// const StepForm: React.FC = () => {
//   const [currentMainStep, setCurrentMainStep] = useState(0);
//   const [currentSubStep, setCurrentSubStep] = useState(0);
//   const [formValues, setFormValues] = useState<Record<string, any>>({});
//   const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>(
//     {}
//   );

//   // Form data
//   const formData: Step[] = [
//     {
//       title: "About You",
//       subSteps: [
//         {
//           title: "Sub Step 1.1",
//           fields: [{ name: "name", label: "Your Name", type: "text" }],
//         },
//         {
//           title: "Sub Step 1.2",
//           fields: [
//             { name: "phoneNumber", label: "Phone Number", type: "text" },
//           ],
//         },
//         {
//           title: "Sub Step 1.3",
//           fields: [{ name: "email", label: "Email", type: "text" }],
//         },
//         {
//           title: "Sub Step 1.4",
//           fields: [{ name: "age", label: "How Old Are You?", type: "text" }],
//         },
//         {
//           title: "Sub Step 1.5",
//           fields: [
//             {
//               name: "gender",
//               label: "Gender",
//               type: "radio",
//               options: ["Male", "Female"],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Hair Health",
//       subSteps: [
//         {
//           title: "Sub Step 2.1",
//           fields: [
//             {
//               name: "hairLossDescribeImage",
//               label: "Which image best describes your hair loss?",
//               type: "radio",
//               options: ["Image 11", "Image 22", "Image 33"],
//               visibleIf: (formValues) => formValues.gender === "Male", // Visible if gender is Male
//             },
//             {
//               name: "hairLookLikeNaturally",
//               label: "What Does Your Hair Look Like Naturally?",
//               type: "radio",
//               options: ["Straight", "Wavy", "Curly", "Coily"],
//               visibleIf: (formValues) => formValues.gender === "Female", // Visible if gender is Female
//             },
//           ],
//         },
//         {
//           title: "Sub Step 2.2",
//           fields: [
//             {
//               name: "familiyHistoryOfHairLossMother",
//               label: "Do You Have a Family History of Hair Loss (Mother)?",
//               type: "radio",
//               options: ["Mother", "Father", "Both", "None"],
//               visibleIf: (formValues) =>
//                 formValues.hairLossDescribeImage === "Image 11", // Visible if Image 11 is selected
//             },
//             {
//               name: "noticingHairLoss",
//               label: "Where are you noticing Hair Loss?",
//               type: "radio",
//               options: ["Front", "Top", "Both Side"],
//               visibleIf: (formValues) =>
//                 formValues.hairLossDescribeImage === "Image 22", // Visible if Image 22 is selected
//             },
//           ],
//         },
//         {
//           title: "Sub Step 2.2",
//           fields: [
//             {
//               name: "mostImportantGoalCurrently",
//               label: "What is your most important goal currently?",
//               type: "radio",
//               options: [
//                 "Control Hairfall",
//                 "Regrow Hair",
//                 "Improve Hair Quality",
//               ],
//               visibleIf: (formValues) =>
//                 formValues.hairLookLikeNaturally === "Straight", // Only visible if "Straight" is selected
//             },
//             {
//               name: "mostImportantGoalCurrently1",
//               label: "What is your most important goal currently?",
//               type: "radio",
//               options: [
//                 "Control Hairfall",
//                 "Regrow Hair",
//                 "Improve Hair Quality",
//               ],
//               visibleIf: (formValues) =>
//                 formValues.hairLookLikeNaturally === "Wavy", // Only visible if "Wavy" is selected
//             },
//             {
//               name: "mostImportantGoalCurrently2",
//               label: "What is your most important goal currently?",
//               type: "radio",
//               options: [
//                 "Control Hairfall",
//                 "Regrow Hair",
//                 "Improve Hair Quality",
//               ],
//               visibleIf: (formValues) =>
//                 formValues.hairLookLikeNaturally === "Curly", // Only visible if "Curly" is selected
//             },
//             {
//               name: "mostImportantGoalCurrently3",
//               label: "What is your most important goal currently?",
//               type: "radio",
//               options: [
//                 "Control Hairfall",
//                 "Regrow Hair",
//                 "Improve Hair Quality",
//               ],
//               visibleIf: (formValues) =>
//                 formValues.hairLookLikeNaturally === "Coily", // Only visible if "Coily" is selected
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Your Lifestyle",
//       subSteps: [
//         {
//           title: "Sub Step 3.1",
//           fields: [
//             {
//               name: "field6",
//               label: "Field 6",
//               type: "radio",
//               options: ["Radio 1", "Radio 2", "Radio 3"],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Scalp Assessment",
//       subSteps: [
//         {
//           title: "Sub Step 4.1",
//           fields: [
//             {
//               name: "field7",
//               label: "Field 7",
//               type: "radio",
//               options: ["Radio 1", "Radio 2", "Radio 3"],
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   console.log("formValues", formValues);

//   // Function to reset related fields when certain conditions change
//   useEffect(() => {
//     const updateVisibleFields = () => {
//       const currentStepData = formData[currentMainStep];
//       const currentSubStepData = currentStepData.subSteps[currentSubStep];

//       let updatedVisibleFields: Record<string, boolean> = {};

//       currentSubStepData.fields.forEach((field) => {
//         updatedVisibleFields[field.name] = field.visibleIf
//           ? field.visibleIf(formValues)
//           : true; // Field is visible if no condition
//       });

//       setVisibleFields(updatedVisibleFields);
//     };

//     // Update the visibility based on the selected gender
//     updateVisibleFields();
//   }, [formValues, currentMainStep, currentSubStep]);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     option: string
//   ) => {
//     const { name } = e.target;
//     const selectedOptions = formValues[name] || [];
//     if (e.target.checked) {
//       setFormValues({ ...formValues, [name]: [...selectedOptions, option] });
//     } else {
//       setFormValues({
//         ...formValues,
//         [name]: selectedOptions.filter((item: string) => item !== option),
//       });
//     }
//   };

//   const nextStep = () => {
//     const currentStepData = formData[currentMainStep];
//     if (currentSubStep < currentStepData.subSteps.length - 1) {
//       setCurrentSubStep(currentSubStep + 1); // Move to next sub-step
//     } else if (currentMainStep < formData.length - 1) {
//       setCurrentMainStep(currentMainStep + 1); // Move to next main step
//       setCurrentSubStep(0); // Reset sub-step to 0
//     }
//   };

//   const prevStep = () => {
//     if (currentSubStep > 0) {
//       setCurrentSubStep(currentSubStep - 1); // Move to previous sub-step
//     } else if (currentMainStep > 0) {
//       setCurrentMainStep(currentMainStep - 1); // Move to previous main step
//       setCurrentSubStep(formData[currentMainStep - 1].subSteps.length - 1); // Set to last sub-step of the previous main step
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formValues);
//   };

//   const currentStepData = formData[currentMainStep];
//   const currentSubStepData = currentStepData.subSteps[currentSubStep];

//   // Calculate total sub-steps
//   const totalSubSteps = formData.reduce(
//     (acc, step) => acc + step.subSteps.length,
//     0
//   );

//   // Calculate completed sub-steps
//   const completedSubSteps =
//     formData
//       .slice(0, currentMainStep)
//       .reduce((acc, step) => acc + step.subSteps.length, 0) +
//     currentSubStep +
//     1;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           {currentStepData.title} - {currentSubStepData.title}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {currentSubStepData.fields.map((field, index) => (
//             <div
//               key={index}
//               className={`mb-4 ${visibleFields[field.name] ? "" : "hidden"}`}
//             >
//               <label className="block text-sm font-medium text-gray-700">
//                 {field.label}
//               </label>
//               {field.type === "text" && (
//                 <input
//                   type="text"
//                   name={field.name}
//                   value={formValues[field.name] || ""}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               )}
//               {field.type === "textarea" && (
//                 <textarea
//                   name={field.name}
//                   value={formValues[field.name] || ""}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               )}
//               {field.type === "select" && (
//                 <select
//                   name={field.name}
//                   value={formValues[field.name] || ""}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select an option</option>
//                   {field.options?.map((option, i) => (
//                     <option key={i} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               )}
//               {field.type === "radio" && (
//                 <div className="mt-2">
//                   {field.options?.map((option, i) => (
//                     <div key={i} className="flex items-center">
//                       <input
//                         type="radio"
//                         name={field.name}
//                         value={option}
//                         checked={formValues[field.name] === option}
//                         onChange={handleInputChange}
//                         className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
//                       />
//                       <label className="ml-2 text-sm text-gray-700">
//                         {option}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {field.type === "checkbox" && (
//                 <div className="mt-2">
//                   {field.options?.map((option, i) => (
//                     <div key={i} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name={field.name}
//                         checked={
//                           formValues[field.name]?.includes(option) || false
//                         }
//                         onChange={(e) => handleCheckboxChange(e, option)}
//                         className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
//                       />
//                       <label className="ml-2 text-sm text-gray-700">
//                         {option}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between mt-6">
//             {(currentMainStep > 0 || currentSubStep > 0) && (
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Previous
//               </button>
//             )}
//             {currentMainStep < formData.length - 1 ||
//             currentSubStep < currentStepData.subSteps.length - 1 ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//         <div className="mt-6">
//           <h3 className="text-sm font-medium text-gray-700">Progress</h3>
//           <progress
//             value={completedSubSteps}
//             max={totalSubSteps}
//             className="w-full h-2 rounded-full bg-gray-200"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StepForm;
