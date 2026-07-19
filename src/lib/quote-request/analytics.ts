export const QUOTE_EVENTS={started:"quote_request_started",stepCompleted:"quote_request_step_completed",draftSaved:"quote_request_draft_saved",reviewed:"quote_request_reviewed",submitted:"quote_request_submitted",failed:"quote_request_failed",cancelled:"quote_request_cancelled"} as const;
type QuoteEvent=typeof QUOTE_EVENTS[keyof typeof QUOTE_EVENTS];type SafeProperties=Record<string,string|number|boolean>;
declare global{interface Window{renoqoQuoteAnalytics?:(event:QuoteEvent,properties?:SafeProperties)=>void;}}
export function trackQuote(event:QuoteEvent,properties?:SafeProperties){if(typeof window==="undefined")return;try{window.renoqoQuoteAnalytics?.(event,properties);}catch{}}
