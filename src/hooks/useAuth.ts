import { authOptions } from "@/lib/authOptions";
import { getExpireTime } from "@/lib/token";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import moment from "moment";

export const useServerAuth = async (): Promise<{
  user: any;
  token: string | undefined;
  isAuthenticated: boolean;
  expireTime: string | undefined;
}> => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const token = session?.accessToken;
  const expireTime = token
    ? moment(getExpireTime(token as string)).format("DD-MM-YYYY HH:mm:ss")
    : undefined;

  return {
    user,
    token,
    isAuthenticated: !!session,
    expireTime,
  };
};

export const useAuth = (): {
  user: any;
  token: string | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  update: () => {};
} => {
  const { data: session, status, update } = useSession();
  const user = session?.user;
  const token = session?.accessToken;

  return {
    user,
    token,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    update,
  };
};
