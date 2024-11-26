import Hero from "@/components/Hero";
import LatestTodo from "@/components/LatestTodo";

const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-[1100px] mx-auto">
        <Hero />
        <LatestTodo />
      </main>
    </div>
  );
};

export default page;
