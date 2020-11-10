import { appSchema, tableSchema } from '@nozbe/watermelondb'
import { Tables } from '../table-list.core'

export default mySchema = appSchema({
    version: 7,
    tables: [
        tableSchema({
            name: Tables.FRIEND,
            columns: [
                { name: 'name', type: 'string' },
                { name: 'avatar', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: Tables.TRANSACTION,
            columns: [
                { name: 'title', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'paid', type: 'boolean' },
                { name: 'date_paid', type: 'number', isOptional: true },
                { name: 'friend_id', type: 'string', isIndexed: true },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
              
            ]
        })
    ]
})