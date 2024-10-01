import "reflect-metadata";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Repo } from "../repos/repo.entities";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

//   @OneToMany(() => Repo, repo => repo.lang)
//   repos?: Repo[]
}
