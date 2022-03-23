import {
  ApolloClient,
  InMemoryCache,
  Reference,
  StoreObject,
} from "@apollo/client";
// import { splitApolloLink } from "./createApolloLink";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  ssrMode: typeof window === "undefined",
  // link: splitApolloLink,
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      // Inquiry: {
      //   fields: {
      //     inquiryStatus: {
      //       merge(existing = [], incoming: any[]) {
      //         return [...existing, ...incoming];
      //       },
      //       read: (existing) => {
      //         return existing;
      //       },
      //     },
      //   },
      // },
      User: {
        merge: true,
      },
      Query: {
        fields: {
          getInquiriesWithStatus: {
            // merge(existing, incoming, { readField }) {
            //   const inquiries: Array<any> = existing ? { ...existing.inquiries } : {};
            //   incoming.inquiries.forEach((inquiry: Reference | StoreObject) => {
            //     inquiries.push(inquiry);
            //   });
            //   return {
            //     pageInfo: incoming.pageInfo,
            //     inquiries,
            //   };
            // },
            // read(existing) {
            //   if (existing) {
            //     return {
            //       pageInfo: existing.pageInfo,
            //       inquiries: Object.values(existing.inquiries),
            //     };
            //   }
            // },
          },
          // getInquiriesByOrgId:{
          //   merge()
          // }
        },
      },
    },
  }),
});
