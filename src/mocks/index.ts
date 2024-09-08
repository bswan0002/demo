import { setupWorker } from "msw/browser";
import { linksHandlers } from "./mockLinksApi";

export const worker = setupWorker(...linksHandlers);
