import type { NextPage } from "next";
import { TextH2, LoadingSpinner } from "../components/presentational/atoms";
import { HelperPop } from "../components/presentational/molecules";

import { Form } from "../components/temp/Form";
import { RegisterUser } from "../components/temp/RegisterUser";
import { useUserQuery } from "../generated/graphql";

const Index: NextPage = () => {
  const { data, loading } = useUserQuery({
    variables: { id: "1" },
  });

  if (loading) {
    return <div>ロード中です</div>;
  }

  return (
    <div>
      <div>hello</div>
      <div>これは日本語です</div>
      <Form />
      {data ? (
        <div>
          <p>疎通確認！</p>
          <body>{data.user.email}</body>
        </div>
      ) : (
        <div>データがありません</div>
      )}
      <RegisterUser />
    </div>
  );
};
export default Index;
