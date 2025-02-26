import { BsCheck } from "react-icons/bs";

interface CheckBoxProps {
  values: string[] | string;
  setValues(e: any): any;
  option: string;
  multiselection: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  values,
  setValues,
  option,
  multiselection,
}) => {
  const checked = multiselection
    ? Array.isArray(values) && values.includes(option)
    : values === option;

  const handleChange = () => {
    if (multiselection) {
      if (Array.isArray(values)) {
        setValues(
          checked ? values.filter((val) => val !== option) : [...values, option]
        );
      }
    } else {
      setValues(checked ? "" : option);
    }
  };

  return (
    <div className="flex items-center relative">
      <input
        type="checkbox"
        className={`appearance-none peer w-[20px] h-[20px] border border-gray-300 rounded ${
          checked ? "bg-green border-0 " : "border-2 bg-white"
        } cursor-pointer`}
        onChange={handleChange}
      />
      <BsCheck
        size={20}
        color={"#EFEFEF"}
        className={`absolute ${
          checked ? "block" : "hidden"
        } pointer-events-none`}
      />
    </div>
  );
};
