import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import { deleteCourses } from "@/services/course";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export function DeleteCourse({ id }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(false);
    try {
      setLoading(true);
      const response = await deleteCourses(id);
      const result = response.data;
      console.log(result, response);
      showSuccessToast(result?.message || "Course deleted successfully");
      setOpen(false);
    } catch (error) {
      console.log(error);
      showErrorToast(
        error?.message ||
          "An error occurred while deleting the course. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-red-500 text-white">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete course</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h3 className="text-bold text-center text-lg">
            Are you sure you want to delete this course?
          </h3>
          <p className="text-sm text-center italic">
            Deleting this course will remove it permanently from the list of
            courses in the learning dashboard.
          </p>
        </div>
        <DialogFooter className="flex justify-between items-center w-full">
          <Button type="button" onClick={onSubmit}>
            Yes, continue
          </Button>
          <Button
            type="button"
            className="bg-red-400"
            onClick={() => setOpen(false)}
          >
            No, keep course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
