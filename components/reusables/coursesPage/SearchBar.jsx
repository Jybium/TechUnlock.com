import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const SearchBar = ({ setData }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setData(data.searchQuery);
    reset();
  };

  return (
    <div className="max-w-xl lg:max-w-3xl w-full mx-auto my-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between gap-x-4 rounded border border-gray-900 w-5/6 lg:w-4/6 mx-auto p-1"
      >
        <Input
          type="text"
          placeholder="Search for courses..."
          {...register("searchQuery", { required: true })}
          className="flex-1 border-0 outline-0 rounded-l-md p-2 focus:ring-0"
        />
        <Button
          type="submit"
          className="bg-primary w-[20%] text-white rounded-r-md p-2"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
