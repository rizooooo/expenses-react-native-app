import { Model } from '@nozbe/watermelondb'
import { field, date, action, readonly, relation } from '@nozbe/watermelondb/decorators'
import { Tables } from '../table-list.core';

export default class Transaction extends Model {
    static table = Tables.TRANSACTION;

    static associations = {
        friends: { type: 'belongs_to', key: 'friend_id' },
    }

    @field('title') title;
    @field('amount') amount;
    @field('paid') paid;
    @field('date_paid') date_paid;

    @relation(Tables.FRIEND, 'friend_id') friend

    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt

    async markAsPaid() {
        console.log('asdasd')
        return await this.update(t => t.paid = true);
    }

    async markAsUnpaid() {
        return await this.update(t => t.paid = false);
    }


}