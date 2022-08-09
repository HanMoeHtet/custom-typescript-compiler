import { importJson } from '@src/utils/import';
import { USER_JSON_PATH } from '@test/paths.config';

describe('Test import', () => {
  it('should import', async () => {
    const user = await importJson(USER_JSON_PATH);
    expect(user).toEqual({ name: 'test' });
  });
});
