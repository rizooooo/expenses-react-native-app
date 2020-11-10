import withObservables from '@nozbe/with-observables'
import React from 'react'
import { Text } from 'react-native'

const PostItem = ({ post }) => {
    //console.log(post.addComment(), '@POST ITEM')
    
    return (
        <Text>
            {post.title}
        </Text>
    )
}

const enhance = withObservables(['post'], ({ post }) => ({
    post: post.observe() // shortcut syntax for `comment: comment.observe()`
}))


export default enhance(PostItem)
