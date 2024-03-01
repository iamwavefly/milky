import Filter from "@/components/filter";
import Products from "@/components/products";
import Onboarding from "@/layout/index";

export default function Index() {
  return (
    <Onboarding title="Home">
      {/* filter -> search, category */}
      <Filter />
      {/* products */}
      <Products mt="15px" mb="270px" />
    </Onboarding>
  );
}
