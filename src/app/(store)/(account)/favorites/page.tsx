import { Metadata } from "next";
import FavoritesPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Favorites",
};

const FavoritesPage = () => {
  return <FavoritesPageClient />;
};

export default FavoritesPage;
