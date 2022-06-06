interface ServerLabelState {
    isOffline: boolean;
    nickname: string;
}

module ServerLabelState {
    export const OFFLINE: ServerLabelState = {
        isOffline: true,
        nickname: null
    };
}

export default ServerLabelState;
