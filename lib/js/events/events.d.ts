import { EmitterSubscription } from "react-native";
declare type NBEventNames = "_nb_event_loading" | "_nb_event_loginsuccess";
export declare const addNBEventListener: (event: NBEventNames, func: (data: any) => void) => EmitterSubscription;
export {};
