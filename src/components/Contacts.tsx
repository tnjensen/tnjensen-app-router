"use client"

import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {sendMail} from '@/utils/send-email'
import { Button } from './Button'
import { NextResponse } from 'next/server'

export type FormData = {
    name: string,
    email: string,
    message: string
}

const Contacts: FC = () => {
    const {register, formState:{errors}, handleSubmit} = useForm<FormData>()

    function onSubmit(data: FormData){
        sendMail(data)
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-2'>
            <label
              htmlFor='name'
              className='mb-1 block'
            >
              Name
            </label>
            <input
              type='text'
              placeholder='Your name'
              className='w-full rounded-md border border-gray-300 py-2 px-2 mb-1 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
              {...register('name', { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p role='alert' className='text-red-500'>Name is required</p>
            )}
          </div>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='mb-1 block'
            >
              Email
            </label>
            <input
              type='email'
              placeholder='example@domain.com'
              className='w-full rounded-md border border-gray-300 py-2 px-2 mb-1 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
              {...register('email', { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p role='alert' className='text-red-500'>Email is required</p>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='message'
              className='mb-1 block'
            >
              Message
            </label>
            <textarea
              rows={6}
              placeholder='Your message'
              className='w-full rounded-md border border-gray-300 py-2 px-2 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
              {...register('message', { required: true })}
              aria-invalid={errors.message ? "true" : "false"}
            ></textarea>
            {errors.message?.type === "required" && (
              <p role='alert' className='text-red-500'>Message is required</p>
            )}
          </div>
          <div>
            {/* <button className='hover:shadow-form rounded-md bg-blue-600 py-2 px-8 font-semibold uppercase text-white outline-none hover:bg-blue-500'>
              Send
            </button> */}
            <Button
              variant="secondary"
              size="default"
              aria-label='Send'
              title='Send'
            >
              Send
            </Button>
            {NextResponse? 
              <p role='alert' className='text-blue-500'>Email sent</p>
              : ""
            }
          </div>
        </form>
    )
}
export default Contacts

