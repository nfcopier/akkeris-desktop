interface FullServerInfoState {
    isOffline: boolean;
    nickname: string;
    hostname: string;
    token: string;
}
module FullServerInfoState {
    export const OFFLINE: FullServerInfoState = {
        isOffline: true,
        nickname: null,
        hostname: null,
        token: null
    };
}

export default FullServerInfoState;
