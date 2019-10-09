
import * as fs from 'fs';

/**
 * @returns fs.Stats object with isDirectory set to true
 */
export function getFakeDirectory(): fs.Stats {
    return {
        isDirectory: () => true,
        isFile: () => false,
        isBlockDevice: () => false,
        isSymbolicLink: () => false,
        isCharacterDevice: () => false,
        isSocket: () => false,
        isFIFO: () => false,
        dev: 0,
        ino: 0,
        mode: 0,
        nlink: 0,
        uid: 0,
        gid: 0,
        rdev: 0,
        size: 0,
        blksize: 0,
        blocks: 0,
        atimeMs: 0,
        mtimeMs: 0,
        ctimeMs: 0,
        birthtimeMs: 0,
        atime: new Date(),
        mtime: new Date(),
        ctime: new Date(),
        birthtime: new Date()
    };
}