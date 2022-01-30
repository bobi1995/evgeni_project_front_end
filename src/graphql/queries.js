import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      name
      email
      isAdmin
      projects {
        _id
        name
        power
        status
      }
      userCost {
        _id
        salary
        car
        others
      }
      results {
        _id
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($projectId: String!) {
    getProject(projectId: $projectId) {
      _id
      name
      power
      owner {
        _id
        name
      }
      location
      offer
      schedule
      simulation
      contractAssigner
      contractSubcontractor
      contractSum
      pictures
      budget {
        _id
      }
      startDate
      targetDate
      endDate
      status
      totalProfit
      type
    }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      tokenExpiration
      token
    }
  }
`;
