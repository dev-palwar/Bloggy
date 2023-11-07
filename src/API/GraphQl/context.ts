import { getUser } from "@/lib/user";

export const context = () => {
  const token = getUser();
  return {
    context: {
      headers: {
        Authorization: token,
      },
    },
  };
};
