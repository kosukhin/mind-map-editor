export interface LaunchParamsType {
    files: FileSystemFileHandle[];
}
export interface LaunchQueueType {
    setConsumer(launchParams: (params: LaunchParamsType) => void): void;
}
