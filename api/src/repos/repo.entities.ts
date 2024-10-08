import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Min, Max, IsString, IsBoolean } from "class-validator";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  url: string;

  @Column({ default: () => false })
  @IsBoolean()
  isFavorite: boolean;

  @ManyToOne(() => Status, (status) => status.id)
  @Min(1)
  @Max(2)
  status: Status;

  @ManyToMany(() => Lang, (lang) => lang.repos)
  langs?: Lang[];
}
