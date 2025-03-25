import React from 'react'
import { Container, PostForm } from '../components'
import database from '../appwrite/database'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const [post, setPost] = React.useState([])
    const { slug } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (slug) {
            database.getOnePost(slug)
                .then((res) => {
                    if (res) {
                        setPost(res)
                    }
                })
        } else {
            navigate('/')
        }

    }, [slug, navigate])


    return post ? (
        <Container>
            <PostForm post={post} />
        </Container>
    ) : null
}

export default EditPost