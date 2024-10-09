import { Status } from "./status.entities";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

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
    }