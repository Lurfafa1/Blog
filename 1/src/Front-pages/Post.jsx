import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { useParams, Link, useNavigate, data } from 'react-router-dom'
import database from '../appwrite/database'
import { useState, useEffect } from 'react'
import { Button, Container } from '../components'


const Post = () => {
    const [post, setPost] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userid === userData.$id : false;



    useEffect(() => {
        if (id) {
            database.getPost(id)
                .then((res) => {
                    if (res) setPost(res)
                    else navigate('/')
                })
        } else {
            navigate('/')
        }
    }, [id, navigate])


    const deletePost = () => {
        database.deltePost(post.id)
            .then((status) => {
                if (status) {
                    database.deleteFile(post.FeatureiMage)
                    navigate('/')
                }
            })
    }


    return post ? (
        <Container>
            <img
                src={database.getFilePreview(post.FeatureiMage)}
                alt={post.title}
                className="w-full h-96 object-cover"
            />

            {isAuthor && (
                <div>
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button>Edit</Button>
                    </Link>
                    <Button onClick={deletePost}>Delete</Button>
                </div>
            )}

            <h1 className="text-3xl font-semibold mt-4">{post.title}</h1>
            <div className="mt-4">{parse(post.content)}</div>
        </Container>

    ) : null
}

export default Post
