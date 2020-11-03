import { Model } from '@nozbe/watermelondb'
import { field, date } from '@nozbe/watermelondb/decorators'


export default class Message extends Model {
    static table = 'messages'

    @field('sender') sender
    @field('key') key
    @field('message') message
    @date('send_at') sendAt
}