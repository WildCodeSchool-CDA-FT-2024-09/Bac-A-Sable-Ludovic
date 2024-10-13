import { Status } from "./status.entities";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Int,
} from "type-graphql";

@InputType()
class StatusInput implements Partial<Status> {
  @Field()
  id: number;

  @Field()
  label: string;
}

@Resolver(Status)
export default class StatusResolver {
  // Methode GET pour tous les repos
  @Query(() => [Status])
  async fullstatus() {
    const status = await Status.find({
      relations: {
        repos: true,
      },
    });
    console.info(status);
    return status;
  }

  @Mutation(() => Status)
  async createNewStatus(@Arg("data") newStatus: StatusInput) {
    const status = new Status();
    status.id = newStatus.id;
    status.label = newStatus.label;

    await status.save();
    console.log("status", status);

    const myStatus = await Status.findOneOrFail({
      where: { id: newStatus.id },
      relations: {
        repos: true,
      },
    });
    console.log("myStatus", myStatus);
    return status;
  }

  @Mutation(() => Status)
  async updateStatus(
    @Arg("id", () => Int) id: number,
    @Arg("data") updatedStatus: StatusInput
  ) {
    console.log("ID reçu pour la mise à jour :", id);
    const status = await Status.findOne({ where: { id } });
    if (!status) {
      console.error(`Status avec ID ${id} non trouvé`);

      throw new Error("Status non trouvé");
    }

    status.label = updatedStatus.label;
    await status.save();
    console.log(`Status ${status.label} mis à jour`);
    return status;
  }

  @Mutation(() => Status)
  async deleteStatus(@Arg("id", () => Int) id: number) {
    console.log("ID reçu pour suppression:", id);
    const status = await Status.findOne({ where: { id } });
    if (!status) {
      console.error(`Status avec ID ${id} non trouvée`);

      throw new Error("Status non trouvée");
    }

    await status.remove();
    return status;
  }
}
