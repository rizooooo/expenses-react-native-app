import { useDatabase } from '@nozbe/watermelondb/hooks'
import withObservables from '@nozbe/with-observables';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { database } from '../../..';
import CoreService from '../../core/core-service';
import { Tables } from '../../core/table-list.core';
import { PostItem } from './components';


const Home = ({ posts }) => {

    const onPress = async () => {
        const data = await CoreService.CREATE(Tables.POST, { title: 'Angel Dizon', body: 'Angel Body' });
        console.log(data);
    }
    console.log(posts, '@POSTTTT')
    return (
        <View style={styles.container}>
            <Text>POSTs app</Text>
            <Button title={'Add'} onPress={onPress} />
            {posts && posts.map(p => <PostItem post={p} />)}
        </View>
    )
}

const enhance = withObservables([], () => ({
    posts: database.collections.get('posts').query().observe(),
}))


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        //  backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
    }
})

export default enhance(Home)
