export default interface MSAlert {
    isDismissed: boolean,
    type: 'success' | 'warning' | 'info' | 'error' | 'critical'
    message?: string
}
