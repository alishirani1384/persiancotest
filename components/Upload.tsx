"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdClose, IoMdImages } from "react-icons/io";

const FileUpload = () => {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2 MB limit.");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    console.log(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1, 
    maxSize: 2 * 1024 * 1024, 
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`p-6 mt-4 border-4 bg-white text-black border-themeBtn h-[200px] w-full flex items-center justify-center rounded-lg ${
          isDragActive ? "border-blue-400 bg-blue-50" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="flex items-center flex-col">
            <IoMdImages size={48} />
            <p className="text-xl font-light opacity-75">
              Drop the files Here ...
            </p>
            <p className="opacity-60 font-light text-sm">
              Only ( .jpeg - .png) files are supported
            </p>
          </div>
        ) : (
          <div className="flex items-center flex-col">
            <IoMdImages size={48} />
            <p className="text-xl font-light opacity-75">
              انتخاب فایل یا رها کردن فایل ها در این محدوده
            </p>
            <p className="opacity-60 font-light text-sm">
              یک فایل انتخاب کنید حداکثر حجم 2 مگابایت باشد
            </p>
          </div>
        )}
      </div>
      {imagePreview && (
        <div className="flex items-center bg-white rounded-lg mt-4 justify-between p-5">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-[50px] h-[50px] rounded-lg"
            />
          )}
          <button type="button" className="text-black">
            <IoMdClose size={30} />
          </button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
