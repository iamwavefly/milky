import FilterPost from "@/components/filterPost";
import Products from "@/components/products";
import Onboarding from "@/layout/index";

export default function Index() {
  return (
    <Onboarding title="Home">
      {/* filter -> search, category */}
      <FilterPost />
      {/* products */}
      <Products mt="15px" mb="270px" />
    </Onboarding>
  );
}
