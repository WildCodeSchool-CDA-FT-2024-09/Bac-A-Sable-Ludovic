//Import de reflect-metadata qui active les décorateurs TypeScript (essentiel pour type-graphql et typeorm)
import "reflect-metadata";
//Import de plusieurs décorateurs et classes de typeORM
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  ManyToMany,
} from "typeorm";
//Import de plusieurs décorateurs de class-validator pour valider certaines propriétés d'une classe de données
import { IsBoolean, IsString } from "class-validator";
//Import de la classe Status pour la relation ManyToOne
import { Status } from "../status/status.entities";
//Import de la classe Lang pour la relation ManyToMany
import { Lang } from "../langs/lang.entities";
//Import des décorateurs ObjectType, Field et ID de type-graphql pour définir des types GraphQL basés sur des classes TypeScript.
import { Field, ID, ObjectType } from "type-graphql";

//Définition de la classe Repo en utilisant TypeORM et TypeGraphQL avec des décorateurs pour intégrer la base de données et GraphQL.
//L'entité Repo a plusieurs champs: id, name, url, isFavorite, status et langs.
//Etablit des relations avec les entités Status (relation ManyToONe) et Lang (relation ManyToMany).
@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  @IsString()
  id: string;

  @Field()
  @Column()
  @IsString()
  name: string;

  @Field()
  @Column()
  @IsString()
  url: string;

  @Field()
  @Column({ default: () => false })
  @IsBoolean()
  isFavorite: boolean;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.id)
  status: Status;

  @Field(() => [Lang])
  @ManyToMany(() => Lang, (lang) => lang.repos)
  langs?: Lang[];
}

//Definir une classe LightRepo qui est une version simplifiée de la classe Repo
//avec les champs id, name, url et isFavorite.
@ObjectType()
export class LightRepo extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field()
  isFavorite: boolean;
}