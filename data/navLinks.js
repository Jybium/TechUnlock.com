import {
  DashboardIcon,
  NotificationIcon,
  CourseIcon,
  CompletedIcon,
  EnrollIcon,
} from "@/components/svgs";

const navLinks = [
  {
    id: 1,
    name: "Dashboard",
    to: "/dashboard",
    iconActive: DashboardIcon,
    iconInactive: "",
  },
  {
    id: 2,
    name: "My Courses",
    to: "/dashboard/my-courses",
    iconActive: CourseIcon,
    iconInactive: "",
    chid: true,
    children: [
      {
        id: 1,
        name: "Completed",
        to: "/dashboard/my-courses/completed",
        iconActive: CompletedIcon,
        iconInactive: "",
      },
      {
        id: 2,
        name: "Enrolled",
        to: "/dashboard/my-courses/enrolled",
        iconActive: EnrollIcon,
        iconInactive: "",
      },

      {
        id: 3,
        name: "All Courses",
        to: "/dashboard/my-courses/all-courses",
        iconActive: EnrollIcon,
        iconInactive: "",
      },
      //   {
      //     id: 4,
      //     name: "Upcoming",
      //     to: "/dashboard/my-courses/upcoming",
      //     iconActive: EnrollIcon,
      //     iconInactive: "",
      //   },
      //   {
      //     id: 5,
      //     name: "In Progress",
      //     to: "/dashboard/my-courses/in-progress",
      //     iconActive: EnrollIcon,
      //     iconInactive: "",
      //   },
    ],
  },
  // {
  //   id: 3,
  //   name: "Notifications",
  //   to: "/dashboard/notifications",
  //   iconActive: NotificationIcon,
  //   iconInactive: "",
  // },
  {
    id: 3,
    name: "Add course",
    to: "/dashboard/add-course",
    iconActive: NotificationIcon,
    iconInactive: "",
  },
  {
    id: 4,
    name: "All courses",
    to: "/dashboard/courses",
    iconActive: NotificationIcon,
    iconInactive: "",
  },
  {
    id: 5,
    name: "Delete User",
    to: "/dashboard/user-delete",
    iconActive: NotificationIcon,
    iconInactive: "",
  },
  {
    id: 6,
    name: "Make admin",
    to: "/dashboard/make-admin",
    iconActive: NotificationIcon,
    iconInactive: "",
  },
];

export default navLinks;
