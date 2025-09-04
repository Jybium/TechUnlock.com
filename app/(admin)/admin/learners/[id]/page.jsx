"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import { getAllLearners, updateLearner, deleteLearner } from "@/services/admin";

const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-12 py-2 text-sm">
    <div className="col-span-3 text-gray-500">{label}:</div>
    <div className="col-span-9 text-gray-900 break-words">{value || "—"}</div>
  </div>
);

const StatusPill = ({ status = "inactive" }) => {
  const isActive = String(status).toLowerCase() === "active";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
      }`}
    >
      {isActive ? "active" : "inactive"}
    </span>
  );
};

const ProgressBar = ({ value = 0, max = 5 }) => {
  const pct = Math.min(100, Math.round(((value || 0) / (max || 1)) * 100));
  return (
    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-[#268FB6]" style={{ width: `${pct}%` }} />
    </div>
  );
};

const CourseCard = ({ course }) => {
  const modules = course?.modules || [];
  const isCompleted = Boolean(course?.is_completed);
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-800">
          {course?.title || "Course"}
        </h3>
        <span
          className={`text-[10px] px-2 py-1 rounded-full ${
            isCompleted
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {/* {isCompleted ? "Course Completed" : "Course Incomplete"} */}
        </span>
      </div>

      <div className="px-4 py-2 border-t">
        <div className="grid grid-cols-12 text-[11px] text-gray-500 py-2">
          <div className="col-span-3">Module</div>
          <div className="col-span-5">Module title</div>
          <div className="col-span-2 text-center">No of Videos</div>
          <div className="col-span-2 text-center">Quiz Score</div>
        </div>
        <div className="divide-y">
          {modules.length === 0 && (
            <div className="py-6 text-center text-sm text-gray-500">
              No modules available
            </div>
          )}
          {modules.map((m, idx) => (
            <div
              key={m?.id || idx}
              className="grid grid-cols-12 items-center py-2 text-[12px]"
            >
              <div className="col-span-3 text-gray-600">
                Module {m?.order || idx + 1}
              </div>
              <div
                className="col-span-5 text-gray-900 truncate"
                title={m?.title}
              >
                {m?.title || "—"}
              </div>
              <div className="col-span-2 text-center text-gray-700">
                {m?.videos_count ?? m?.videos?.length ?? 0}
              </div>
              <div className="col-span-2 text-center text-gray-700">
                {m?.quiz_score ?? 0}/{m?.quiz_total ?? 5}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LearnerDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [learner, setLearner] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const allLearners = await getAllLearners();
        const foundLearner = allLearners.find(
          (learner) => learner.id === parseInt(id) || learner.id === id
        );

        if (foundLearner) {
          setLearner(foundLearner);
        } else {
          showErrorToast("Learner not found");
        }
      } catch (err) {
        console.error(err);
        showErrorToast("Failed to load learner details");
      } finally {
        setLoading(false);
      }
    };
    if (id) run();
  }, [id]);

  const fullName = useMemo(() => {
    const first = learner?.first_name || learner?.firstName || "";
    const last = learner?.last_name || learner?.lastName || "";
    return `${first} ${last}`.trim() || "Learner";
  }, [learner]);

  const lastActive = useMemo(() => {
    const ts = learner?.last_active || learner?.lastActive;
    if (!ts) return null;
    try {
      return new Date(ts).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return null;
    }
  }, [learner]);

  const enrolledCourses = useMemo(() => {
    return learner?.enrolled_courses || learner?.courses || [];
  }, [learner]);

  // console.log(learner.enrolled_courses)

  const handleDeleteLearner = async () => {
    if (!id) return;
    const ok = window.confirm("Delete learner? This cannot be undone.");
    if (!ok) return;
    try {
      setSaving(true);
      await deleteLearner(id);
      showSuccessToast("Learner deleted");
      router.push("/admin/admin");
    } catch (err) {
      console.error(err);
      showErrorToast("Failed to delete learner");
    } finally {
      setSaving(false);
    }
  };

  const handleSuspendLearner = async () => {
    if (!id) return;
    const ok = window.confirm("Suspend learner account?");
    if (!ok) return;
    try {
      setSaving(true);
      // Try common flags; backend will ignore unknown fields
      await updateLearner(id, { status: "suspended", is_active: false });
      showSuccessToast("Learner suspended");
      // Refresh
      const allLearners = await getAllLearners();
      const refreshedLearner = allLearners.find(
        (learner) => learner.id === parseInt(id) || learner.id === id
      );
      if (refreshedLearner) {
        setLearner(refreshedLearner);
      }
    } catch (err) {
      console.error(err);
      showErrorToast("Failed to suspend learner");
    } finally {
      setSaving(false);
    }
  };

  const handleSendReminder = async () => {
    // Placeholder: integrate real reminder endpoint when available
    showSuccessToast("Reminder sent to mail (simulated)");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!learner) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Learner not found</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded bg-[#13485B] text-white"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Learner Details
            </h1>
            {lastActive && (
              <p className="text-[11px] text-gray-500 mt-1">
                Last active: <span className="font-medium">{lastActive}</span>
              </p>
            )}
          </div>
        </div>
        <StatusPill status={learner?.status} />
      </div>

      {/* Body */}
      <div className="px-4 md:px-6 py-6 space-y-8">
        {/* Personal Details */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Personal Details
          </h2>
          <div className="border rounded-lg p-4">
            <DetailRow
              label="First name"
              value={learner?.first_name || learner?.firstName}
            />
            <DetailRow
              label="Last name"
              value={learner?.last_name || learner?.lastName}
            />
            <DetailRow label="Email address" value={learner?.email} />
            <DetailRow
              label="Home address"
              value={learner?.home_address || learner?.address}
            />
            <DetailRow label="Gender" value={learner?.gender} />
            <DetailRow
              label="Phone number"
              value={learner?.phone_number || learner?.phone}
            />
            <DetailRow label="Country" value={learner?.country} />
            <DetailRow label="State" value={learner?.state} />
            <DetailRow
              label="Date of birth"
              value={learner?.date_of_birth || learner?.dob}
            />
            <DetailRow label="Qualification" value={learner?.qualification} />
          </div>
        </div>

        {/* Enrolled Courses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">
              Enrolled Courses
            </h2>
          </div>

          {enrolledCourses?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course?.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No enrolled courses</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-3">
          <button
            onClick={handleDeleteLearner}
            disabled={saving}
            className="px-4 py-2 rounded border text-red-600 border-red-300 hover:bg-red-50 disabled:opacity-60"
          >
            Delete learner
          </button>
          <button
            onClick={handleSuspendLearner}
            disabled={saving}
            className="px-4 py-2 rounded border text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-60"
          >
            Suspend Learner
          </button>
          <button
            onClick={handleSendReminder}
            className="px-4 py-2 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          >
            Send a reminder to mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnerDetailsPage;
