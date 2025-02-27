import React from "react";
import { CheckBox } from "./CheckBox";

interface FilterProps {
  name: string;
  options: string[];
  values: string[] | string;
  setValues(e: any): any;
  multiselection: boolean;
}

export const Filter: React.FC<FilterProps> = ({
  name,
  options,
  values,
  setValues,
  multiselection,
}) => {
  return (
    <details className="relative cursor-pointer">
      <summary className="hover:border-2 border-black200 bg-slate dark:bg-black200 focus:border-green hover:border-green w-44 px-4 py-2 flex items-center justify-center rounded-xl">
        {name}
      </summary>
      <div className="mt-2 flex flex-col gap-1 border-2 border-green rounded-xl p-2">
        {options.map((option, key) => (
          <div key={key} className="flex items-center gap-2">
            <CheckBox
              values={values}
              setValues={setValues}
              option={option}
              multiselection={multiselection}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </details>
  );
};
