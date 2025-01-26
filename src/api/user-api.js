import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/login`,
        { username, password }
      );
      return response.data;
    },
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async ({ username, password, name }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/regis`,
        { username, password, name }
      );
      return response.data;
    },
  });
};

export const getUserData = (token) => {
  return useQuery({
    queryKey: ["userProfile", token],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}user/get-user`,
        { headers: { Authorization: token } }
      );
      return response.data;
    },
  });
};
