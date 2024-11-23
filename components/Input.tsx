"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Calendar, CalendarProvider } from "zaman"; 

interface InputFieldProps {
  name: string;
  type: "text" | "email" | "phone" | "date" | "select";
  options?: { value: string; label: string }[]; 
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  options,
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  
  const labelRef = React.useRef<HTMLLabelElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); 
  const [calendarValue, setCalendarValue] = useState(new Date());
  
  const inputValue = watch(name);

  const persianDateFormatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };

  const isLabelActive = isFocused || (inputValue && inputValue.length > 0) || calendarValue;

  return (
    <div className="relative">
      {type === "select" ? (
        <div className="relative">
          <select
            {...register(name)}
            className={`block w-full border relative text-black border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:ring-purple-500 ${
              errors[name] ? "border-red-500" : ""
            }`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue=""
          >
            {options?.map((option) => (
              <option
                className="text-black"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <label
            className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-200 ${isLabelActive ? 'active' : ''} ${
              errors[name] ? "text-red-500" : "text-gray-600"
            }`}
          >
            {placeholder}
          </label>
        </div>
      ) : type === "date" ? (
        <CalendarProvider locale="fa">
          <div className="relative">
            <input
              {...register(name)}
              type="text"
              id={name}
              dir="rtl"
              className={`block w-full text-black border border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:ring-purple-500 ${
                errors[name] ? "border-red-500" : ""
              }`}
              onClick={() => setShowCalendar(!showCalendar)}
              value={persianDateFormatter.format(calendarValue)}
              readOnly
            />
            <label
              ref={labelRef}
              className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-200 cursor-text ${
                isLabelActive ? 'active' : ''
              } ${
                errors[name] ? "text-red-500" : "text-gray-600"
              }`}
              htmlFor={name}
            >
              {placeholder}
            </label>

            {showCalendar && (
              <div className="absolute left-0 top-full mt-1 z-10">
                <Calendar
                  defaultValue={calendarValue}
                  onChange={(e) => {
                    setCalendarValue(new Date(e.value));
                    setValue(name, persianDateFormatter.format(new Date(e.value))); 
                  }}
                  className="border border-gray-300 rounded-md shadow-lg"
                />
              </div>
            )}
          </div>
        </CalendarProvider>
      ) : (
        <div className="relative">
          <input
            {...register(name)}
            type={type}
            id={name}
            dir="rtl"
            className={`block w-full text-black border border-gray-300 rounded-md p-4 focus:outline-none focus:ring focus:ring-purple-500 transition-all duration-200 ${
              errors[name] ? "border-red-500" : ""
            }`}
            onFocus={handleFocus}
            onBlur={(e) => {
              handleBlur();
              if (e.target.value === "") {
                labelRef.current?.classList.remove("active");
              }
            }}
          />
          <label
            ref={labelRef}
            className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-200 cursor-text ${
              isLabelActive ? 'active' : ''
            } ${
              errors[name] ? "text-red-500" : "text-gray-600"
            }`}
            htmlFor={name}
          >
            {placeholder}
          </label>
        </div>
      )}

      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default InputField;