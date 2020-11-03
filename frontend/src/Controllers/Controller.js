import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import MessageModel from '../Models/Message.model';
import MessageSchema from '../Models/Message.schema'

const adapter = new LokiJSAdapter({
    dbName: 'ChatApp',
    schema: MessageSchema,
})

const db = new Database({
    adapter,
    modelClasses: [MessageModel],
    actionsEnabled: true,
});

const messagesCollection = db.collection.get('messages');

export default {
    addNewMessage: (data) => {
        return db.collections.get('messages').prepareCreate( msg => {
            msg.sender = data.sender;
            msg.key = data.key;
            msg.message = data.message;
            msg.sendAt = data.date;
        })
    },

    fetchOldMessagesFromLocal: async () => {
        return await messagesCollection.query().fetch()
    }
}