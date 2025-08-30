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
    name: "Courses",
    to: "/dashboard/courses",
    iconActive: CourseIcon,
    iconInactive: "",
  },
  {
    id: 3,
    name: "Badges",
    to: "/dashboard/badges",
    iconActive: NotificationIcon,
    iconInactive: "",
  },
  {
    id: 4,
    name: "Notifications",
    to: "/dashboard/notifications",
    iconActive: NotificationIcon,
    iconInactive: "",
  },
  // Admin-only: rendered conditionally in Navigation component
  {
    id: 5,
    name: "Add Course",
    to: "/dashboard/add-course",
    iconActive: DashboardIcon,
    iconInactive: "",
    adminOnly: true,
  },
];

export default navLinks;
