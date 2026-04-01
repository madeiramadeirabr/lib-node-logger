export type LogMessageOptions = {
  global_event_name?: string;
  context?: Record<string, any> | Array<any>;
  trace_id?: string;
  span_id?: string;
  session_id?: string;
  [key: string]: any;
};
