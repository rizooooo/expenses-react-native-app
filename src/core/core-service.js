import { Q } from '@nozbe/watermelondb';
import { database } from './../../';

const CoreService = {
    FINDONE: async (tableName, id) => {
        const d = database.collections.get(tableName);
        const res = await d.query(Q.where('friend_id', id)).fetch();
        return res;
    },
    FIND: async (tableName) => {
        return await database.collections.get(tableName).query().fetch()
    },
    CREATE: async (tableName, data, options = null) => {
        const collection = database.collections.get(tableName);
        console.log('Create', data);
        return await database.action(async () => {
            const newData = await collection.create(post => {
                Object.keys(data).forEach(key => {
                    if (!options || options && options.relation !== key) {
                        post[key] = data[key];
                    }

                    if (options && options.relation === key) {
                        post[options.relation].set(data[key])
                    }
                })

                // if (options) {
                //     console.log('Inside', data[options.prop])
                //     post[options.parent][options.prop] = data[options.prop];
                // }
            })

            return newData;
        })
    },
    UPDATE: async (model, data) => {
        // const collection = database.collections.get(tableName);
        // console.log('UPDATE', data);
        return await database.action(async () => {
            const newData = await model.update(post => {
                Object.keys(data).forEach(key => {
                    post[key] = data[key];
                })
            })

            return newData;
        })
    }
}

export default CoreService;