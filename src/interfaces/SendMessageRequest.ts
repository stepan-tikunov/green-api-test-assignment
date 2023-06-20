export interface SendMessageRequest {
    chatId: string;
    message: string;
    quotedMessageId?: string;
    archiveChat?: boolean;
    linkPreview?: boolean;
}
