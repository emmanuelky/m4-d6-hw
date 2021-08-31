import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = () => {

    state = {
        comments: [], // comments will go here
        isLoading: false,
        isError: false
    }

    componentDidUpdate = async (prevProps) => {
        if (prevProps.asin !== this.props.asin) {
            this.setState({
                isLoading: true
            })
            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + this.props.asin, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFlNGYyYTA2MTBjYjAwMTVkYTJhOGYiLCJpYXQiOjE2MzA0MTg1MjUsImV4cCI6MTYzMTYyODEyNX0.53SBli2whBiUhEzsRAJ_3e7jzeI4kg_Zl7xWCaxnrSc'
                    }
                })
                console.log(response)
                if (response.ok) {
                    let comments = await response.json()
                    this.setState({ comments: comments, isLoading: false, isError: false })
                } else {
                    console.log('error')
                    this.setState({ isLoading: false, isError: true })
                }
            } catch (error) {
                console.log(error)
                this.setState({ isLoading: false, isError: true })
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading && <Loading />}
                {this.state.isError && <Error />}
                <AddComment asin={asin} />
                <CommentList commentsToShow={this.state.comments} />
            </div>
        )
    }
}

export default CommentArea