"use client"
import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import React, { useState } from 'react'
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';


type Props = {
    type: string;
    session: SessionInterface
}
const ProjectForm = ({type, session}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    title:'',
    description: '',
    image: '',
    liveSiteUrl:'',
    githubUrl: '',
    category: ''
  })

    const handleFormSubmit = (e:React.FormEvent) => {
      e.preventDefault();

      setIsSubmitting(true);
      try {
        // inside lib/actions.tsx
        if(type ==='create'){

        }
      } catch (error) {
        
      }
    }
    const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => { 
      e.preventDefault();

      const file = e.target.files?.[0]
      
      if(!file) return;

      if(!file.type.includes('image')) {
        return alert('Please upload an image file')
      }
      
      const reader =  new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        handleStateChange('image', result)
      }
     }
     
    const handleStateChange = (fieldName:string, value:string) => {
      setForm((prevState) => (
        // dynamically computed Values
        {...prevState, [fieldName]: value}
        ))
    }


  return (
    <form 
    onSubmit={handleFormSubmit}
    className='flex justify-start items-center flex-col w-full lg:pt-24 pt-12 gap-10 text-lg max-w-5xl mx-auto'
    >
        <div className='flex justify-start items-center w-full lg:min-h-[400px] min-h-[200px] relative'>
          <label htmlFor='poster' className='flex justify-center items-center z-10 text-center w-full h-full p-20 text-gray-100 border-2 border-gray-50 border-dashed'>
            {!form.image && 'Choose a poster for your project'}
        </label>  
            <input
            id="image"
            type='file'
            accept='image/*'
            required={type==='create'}
            className='absolute z-30 w-full opacity-0 h-full cursor-pointer'
            //This is how we update the image in the form field
            onChange={handleChangeImage}
            />
            {form.image && (
                <Image
                src={form?.image}
                className='sm:p-10 object-contain z-20'
                alt='Project poster'
                fill
                />
            )}
        </div>

        <FormField 
          title="Title"
          state={form.title}
          placeholder="Flexxible"
          setState={(value)=>handleStateChange('title', value)}  
        />
          <FormField 
          title="Description"
          state={form.description}
          placeholder="Showcase and discover remarkable developer projects"
          setState={(value)=>handleStateChange('description', value)}  
        />
          <FormField 
          type='url'
          title="Website URL"
          state={form.liveSiteUrl}
          placeholder="https://ej-d.vercel.app"
          setState={(value)=>handleStateChange('liveSiteUrl', value)}  
        />
        <FormField 
         type='url'
         title="Github URL"
         state={form.githubUrl}
         placeholder="https://github.com/EjDadivas"
         setState={(value)=>handleStateChange('githubUrl', value)}  
        />
         {/* Custom Input for Category */}
        <CustomMenu
        title="Category"
        filters={categoryFilters}
        state={form.category}
        setState={(value)=>handleStateChange('category', value)}  
        />
         <div className='flex justify-start items-center w-full'>
            <Button
            title={isSubmitting ?
               `${type === 'create' ? 'Creating' : 'Editing'}`
            : `${type === 'create' ? 'Create' : 'Edit'}`}
            type="submit"
            leftIcon = {isSubmitting? "" : "/plus.svg"}
            isSubmitting={isSubmitting}
            />
                 
         </div>
    </form>
  )
}

export default ProjectForm