import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewTaskToTaskBoard: Scalars['Boolean'];
  registerUser: User;
  removeTaskFromTaskBoard: Scalars['Boolean'];
  updateTaskAssignee: Scalars['Boolean'];
  updateTaskDescription: Scalars['Boolean'];
  updateTaskStatus: Scalars['Boolean'];
  updateTaskTitle: Scalars['Boolean'];
};


export type MutationAddNewTaskToTaskBoardArgs = {
  assigneeId: Scalars['String'];
  description: Scalars['String'];
  status: Scalars['String'];
  taskBoardId: Scalars['String'];
  taskId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationRemoveTaskFromTaskBoardArgs = {
  taskBoardId?: InputMaybe<Scalars['String']>;
  taskId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTaskAssigneeArgs = {
  assigneeId?: InputMaybe<Scalars['String']>;
  taskId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTaskDescriptionArgs = {
  description?: InputMaybe<Scalars['String']>;
  taskId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTaskStatusArgs = {
  status?: InputMaybe<Scalars['String']>;
  taskId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTaskTitleArgs = {
  taskId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  age?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  taskBoard?: Maybe<TaskBoard>;
  user: User;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryTaskBoardArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  assigneeId?: Maybe<Scalars['String']>;
  descriptions?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  taskBoardId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type TaskBoard = {
  __typename?: 'TaskBoard';
  id: Scalars['ID'];
  tasks?: Maybe<Array<Maybe<Task>>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  profile?: Maybe<Profile>;
  userName: Scalars['String'];
};

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', age?: number | null, name?: string | null } | null } };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: string, email: string, userName: string } };


export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    email
    profile {
      age
      name
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $userName: String!) {
  registerUser(email: $email, password: $password, userName: $userName) {
    id
    email
    userName
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      userName: // value for 'userName'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;