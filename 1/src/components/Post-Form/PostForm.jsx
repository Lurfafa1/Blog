import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextEditor, Button, Input, Select, } from '..'
import database from '../../appwrite/database'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || 'active',

        },
    })

    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)


    const submit = async (data) => {
        if (post) {

            const File = data.images[0] ? database.uploadFile(data.images[0]) : null

            if (File) {
                database.deleteFile(post.FeatureiMage)
            }

            const dbPost = await database.updatePost(post.$id, {
                ...data,
                FeatureiMage: File ? File.$id : undefined,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            const file = data.images[0] ? await database.uploadFile(data.images[0]) : null

            if (file) {
                const fileId = file.$id
                data.FeatureiMage = fileId
                const dpPost = await database.createPost({
                    ...data,
                    userId: user.$id,
                })
                if (dpPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransfom = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-z\d\s]+/g, '-')
                .replace(/\s/g, '-')

            // const slug = value.toLowerCase().replace(/ /g, '-')
            // setValue('slug', slug)
            // return slug
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransfom(value.title,
                    { shouldValidate: true, }
                ))
            }
        })


        return () => {
            subscription.unsubscribe()
        }
    }, [watch, setValue, slugTransfom])

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Input
                label='Title :'
                {...register('title', { required: true })}
                placeholder="Title"
            />
            <Input
                label='Slug :'
                {...register('slug', { required: true })}
                placeholder="Slug"
                onInput={(e) => {
                    setValue('slug', slugTransfom(e.currentTarget.value), {
                        shouldValidate: true
                    })
                }}
            />
            <TextEditor
                label='Content :'
                name='content'
                control={control}
                defaultValue={getValues('content')}
            />

            <Input
                label='Featured Image :'
                type='file'
                accept='image/png, image/jpeg, image/jpg, image/gif'
                {...register('images', { required: !post })}
            />

            {post && (
                <div className="flex flex-col items-center justify-center">
                    <img
                        src={database.getFilePreview(post.FeatureiMage)}
                        alt={post.title}
                        className="w-1/2"
                    />
                </div>
            )}

            <Select
                options={['active', 'inactive']}
                label='Status :'
                {...register('status', { required: true })}
            />

            <Button
                type='submit'
                bgColor={post ? 'bg-green-400' : undefined}
            >
                {post ? 'Update' : 'Submit'}
            </Button>

        </form>
    )
}

export default PostForm