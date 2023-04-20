declare global {
    namespace NodeJS {
        interface ProcessEnv {
            token: string;
            guildId: string;
            environment: "dev" | "prod" | "debug";
        }
    }
}

export { };