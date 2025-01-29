import { redirect } from "next/navigation";
import paths from "@/lib/paths";

const NotFound = () => {
  redirect(paths.ERRORS.NOT_FOUND);
};

export default NotFound;
