import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

const SearchBar = ({ setData }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setData(data.searchQuery);
    reset();
  };

  return (
    <div className="max-w-xl lg:max-w-3xl w-full my-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between gap-x-4 rounded bg-white w-5/6 lg:w-4/6 ml-auto py-1 px-4"
      >
        <Input
          type="text"
          placeholder="Search"
          {...register("searchQuery", { required: true })}
          className="flex-1 border-none outline-0 rounded-l-md focus:ring-0"
        />
        <Search size={18} />
      </form>
    </div>
  );
};

export default SearchBar;
