import {
  Grid,
  BookOpen,
  GraduationCap,
  FileText,
  CreditCard,
  Bell,
  Users,
  Settings,
} from "lucide-react";

const adminNavLinks = [
  {
    id: 1,
    name: "Dashboard",
    to: "/admin",
    iconActive: Grid,
    iconInactive: Grid,
  },
  {
    id: 2,
    name: "Courses",
    to: "/admin/courses",
    iconActive: BookOpen,
    iconInactive: BookOpen,
  },
  {
    id: 3,
    name: "Learners",
    to: "/admin/learners",
    iconActive: GraduationCap,
    iconInactive: GraduationCap,
  },
  {
    id: 4,
    name: "Feedback",
    to: "/admin/feedback",
    iconActive: FileText,
    iconInactive: FileText,
  },
  {
    id: 5,
    name: "Payment",
    to: "/admin/payment",
    iconActive: CreditCard,
    iconInactive: CreditCard,
  },
  {
    id: 6,
    name: "Notification",
    to: "/admin/notifications",
    iconActive: Bell,
    iconInactive: Bell,
  },
  {
    id: 7,
    name: "Admin",
    to: "/admin/users",
    iconActive: Users,
    iconInactive: Users,
  },
  {
    id: 8,
    name: "Settings",
    to: "/admin/settings",
    iconActive: Settings,
    iconInactive: Settings,
  },
];

export default adminNavLinks;
