import path from 'path';

const fileName = __filename;
const dirName = path.dirname(fileName);

let relativeRootPath = process.env['RELATIVE_ROOT_PATH'] ?? '..';

export const ROOT_PATH = path.join(dirName, relativeRootPath);

export const STORAGE_PATH = path.join(ROOT_PATH, 'storage');

export const USER_JSON_PATH = path.join(STORAGE_PATH, 'user.json');
