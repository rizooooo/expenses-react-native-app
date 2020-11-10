/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './src/core/models/schema';
import { Friend } from './src/core/models';
import Transaction from './src/core/models/transaction.model';


const adapter = new SQLiteAdapter({
    schema,
    // dbName: 'myapp', // optional database name or file system path
    // migrations, // optional migrations
    synchronous: true, // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
    // experimentalUseJSI: true, // experimental JSI mode, use only if you're brave
})


export const database = new Database({
    adapter,
    modelClasses: [
        Friend,
        Transaction
    ],
    actionsEnabled: true
})

AppRegistry.registerComponent(appName, () => App);
