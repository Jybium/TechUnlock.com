const { Mail, MapPin, Phone } = require("lucide-react");

const methods = [
  {
    id: 1,
    title: "Chat to sales",
    description: "Speak to our friendly team.",
    action: "sales@untitledui.com",
    icon: <Mail color="#ffff" />,
  },
  {
    id: 2,
    title: "Visit us",
    description: "Visit our office HQ.",
    action: "Lagos, Nigeria",
    icon: <MapPin color="#ffff" />,
  },
  {
    id: 3,
    title: "Call us",
    description: "Speak to our friendly team.",
    action: "Mon-Fri from 8am to 5pm.",
    icon: <Phone color="#ffff" />,
  },
];



export default methods;