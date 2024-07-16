"use client";

import React from "react";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { FormControl, FormLabel } from "../ui/customForm";
import { Button } from "../ui/button";

const skillSuggestions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Python", label: "Python" },
  { value: "Django", label: "Django" },
  // Add more skill suggestions as needed
];

const SkillsToGainFieldArray = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      skills_to_gain: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills_to_gain",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleSelectChange = (selectedOptions) => {
    setValue(
      "skills_to_gain",
      selectedOptions
        ? selectedOptions.map((option) => ({ name: option.value }))
        : []
    );
  };

  return (
    <div className="w-full space-y-2">
      <FormLabel className="font-semibold">Skills to Gain</FormLabel>
      <Controller
        control={control}
        name="skills_to_gain"
        render={({ field }) => (
          <Select
            {...field}
            options={skillSuggestions}
            isMulti
            onChange={handleSelectChange}
            value={fields.map((field) => ({
              value: field.name,
              label: field.name,
            }))}
            placeholder="Type to add skill"
            className="basic-multi-select h-5 w-full"
            classNamePrefix="select"
          />
        )}
      />
    </div>
  );
};

export default SkillsToGainFieldArray;
