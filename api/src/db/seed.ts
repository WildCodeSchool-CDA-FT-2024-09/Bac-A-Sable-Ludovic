import { dataSource } from "./client";

import { Lang } from "../langs/lang.entities";
import langs from "../../data/langs.json";

import { Status } from "../status/status.entities";
import status from "../../data/status.json";

// import { Repos } from "../repos/repo.entities";
// import repos from "../../data/repos.json";

(async () => {
  console.log("coucou");
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  console.log("Hello");

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM lang_repos_repo");
    await queryRunner.query("DELETE FROM lang");
    await queryRunner.query("DELETE FROM repo");
    await queryRunner.query("DELETE FROM status");

    await queryRunner.query(
      'DELETE FROM sqlite_sequence WHERE name="status" OR name ="lang"'
    );

    const savedLangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new Lang();
        lang.label = el.label;

        return await lang.save();
      })
    );
    console.log(savedLangs);

    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const status = new Status();
        status.label = el.label;

        return await status.save();
      })
    );

    console.log(savedStatus);

    // const savedRepos = await Promise.all(
    //   repos.map(async (el) => {
    //     const repo = new Repos();
    //   })
    // );

    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
  }
})();
