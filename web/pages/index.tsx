import Navbar from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

function Index() {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
      {data ? (
        data?.posts.map((post) => <div key={post.id}>{post.title}</div>)
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
