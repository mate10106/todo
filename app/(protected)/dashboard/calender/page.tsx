"use client";

import Calendar from "@/components/Calender";
import { Todo } from "@/types";
import React, { useState } from "react";

const page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  return <Calendar todos={todos} />;
};

export default page;
