import React from "react";
import TabsComponent from "@/components/reusables/faqs/Tab";

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What courses do you offer?",
        answer:
          "We offer courses in cyber security, Applied Artificial Intelligence, Digital Marketing, UI/UX Design, and Web Development.",
      },
      {
        question: "How do I enroll in a course?",
        answer:
          "You can enroll by visiting our website, selecting the course you’re interested in, and following the enrollment instructions.",
      },
      {
        question: "Are your courses suitable for beginners?",
        answer:
          "Yes, we have courses designed for beginners as well as intermediate and advanced learners. Each course description indicates the recommended skill level.",
      },
      {
        question: "What if I need help during the course?",
        answer:
          "Our tutors and support team are available to assist you with any questions or difficulties you may encounter. We also have online forums and community groups.",
      },
      {
        question:
          "Do I need any special software or equipment to take your courses?",
        answer:
          "Most courses only require a computer and internet access. Specific courses may have additional requirements, which will be listed in the course description.",
      },
      {
        question: "How can I access course materials?",
        answer:
          "We provide links to recorded classes after each session for catch-up in case you may miss any of the sessions. Course materials are not distributed or sent directly to trainees.",
      },
      {
        question: "Are there any prerequisites for enrolling in a course?",
        answer:
          "Some courses have prerequisites. The beginner courses are required to be able to understand the intermediate and advanced courses. Generally, basic computer skills are sufficient for beginner courses.",
      },
      {
        question: "Can I interact with other students?",
        answer:
          "Yes, we encourage interaction through online discussion forums, group projects, and live sessions, where you can connect with fellow students.",
      },
    ],
  },
  {
    category: "Certifications",
    questions: [
      {
        question: "Do you offer any certification upon course completion?",
        answer:
          "Yes, we provide certificates of completion for all our courses.",
      },
    ],
  },
  {
    category: "Price and Payment",
    questions: [
      {
        question: "Are the courses free or paid?",
        answer:
          "The courses are paid courses. However, we offer full scholarships occasionally, and if you are qualified for the scholarship, you can receive the training free of charge.",
      },
      {
        question: "What are the payment options?",
        answer:
          "We accept various payment methods, including Paystack and direct bank transfers. Payment plans may also be available for certain courses.",
      },
      {
        question: "Can I get a refund if I’m not satisfied with a course?",
        answer:
          "Yes, we have a refund policy that allows you to request a refund within 48 hours of payment if you are not satisfied with the course.",
      },
    ],
  },
  {
    category: "Classes and Program",
    questions: [
      {
        question: "What is the duration of your courses?",
        answer:
          "Course durations vary, ranging from 4 weeks to 6 months. Each course page provides detailed information on the length and time commitment.",
      },
      {
        question: "Can I take more than one course at a time?",
        answer:
          "Yes, you can enroll in multiple courses simultaneously, but we recommend considering your time availability to ensure you can manage the workload.",
      },
      {
        question: "Do you offer any job placement assistance?",
        answer:
          "Yes, we provide job placement assistance, including resume building, interview preparation, and job search support.",
      },
      {
        question: "Are the courses self-paced or instructor-led?",
        answer:
          "Our courses are tutor-led courses and require physical attendance or virtual attendance. Self-paced learning feature will be launched soon.",
      },
    ],
    category: "Accounts and Miscellaneous",
    questions: [
      {
        question: "How do I access my account?",
        answer:
          "You can access your account by logging in with your email address and password. If you have forgotten your password, you can reset it through our password reset feature.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, you have the right to deletion of your account and erasure of your personal data. Simply write ua an email to admin@techunlock.org make this request.",
      },
    ],
  },
];

const Faqs = () => {
  return (
    <div className="p-4 w-[95%] md:w-5/6 mx-auto space-y-4">
      <div className="text-center my-10 space-y-3">
        <h1 className="text-4xl font-bold mb-4 text-pri10">
          Frequently asked questions
        </h1>
        <p className="text-sec10 md:w-3/6 mx-auto">
          These FAQs are carefully curated to help provide you with the
          information you need to make an informed decision about enrolling in
          our Technology Training Academy.
        </p>
      </div>
      <TabsComponent data={faqs} />
    </div>
  );
};

export default Faqs;
