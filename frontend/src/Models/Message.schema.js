import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
        name: 'messages',
        columns: [
            { name: 'sender', type: 'string' },
            { name: 'key', type: 'string' },
            { name: 'message', type: 'string' },
            { name: 'send_at', type: 'string' }
        ]
        }),
    ]
})