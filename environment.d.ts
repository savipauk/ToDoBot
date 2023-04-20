declare global {
    namespace NodeJS {
        interface ProcessEnv {
            token: string;
            guildId: string;
            clientId: string;
            environment: "dev" | "prod" | "debug";
        }
    }
}

export { };