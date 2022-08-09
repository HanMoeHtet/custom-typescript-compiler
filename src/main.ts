import './bootstrap';
import { importJson } from '@src/utils/import';
import { USER_JSON_PATH } from '@src/paths.config';

const main = async () => {
  const json = await importJson<{ name: number; role: string }>(USER_JSON_PATH);

  console.log(json);
};

main();
