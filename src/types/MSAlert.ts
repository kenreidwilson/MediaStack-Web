export default interface MSAlert {
    isDismissed: boolean,
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light',
    message?: string
}