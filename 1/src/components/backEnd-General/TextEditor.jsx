import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const TextEditor = ({name, control, label, defaultValue = ''}) => {



  return (
    <div className='w-full'>
        {label && <label>{label}</label>}

        <Controller 
        name={name || 'content'}
        control={control}
        render={({field: {onChange}}) => (
            <Editor 
                initialValue={defaultValue}
                init={{
                    initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    plugins: [
                        'images',
                        'link',
                        'lists',
                        'media',
                        'table',
                        'advlist',
                        'autolink',
                        'lists',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'wordcount',
                    ],
                    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright align',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:'
                }}
                onEditorChange={onChange}
            />
            
        )}
        
        />


    </div>
  )
}

export default TextEditor