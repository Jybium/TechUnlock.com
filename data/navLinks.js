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
];

export default navLinks;
