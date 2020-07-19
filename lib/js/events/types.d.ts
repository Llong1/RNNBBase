export interface NBEvent {
    event: string;
}
export interface NBEventILoading extends NBEvent {
    isLoading: boolean;
}
export declare const NBEventLoading = "_nb_event_loading";
export declare const NBEvents: {
    NBEventLoading: string;
};
