import { InstantMessage } from "../../mqtt-part";

export type NBCompInstantMsgContentRender = (msg: InstantMessage, index: number) => React.ReactElement | null;