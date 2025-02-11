import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const usePostListAdmin = (page) => {
  const response = useQuery({
    queryFn: async () => {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}admin/post-list?page=${page}`
      );
    },
    queryKey: ["post", page],
  });
  return response;
};

export const useLoginAdmin = () => {
  return useMutation({
    mutationFn: async ({ adminname, password }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}admin/login-admin`,
        {
          adminname,
          password,
        }
      );
      return response.data;
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ post_id, content, token }) => {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}admin/update-post`,
        {
          post_id,
          content,
        },
        { headers: { Authorization: token } }
      );

      return "update post success";
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ post_id, token }) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}admin/delete-post?post_id=${post_id}`,
        { headers: { Authorization: token } }
      );

      return "delete post success";
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
};

export const useUserList = (page, take) => {
  const response = useQuery({
    queryFn: async () => {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}admin/user-list?page=${page}${
          take ? `&take=${take}` : ""
        }`
      );
    },
    queryKey: ["user", page],
  });
  return response.data;
};

export const useUserChart = (start, end) => {
  const response = useQuery({
    queryFn: async () => {
      const query = `${process.env.NEXT_PUBLIC_API_URL}admin/user-chart${
        start ? `?start=${start}` : ""
      }${end ? `&end=${end}` : ""}`;
      return await axios.get(query);
    },
    queryKey: ["userChart", start, end],
  });
  return response;
};

export const useTagChart = (start, end) => {
  const response = useQuery({
    queryFn: async () => {
      const query = `${process.env.NEXT_PUBLIC_API_URL}admin/tag-chart${
        start ? `?start=${start}` : ""
      }${end ? `&end=${end}` : ""}`;
      return await axios.get(query);
    },
    queryKey: ["tagChart", start, end],
  });
  return response;
};

export const usePostChart = (start, end) => {
  const response = useQuery({
    queryFn: async () => {
      const query = `${process.env.NEXT_PUBLIC_API_URL}admin/post-chart${
        start ? `?start=${start}` : ""
      }${end ? `&end=${end}` : ""}`;
      return await axios.get(query);
    },
    queryKey: ["postChart", start, end],
  });
  return response;
};

export const useDashboardStat = (start, end) => {
  const response = useQuery({
    queryFn: async () => {
      const query = `${process.env.NEXT_PUBLIC_API_URL}admin/stat${
        start ? `?start=${start}` : ""
      }${end ? `&end=${end}` : ""}`;
      return await axios.get(query);
    },
    queryKey: ["dashbordStat", start, end],
  });
  return response;
};
