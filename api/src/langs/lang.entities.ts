import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Repo } from "../repos/repo.entities";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Lang extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [Repo])
  @ManyToMany(() => Repo, (repo) => repo.langs)
  @JoinTable()
  repos?: Repo[];
}
