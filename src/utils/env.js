export function getEnv() {
    return {
        AD_SERVER_URL: import.meta.env.VITE_AD_SERVER_URL || 'http://localhost:3000',
    };
}