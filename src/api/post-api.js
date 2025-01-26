import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, content, tags, token }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}post/create`,
        { title, content, tags },
        { headers: { Authorization: token } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
};

export const useLikeUnlikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ post_id, token }) => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}post/like-post?postid=${post_id}`,
        { headers: { Authorization: token } }
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ content, post_id, token }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}post/create-comment`,
        { content, post_id },
        { headers: { Authorization: token } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });
};

export const usePostList = (tags) => {
  const response = useQuery({
    queryFn: async () => {
      const filterTags = tags.join(",");
      return await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}post${
          tags.length ? `?tags=${filterTags}` : ""
        }`
      );
    },
    queryKey: ["post", tags],
  });
  return response;
};
