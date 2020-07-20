export interface TestParameters {
    chutzpahPath: string;
    args: string[];
    testPath: string;
    newWindow?: boolean|false;
    tempFile?: string;
}