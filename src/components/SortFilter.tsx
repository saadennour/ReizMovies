import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";

interface FilterProps {
  name: string;
  options: string[];
  setValue(e: string): any;
}

export const SortFilter: React.FC<FilterProps> = ({
  name,
  options,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: any) => {
    setIsOpen((e.target as HTMLDetailsElement).open);
  };

  return (
    <details className="relative cursor-pointer" onToggle={handleChange}>
      <summary className="bg-slate dark:bg-black200 outline-green w-64 px-4 py-2 flex md:gap-4 items-center justify-between rounded-xl">
        {name}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <BsChevronDown />
        </motion.div>
      </summary>
      <div className="mt-2 flex flex-col gap-1 border-2 border-green rounded-xl py-2">
        {options.map((option, key) => (
          <div
            key={key}
            className="px-2 flex items-center gap-2 hover:bg-green hover:text-white cursor-pointer"
            onClick={() => {
              setValue(option);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </details>
  );
};
