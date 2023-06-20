type TypeMessage = "textMessage";

interface IncomingMessageReceived {
    typeWebhook: "incomingMessageReceived";
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
        chatId: string;
        sender: string;
        chatName: string;
        senderName: string;
    };
    messageData: {
        typeMessage: TypeMessage;
        textMessageData: {
            textMessage: string;
        };
    };
}

export interface ReceiveNotificationResponse {
    receiptId: number;
    body: IncomingMessageReceived;
}
