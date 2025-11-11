export function getEnv() {
    return {
        AD_SERVER_URL: import.meta.env.VITE_AD_SERVER_URL || 'https://adx402-api.ateliertech.xyz',
    };
}