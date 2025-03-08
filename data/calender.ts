import { useState } from "react";

export const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const previousMonth = (
  currentDate: Date,
  setCurrentDate: (date: Date) => void
) => {
  setCurrentDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
  );
};

export const nextMonth = (
  currentDate: Date,
  setCurrentDate: (date: Date) => void
) => {
  setCurrentDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
  );
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
