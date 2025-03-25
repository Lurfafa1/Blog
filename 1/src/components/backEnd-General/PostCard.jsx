import React from 'react'
import database from '../../appwrite/database'
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, FeatureiMage}) => {

  
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full'>
            <div>
                <img src={database.getFilePreview(FeatureiMage)} alt={title} />
            </div>
            <h2>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard