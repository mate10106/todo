import ListCompletedTodoForm from "@/components/ListCompletedTodo";
import ListTodayTodo from "@/components/ListTodayTodo";

const TodayPage = () => {
  return (
    <section className="flex flex-col gap-6 mt-8 max-lg:mt-12 m-12">
      <div className="min-h-screen border rounded-lg">
        <div className="flex flex-col justify-between min-h-screen border m-7 rounded-lg">
          <div>
            <ListTodayTodo />
          </div>
          <div>
            <ListCompletedTodoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodayPage;
