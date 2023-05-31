export type LogMessage = {
    global_event_timestamp: string
    global_event_name?: string
    message: string
    context?: Record<string, any> | Array<any>
    trace_id?: string
    session_id?: string
    level: string
    service_name: string
}