import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

@InputType()
class UserCreateInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class HelloResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UserCreateInput,
    @Ctx() { em }: MyContext
  ) {
    const user = em.create(User, {
      username: options.username,
      email: options.email,
    });
    await em.persistAndFlush(user);

    return user;
  }
}
