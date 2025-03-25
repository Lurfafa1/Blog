import React from 'react'
import database from '../appwrite/database'
import { Container, PostCard } from '../components'

const Allposts = () => {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        database.getAllPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                } else {
                    console.log('No posts found')
                }
            })
    }, [])



    return (
        <div className='py-10 w-full'>
            <Container>
                <div className='flex flex-wrap justify-center'>
                    {posts && posts.map((post) => (
                        <PostCard key={post.$id} post={post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Allposts