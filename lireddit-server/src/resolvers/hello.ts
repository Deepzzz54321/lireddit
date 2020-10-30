import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolveer {
  @Query(() => String)
  hello() {
    return "Hello from resolver";
  }
}
