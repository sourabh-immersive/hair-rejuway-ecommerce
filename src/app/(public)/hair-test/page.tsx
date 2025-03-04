"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Field {
  name: string;
  label: string;
  type:
    | "text"
    | "radio"
    | "checkbox"
    | "textarea"
    | "select"
    | "tel"
    | "email"
    | "file"
    | "number";

  options?: string[];
  imageOptions?: {
    src: string;
    for: string;
  }[];
  isImageOptions?: boolean;
  visibleIf?: (formValues: any) => boolean;
}

interface SubStep {
  title: string;
  fields: Field[];
}

interface Step {
  name: string;
  fields: SubStep[];
}

//Male Data Sub PArts

const MaleImage2: SubStep[] = [
  {
    title: "Hair Health 2",
    fields: [
      {
        name: "noticingHairLoss",
        label: "Where are you noticing Hair Loss?",
        type: "radio",
        options: ["Front", "Top", "Both Side"],
        isImageOptions: true,
        imageOptions: [
          { src: "/stage1.png", for: "front" },
          { src: "/stage2.png", for: "top" },
          { src: "/stage3.png", for: "both sides" },
        ],
      },
    ],
  },
];

// Female Data Sub Parts

const FemaleDamagedHairQuality: SubStep[] = [
  {
    title: "Hair Health 6",
    fields: [
      {
        name: "howWouldYouDescribeYourHairDamage",
        label: "How would you describe your hair damage?",
        type: "checkbox",
        options: [
          "Dull hair",
          "Split ends",
          "Frizzy hair",
          "Tangles easily with knots",
          "None",
        ],
      },
    ],
  },
];

const FemalePostPragnancy: SubStep[] = [
  {
    title: "Lifestyle 3",
    fields: [
      {
        name: "areYouCurrentlyBreastFeeding",
        label: "Are you currently breast feeding?",
        type: "radio",
        options: ["Yes", "No"],
      },
    ],
  },
];

const StepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // Main step
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0); // Inner steps
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");

  const router = useRouter();

  // Handle file input change
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Update the preview
      setPreview(URL.createObjectURL(file));
      // Call the parent handler to update form values
      handleInputChange(e);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting the form...");
    router.push("/result");
  };

  console.log("formValues", formValues);

  // Male-specific data
  const MaleData: Step[] = [
    {
      name: "Hair Health",
      fields: [
        {
          title: "Hair Health 1",
          fields: [
            {
              name: "maleHairLossDescribeImage",
              label: "Which image best describes your hair loss?",
              type: "radio",
              options: ["stage1", "stage2", "stage3"],
              isImageOptions: true,
              imageOptions: [
                { src: "/stage1.png", for: "stage1" },
                { src: "/stage2.png", for: "stage2" },
                { src: "/stage3.png", for: "stage3" },
                { src: "/stage4.png", for: "stage4" },
                { src: "/stage5.png", for: "stage5" },
                { src: "/stage6.png", for: "stage6" },
              ],
              visibleIf: (formValues) => formValues.gender === "Male",
            },
          ],
        },
        ...(formValues.maleHairLossDescribeImage === "stage2" ||
        formValues.maleHairLossDescribeImage === "stage3" ||
        formValues.maleHairLossDescribeImage === "stage5"
          ? MaleImage2
          : []),
        {
          title: "Hair Health 3",
          fields: [
            {
              name: "familiyHistoryOfHairLossMother",
              label: "Do you have a family history of hair loss?",
              type: "radio",
              options: [
                "Mother or anyone from mother's side of the family",
                "Father or anyone from father's side of the family",
                "Both",
                "None",
              ],
            },
          ],
        },
        {
          title: "Hair Health 4",
          fields: [
            {
              name: "experiencedAnyOfBelow",
              label:
                "Have you experienced any of the below in the last 1 year?",
              type: "radio",
              options: [
                "Severe Illness (Dengue, Malaria, Typhoid or Covid)",
                "Heavy weight loss / heavy weight gain",
                "Surgery / heavy medication",
                "None",
              ],
            },
          ],
        },
        {
          title: "Hair Health 5",
          fields: [
            {
              name: "doYouHaveDandruff",
              label: "Do you have dandruff?",
              type: "radio",
              options: [
                "No",
                "Yes, mild that comes and goes",
                "I have Psoriasis (A skin condition that causes red, dry patches on your scalp)",
                "I have Seborrheic Dermatitis (A condition making your scalp itchy, red with a burning feeling.)",
                "Yes, heavy dandruff that sticks to the scalp",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Your Lifestyle",
      fields: [
        {
          title: "Lifestyle 1",
          fields: [
            {
              name: "howStressedAreYou",
              label: "How stressed are you?",
              type: "radio",
              options: [
                "None",
                "Low",
                "Moderate(work, family etc)",
                "High (Loss of close one, separation, home, illness)",
              ],
            },
          ],
        },
        {
          title: "Lifestyle 2",
          fields: [
            {
              name: "currentlyDealingWithHealthConditions",
              label:
                "Are you currently dealing with any of these health conditions?",
              type: "checkbox",
              options: [
                "None",
                "Anemia (Low Iron/Haemoglobin)",
                "Low Thyroid (Hypothyroidism)",
                "Asthma",
                "Sinus Problems",
              ],
            },
          ],
        },
        {
          title: "Lifestyle 3",
          fields: [
            {
              name: "doYouFeelConstipated",
              label: "Do you feel constipated?",
              type: "radio",
              options: [
                "No/Rarely",
                "Yes",
                "Unsatisfactory bowel movements",
                "Suffering from IBS (irritable bowel syndrome) /dysentery",
              ],
            },
          ],
        },
        {
          title: "Lifestyle 4",
          fields: [
            {
              name: "howAreYourEnergyLevels",
              label: "How are your energy levels?",
              type: "radio",
              options: [
                "Always high",
                "Low in the morning but gradually increases",
                "Very low in afternoon",
                "Low by evening/night",
                "Always low",
              ],
            },
          ],
        },
        {
          title: "Lifestyle 5",
          fields: [
            {
              name: "takingVitaminsForHair",
              label:
                "Are you currently taking any supplements or vitamins for hair?",
              type: "radio",
              options: ["Yes", "No", "Sure"],
            },
          ],
        },
      ],
    },
    {
      name: "Scalp Check",
      fields: [
        {
          title: "Scalp check 1",
          fields: [
            {
              name: "scalpImage",
              label: "Upload your scalp photo",
              type: "file",
            },
          ],
        },
      ],
    },
  ];

  // Female-specific data
  const FemaleData: Step[] = [
    {
      name: "Hair Health",
      fields: [
        {
          title: "Hair Health 1",
          fields: [
            {
              name: "hairLookLikeNaturally",
              label: "What Does Your Hair Look Like Naturally?",
              type: "radio",
              options: ["Straight", "Wavy", "Curly", "Coily"],
            },
          ],
        },
        {
          title: "Hair Health 2",
          fields: [
            {
              name: "mostImportantGoalCurrently",
              label: "What is your most important goal currently?",
              type: "radio",
              options: [
                "Control Hairfall",
                "Regrow Hair",
                "Improve Hair Quality",
              ],
            },
          ],
        },
        {
          title: "Hair Health 3",
          fields: [
            {
              name: "youreFacingHairFallMoreThanUsual",
              label:
                "Do you feel like you're facing Hair Fall more than usual?",
              type: "radio",
              options: [
                "Yes, extreme hair fall",
                "Mild hair fall",
                "No Hair fall",
              ],
            },
          ],
        },
        {
          title: "Hair Health 4",
          fields: [
            {
              name: "whereYouStandFemailHairScale",
              label: "Where do you stand on the femail hair scale?",
              type: "radio",
              options: ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5"],
              isImageOptions: true,
              imageOptions: [
                { src: "/stage1.png", for: "stage1" },
                { src: "/stage2.png", for: "stage2" },
                { src: "/stage3.png", for: "stage3" },
                { src: "/stage4.png", for: "stage4" },
                { src: "/stage5.png", for: "stage5" },
              ],
            },
          ],
        },
        {
          title: "Hair Health 5",
          fields: [
            {
              name: "describeYourHairQuality",
              label: "Describe your hair quality",
              type: "radio",
              options: ["Good Hair Quality", "Damaged Hair"],
            },
          ],
        },
        // 6 show when damage hair quality
        ...(formValues.describeYourHairQuality === "Damaged Hair"
          ? FemaleDamagedHairQuality
          : []),
        {
          title: "Hair Health 7",
          fields: [
            {
              name: "whatDoesASingleStrandYourHairFeelLlike",
              label: "What does a single strand of your hair feel like?",
              type: "radio",
              options: ["Thin", "Medium", "Thick"],
            },
          ],
        },
        {
          title: "Hair Health 8",
          fields: [
            {
              name: "isHairLossAGeneticIssueInYourFamily",
              label: "Is hair loss a genetic issue in your family?",
              type: "radio",
              options: [
                "Yes, Mother or mother's side of family",
                "Yes, Father or father's side of family",
                "Both",
                "none",
              ],
            },
          ],
        },
        {
          title: "Hair Health 9",
          fields: [
            {
              name: "howLongAfterHairWashDoesYourHairStartToFeelOily",
              label:
                "How long after hair wash does your hair start to feel oily?",
              type: "radio",
              options: ["Within 24 hours", "2-3 days", "More than 4 days"],
            },
          ],
        },
        {
          title: "Hair Health 10",
          fields: [
            {
              name: "describeYourDandruff",
              label: "Describe your dandruff?",
              type: "radio",
              options: [
                "No",
                "Yes, mild that comes and goes",
                "Yes, heavy dandruff that sticks to the scalp",
                "I 'have Psoriasis (A skin condition that causes red, dry patches on your scalp)",
                "I 'have Seborrheic Dermatitis (A condition making your scalp itchy, red with a burning feeling.)",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Your Lifestyle",
      fields: [
        {
          title: "Lifestyle 1",
          fields: [
            {
              name: "areYouGoingThroughAnyOfTheseStages",
              label: "Are you going through any of these stages?",
              type: "radio",
              options: [
                "None",
                "Planning to get pregnant",
                "Pregnancy",
                "Post-pregnancy (Baby is less than 2 years old)",
                "Menopause You don't get monthly periods anymore.",
              ],
            },
          ],
        },
        // conditional based field lifestyle 3
        ...(formValues.areYouGoingThroughAnyOfTheseStages ===
        "Post-pregnancy (Baby is less than 2 years old)"
          ? FemalePostPragnancy
          : []),
        {
          title: "Lifestyle 2",
          fields: [
            {
              name: "haveYouExperiencedAnyOfTheBelowInLast1Year",
              label: "Have you experienced any of the below in last 1 year?",
              type: "checkbox",
              options: [
                "None",
                "Severe Illness (Dengue, Malaria, Typhoid or Covid)",
                "Heavy weight loss or heavy weight gain",
                "Surgery or on heavy medication",
              ],
            },
          ],
        },
        {
          title: "Lifestyle 4",
          fields: [
            {
              name: "areYouGoingThroughAnyOfTheBelow",
              label: "Are you going through any of the below?",
              type: "checkbox",
              options: [
                "None",
                "Anemia (Low Haemoglobin)",
                "Low Thyroid (Hypothyroidism)",
                "PCOS (When a woman's ovaries have tiny bumps and she might have trouble with her periods and hormanes.)",
                "Other Hormonal Issues",
              ],
            },
          ],
        },
        {
          title: "Lifestyle 5",
          fields: [
            {
              name: "areYouCurrentlyTakingAnySupplementsorVitaminsForHair",
              label:
                "Are you currently taking any supplements or vitamins for hair?",
              type: "radio",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          title: "Lifestyle 6",
          fields: [
            {
              name: "howWellDoYouSleep",
              label: "How well do you sleep?",
              type: "radio",
              options: [
                "Peacefully for 6-8 hours",
                "Disturbed sleep, | wake up atleast once a night",
                "Have difficulty falling asleep",
              ],
            },
          ],
        },
        {
          title: "Lifestyle 7",
          fields: [
            {
              name: "doYouCurrentlyExperienceAnyOfTheFollowingHealthConditions",
              label:
                "Do you currently experience any of the following health conditions?",
              type: "radio",
              options: ["None", "Sinus Issue", "Asthma"],
            },
          ],
        },
        {
          title: "Lifestyle 8",
          fields: [
            {
              name: "howStressedAreYou",
              label: "How stressed are you?",
              type: "radio",
              options: ["Not at all", "Low", "Moderate", "High"],
            },
          ],
        },
        {
          title: "Lifestyle 9",
          fields: [
            {
              name: "doYouFeelConstipated",
              label: "Do you feel constipated?",
              type: "radio",
              options: ["No", "Yes", "I have IBS"],
            },
          ],
        },
        {
          title: "Lifestyle 10",
          fields: [
            {
              name: "doYouHaveAcidityBloatingGasOrIndigestion",
              label: "Do you have Acidity, Bloating, Gas or Indigestion?",
              type: "radio",
              options: ["No", "Yes"],
            },
          ],
        },
        {
          title: "Lifestyle 11",
          fields: [
            {
              name: "describeYourEnergyLevels",
              label: "Describe your energy levels?",
              type: "radio",
              options: [
                "Always high",
                "Low when | wake up, but gradually increases",
                "Very low in afternoon",
                "Low by evening/night",
                "Always low",
              ],
            },
          ],
        },
        {
          title: "Lifestyle 12",
          fields: [
            {
              name: "areYouSufferingThroughAnyOfTheseMedicalConditions",
              label:
                "Are you suffering through any of these medical conditions?",
              type: "checkbox",
              options: [
                "None",
                "High Blood Pressure",
                "Low Blood Pressure",
                "Liver Cirrhosis or deranged LFT (Liver Function Test)",
                "Blood disorders (epilepsy. history of stroke)",
                "Cardiovascular disorders (history of heart attack, arrhythmia, pace maker, stroke)",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Scalp Check",
      fields: [
        {
          title: "Scalp check 1",
          fields: [
            {
              name: "scalpImage",
              label: "Upload your scalp photo",
              type: "file",
            },
          ],
        },
      ],
    },
  ];

  const steps: Step[] = [
    {
      name: "About You",
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
          title: "How old are you?",
          fields: [{ name: "age", label: "How old are you?", type: "number" }],
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
    ...(formValues.gender === "Male" ? MaleData : FemaleData),
  ];

  const totalSteps = steps.length;

  // Check if the current field has no fields and automatically move to the next step
  //   useEffect(() => {
  //     const currentFields = steps[currentStep].fields[currentFieldIndex].fields;
  //     if (currentFields.length === 0) {
  //     //   handleNext();

  //     if (currentFieldIndex < steps[currentStep].fields.length - 1) {
  //         setCurrentFieldIndex(currentFieldIndex + 1);
  //       } else if (currentStep < totalSteps - 1) {
  //         setCurrentStep(currentStep + 1);
  //         setCurrentFieldIndex(0);
  //       }

  //     }
  //   }, [currentStep, currentFieldIndex, steps]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
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

  // Validate the current field
  const validateCurrentField = () => {
    const currentFields = steps[currentStep].fields[currentFieldIndex].fields;
    let isValid = true;
    const newErrors: Record<string, string> = {};

    currentFields.forEach((field) => {
      if (!formValues[field.name] || formValues[field.name].length === 0) {
        isValid = false;
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  //   const handleNext = () => {
  //     if (currentFieldIndex < steps[currentStep].fields.length - 1) {
  //       setCurrentFieldIndex(currentFieldIndex + 1);
  //     } else if (currentStep < totalSteps - 1) {
  //       setCurrentStep(currentStep + 1);
  //       setCurrentFieldIndex(0);
  //     }
  //   };

  const handleNext = () => {
    if (validateCurrentField()) {
      if (currentFieldIndex < steps[currentStep].fields.length - 1) {
        setCurrentFieldIndex(currentFieldIndex + 1);
      } else if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
        setCurrentFieldIndex(0);
      }
    }
  };

  const handlePrevious = () => {
    // Get the current field before updating the state
    const currentFields = steps[currentStep].fields[currentFieldIndex].fields;

    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentFieldIndex(steps[currentStep - 1].fields.length - 1);
    }

    // Remove the value of the current field from formValues
    currentFields.forEach((field) => {
      if (formValues[field.name]) {
        setFormValues((prev) => {
          const updatedFormValues = { ...prev };
          delete updatedFormValues[field.name]; // Remove the value of the field from formValues
          return updatedFormValues;
        });
      }
    });
  };

  //   const progress =
  //     ((currentStep + currentFieldIndex / steps[currentStep].fields.length) /
  //       totalSteps) *
  //     100;

  // const totalSteps = steps.length;

  // Calculate the total number of fields across all steps
  const totalFields = steps.reduce((acc, step) => {
    return (
      acc + step.fields.reduce((acc, subStep) => acc + subStep.fields.length, 0)
    );
  }, 0);

  // Calculate the current field position
  let currentFieldPosition = 0;
  for (let i = 0; i < currentStep; i++) {
    currentFieldPosition += steps[i].fields.reduce(
      (acc, subStep) => acc + subStep.fields.length,
      0
    );
  }
  currentFieldPosition += steps[currentStep].fields
    .slice(0, currentFieldIndex + 1)
    .reduce((acc, subStep) => acc + subStep.fields.length, 0);

  // Calculate the progress percentage
  const progress = (currentFieldPosition / totalFields) * 100;

  return (
    <div className="hairTestRow bg-[url(/bg.jpg)] bg-cover bg-bottom bg-no-repeat">
      <div className="max-w-4xl mx-auto p-4 md:p-6 pt-0 pb-44 border border-r-0 border-l-0 border-b-0 border-gray-200 rounded-xl py-10">
        <h2 className="text-xl font-semibold text-center rounded-b-lg mb-6 flex justify-center bg-blue-600 text-white py-3 px-5 w-fit m-auto">
          Start Hair Test
        </h2>

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
        <div className="mb-4 text-center grid w-full gap-4 md:grid-cols-4 border-b border-gray-300 pb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`inline-block mx-2 px-3 py-1 rounded-md text-base font-semibold ${
                index <= currentStep ? "text-green-600" : "text-gray-400"
              }`}
            >
              {step.name}
            </div>
          ))}
        </div>

        {/* Main Form Steps with Inner Fields */}
        <div className="space-y-6 md:p-6">
          {/* <h3 className="text-lg font-semibold">{steps[currentStep].name}</h3> */}
          <div>
            {/* <label className="block text-gray-700 mb-2">
            {steps[currentStep].fields[currentFieldIndex].title}
          </label> */}

            {steps[currentStep].fields[currentFieldIndex].fields.map(
              (field, index) => (
                <div key={index}>
                  {(!field.visibleIf || field.visibleIf(formValues)) && (
                    <>
                      <h3 className="text-xl font-semibold mb-4">
                        {field.label}
                      </h3>
                      {field.type === "text" && (
                        <>
                          <input
                            type="text"
                            name={field.name}
                            value={formValues[field.name] || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </>
                      )}
                      {field.type === "number" && (
                        <>
                          <input
                            type="number"
                            name={field.name}
                            value={formValues[field.name] || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </>
                      )}
                      {field.type === "email" && (
                        <>
                          <input
                            type="email"
                            name={field.name}
                            value={formValues[field.name] || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </>
                      )}
                      {field.type === "textarea" && (
                        <>
                          <textarea
                            name={field.name}
                            value={formValues[field.name] || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </>
                      )}
                      {field.type === "select" && (
                        <>
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
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </>
                      )}
                      {field.type === "radio" && (
                        <>
                          {field.isImageOptions ? (
                            <div className="mt-2 grid w-full gap-6 grid-cols-2 md:grid-cols-4">
                              {field.imageOptions?.map((option, i) => (
                                <div key={i} className="flex items-center">
                                  <input
                                    type="radio"
                                    name={field.name}
                                    id={field.name + i}
                                    value={option.for}
                                    checked={
                                      formValues[field.name] === option.for
                                    }
                                    onChange={handleInputChange}
                                    className="hidden peer"
                                  />
                                  <label
                                    htmlFor={field.name + i}
                                    className="inline-flex items-center justify-between w-full text-gray-500 bg-white  border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                  >
                                    <div className="block">
                                      <div className="w-full text-lg font-semibold">
                                        <Image
                                          src={option.src}
                                          width={200}
                                          height={200}
                                          alt={field.name}
                                        />
                                      </div>
                                      {/* <div className="w-full">
                                  Good for large websites
                                </div> */}
                                    </div>
                                    {/* <svg
                                className="w-5 h-5 ms-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                              </svg> */}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-2 grid w-full gap-6 md:grid-cols-2">
                              {field.options?.map((option, i) => (
                                <div key={i} className="flex items-center">
                                  <input
                                    type="radio"
                                    name={field.name}
                                    id={field.name + i}
                                    value={option}
                                    checked={formValues[field.name] === option}
                                    onChange={handleInputChange}
                                    className="hidden peer"
                                  />
                                  <label
                                    htmlFor={field.name + i}
                                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                  >
                                    <div className="block">
                                      <div className="w-full text-lg font-semibold">
                                        {option}
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </>
                      )}
                      {field.type === "checkbox" && (
                        <>
                          <p className="italic text-sm mb-4">
                            Select at least one option
                          </p>
                          <div className="mt-2 grid w-full gap-6 md:grid-cols-2">
                            {field.options?.map((option, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={field.name + i}
                                  name={field.name}
                                  checked={
                                    formValues[field.name]?.includes(option) ||
                                    false
                                  }
                                  onChange={(e) =>
                                    handleCheckboxChange(e, option)
                                  }
                                  className="hidden peer"
                                />
                                {/* <label className="ml-2 text-sm text-gray-700">
                              {option}
                            </label> */}
                                <label
                                  htmlFor={field.name + i}
                                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                  <div className="block">
                                    <div className="w-full text-lg font-semibold">
                                      {option}
                                    </div>
                                    {/* <div className="w-full text-sm">A JavaScript library for building user interfaces.</div> */}
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </>
                      )}
                      {field.type === "file" && (
                        <>
                          <div className="flex items-center space-x-7 justify-center w-full">
                            {/* Render image preview */}
                            {preview && (
                              <div className="mt-4 max-w-80">
                                <Image
                                  src={preview}
                                  alt="Selected preview"
                                  className="w-full h-auto"
                                  width={400}
                                  height={400}
                                />
                              </div>
                            )}
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                name={field.name}
                                value={formValues[field.name] || ""}
                                // onChange={handleInputChange}
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]}
                            </p>
                          )}
                        </>
                      )}
                    </>
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
            className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50"
            disabled={currentStep === 0 && currentFieldIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep === totalSteps - 1) {
                handleSubmit();
              } else {
                handleNext();
              }
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded"
          >
            {currentStep === totalSteps - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepForm;
