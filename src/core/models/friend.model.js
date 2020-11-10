import { Model } from '@nozbe/watermelondb'
import { field, date, relation, readonly, children } from '@nozbe/watermelondb/decorators'
import { Tables } from '../table-list.core';

export default class Friend extends Model {
    static table = Tables.FRIEND;
    static associations = {
        transactions: { type: 'has_many', foreignKey: 'friend_id' },
    }

    @field('name') name
    @field('avatar') avatar

    @children('transactions') transactions

    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt

    

}