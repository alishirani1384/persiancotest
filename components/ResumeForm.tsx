"use client";
import React from 'react'
import FileUpload from './Upload';
import InputField from './Input';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const schema = z.object({
    email: z.string().email("ایمیل نامعتبر است"),
    phone: z.string().min(10, "شماره تلفن معتبر نیست"),
    text: z.string().min(1, "ابتدا نام و نام خانوادگی را وارد کنید"),
    date: z.string().nonempty("ابتدا تاریخ تولد را وارد کنید"),
  });

function ResumeForm() {
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
      });
    
      const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('https://example.com/api/resume', data);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
      };
      return (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 p-6"
          >
            <InputField name="text" type="text" placeholder="نام و نام خانوادگی" />
            <InputField name="phone" type="phone" placeholder="شماره تلفن" />
            <InputField name="date" type="date" placeholder="تاریخ تولد"/>
            <InputField name="email" type="email" placeholder="ایمیل" />
            <InputField
              name="select"
              type="select"
              options={[
                { value: "معافیت تحصیلی", label: "معافیت تحصیلی" },
                { value: "انجام شده", label: "انجام شده" },
                { value: "مشمول", label: "مشمول" },
              ]}
              placeholder="وضعیت نظام وظیفه"
            />
            <InputField
              name="gender"
              type="select"
              options={[
                { value: "آقا", label: "آقا" },
                { value: "خانم", label: "خانم" },
              ]}
              placeholder="جنسیت"
            />
            <div className="col-span-2">
              رزومه
              <FileUpload/>
            </div>
            <button
              type="submit"
              className="mt-4 col-span-2 mr-auto bg-purple-700 text-white p-2 rounded"
            >
              ثبت رزومه
            </button>
          </form>
        </FormProvider>
      );
}

export default ResumeForm