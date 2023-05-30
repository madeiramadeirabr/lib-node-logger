export type LogMessage = {
    global_event_timestamp: string
    global_event_name?: string
    message: string
    context?: any
    trace_id?: string
    session_id?: string
    level: string
    service_name: string
}