export interface NBEvent {
    event: string
}

export interface NBEventILoading extends NBEvent {
    isLoading: boolean
}

export const NBEventLoading = "_nb_event_loading";

export const NBEvents = {
    NBEventLoading
}