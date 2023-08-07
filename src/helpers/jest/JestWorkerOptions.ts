const JestWorkerOptions = () => {
    if (process.env.JEST_WORKER_ID) {
        return {
            endpoint: 'http://localhost:8000',
            region: 'local-env',
            sslEnabled: false,
        };
    }
    else
        return {};
}

export const options = JestWorkerOptions();
