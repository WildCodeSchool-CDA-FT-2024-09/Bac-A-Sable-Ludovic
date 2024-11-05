import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repo.entities";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";

dotenv.config();
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

// const { BACKEND_FILE } = process.env;

// export const dataSource = new DataSource({
//   type: "sqlite",
//   database: `${BACKEND_FILE}`,
//   entities: [Repo, Status, Lang],
//   synchronize: true,
// });

export const dataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [Repo, Status, Lang],
  synchronize: true,
});

console.log("DB Config:", {
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  database: POSTGRES_DB,
});

