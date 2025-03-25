import React from 'react'
import database from '../appwrite/database'
import { Container, PostCard } from '../components'

const Home = () => {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        database.getAllPosts()
            .then((response) => {
                if (response) {
                    setPosts(response.documents)
                }
            })
    }, [])

    if (posts.length === 0) {
        return (
            <Container>
                <p>Loading...</p>
            </Container>
        )

    }

    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    )


}



export default Home