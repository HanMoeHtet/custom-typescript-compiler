import path from 'path';

const fileName = __filename;
const dirName = path.dirname(fileName);

export const ROOT_PATH = path.join(dirName, '..');

export const TEST_PATH = path.join(ROOT_PATH, 'test');

export const DATA_PATH = path.join(TEST_PATH, 'data');

export const USER_JSON_PATH = path.join(DATA_PATH, 'user.json');
