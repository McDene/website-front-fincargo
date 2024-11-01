"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAPI, cn } from "@/lib/utils";

interface Department {
  id: number;
  Name: string;
}

interface Job {
  id: number;
  Title: string;
  Location: string;
  Slug: string;
  Department?: {
    id: number;
  };
}

export default function CareerOverview() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [jobCountsByDepartment, setJobCountsByDepartment] = useState<
    Record<number, number>
  >({});
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch all departments and jobs initially
  useEffect(() => {
    const getInitialData = async () => {
      try {
        const [departmentsRes, jobsRes] = await Promise.all([
          fetchAPI("/api/departments"),
          fetchAPI("/api/careers?populate=Department"),
        ]);

        // Set departments data
        if (departmentsRes && departmentsRes.data) {
          setDepartments(departmentsRes.data);
        }

        // Set jobs data
        if (jobsRes && jobsRes.data) {
          setJobs(jobsRes.data);

          // Calculate job counts per department
          const counts: Record<number, number> = {};
          jobsRes.data.forEach((job: Job) => {
            const deptId = job.Department?.id;
            if (deptId) {
              counts[deptId] = (counts[deptId] || 0) + 1;
            }
          });
          setJobCountsByDepartment(counts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getInitialData();
  }, []);

  // Fetch jobs based on selected department and search term
  useEffect(() => {
    const getFilteredJobs = async () => {
      try {
        const endpoint = selectedDepartment
          ? `/api/careers?filters[Department][id][$eq]=${selectedDepartment}&populate=Department`
          : "/api/careers?populate=Department";
        const response = await fetchAPI(endpoint);
        if (response && response.data) {
          setJobs(response.data);
        }
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    };
    getFilteredJobs();
  }, [selectedDepartment]);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={cn("py-24 xl:py-32 lg:py-38 md:py-38 bg-white px-4")}>
      <div className="max-w-7xl mx-auto">
        <div className="pb-12">
          <h1 className="text-5xl md:text-7xl font-semibold uppercase text-center mb-1 md:mb-12">
            Our open posts
          </h1>
        </div>
        <div className="flex">
          {/* Sidebar for Department Filters */}
          <aside className="hidden md:block w-1/4 pr-8">
            <h2 className="text-2xl p-3 font-semibold mb-6">Departments</h2>
            <ul>
              <li
                className={cn(
                  "cursor-pointer p-3 text-lg rounded-3xl text-gray-600 hover:bg-gray-50",
                  !selectedDepartment ? "font-bold text-gray-900" : ""
                )}
                onClick={() => setSelectedDepartment(null)}
              >
                All Departments
              </li>
              {departments.map((department) => (
                <li
                  key={department.id}
                  className={cn(
                    "cursor-pointer p-3 text-lg rounded-3xl text-gray-600 hover:bg-gray-50",
                    selectedDepartment === department.id
                      ? "font-bold text-gray-900"
                      : ""
                  )}
                  onClick={() => setSelectedDepartment(department.id)}
                >
                  <span>{department.Name}</span>
                  {jobCountsByDepartment[department.id] != null && (
                    <span
                      className={cn(
                        "p-2 text-gray-600 ml-auto",
                        selectedDepartment === department.id
                          ? "font-bold text-gray-900"
                          : ""
                      )}
                    >
                      - {jobCountsByDepartment[department.id]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* Job Listings */}
          <div className="md:w-3/4 w-full">
            {/* Search Bar */}
            <div className="flex justify-center mb-4 md:mb-8">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 border rounded-full outline-none transition duration-300 focus:border-gray-500"
              />
            </div>

            {/* Dropdown for Department Filters on Mobile */}
            <div className="relative mb-4 md:hidden">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full p-4 text-left border rounded-full bg-gray-100 focus:outline-none"
              >
                {selectedDepartment
                  ? departments.find((dept) => dept.id === selectedDepartment)
                      ?.Name || "All Departments"
                  : "All Departments"}
              </button>
              {showDropdown && (
                <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
                  <li
                    className={cn(
                      "cursor-pointer p-3 text-lg text-gray-600 hover:bg-gray-50",
                      !selectedDepartment ? "font-bold text-gray-900" : ""
                    )}
                    onClick={() => {
                      setSelectedDepartment(null);
                      setShowDropdown(false);
                    }}
                  >
                    All Departments
                  </li>
                  {departments.map((department) => (
                    <li
                      key={department.id}
                      className={cn(
                        "cursor-pointer p-3 text-lg text-gray-600 hover:bg-gray-50",
                        selectedDepartment === department.id
                          ? "font-bold text-gray-900"
                          : ""
                      )}
                      onClick={() => {
                        setSelectedDepartment(department.id);
                        setShowDropdown(false);
                      }}
                    >
                      <span>{department.Name}</span>
                      {jobCountsByDepartment[department.id] != null && (
                        <span className="ml-2 text-sm text-gray-500">
                          - {jobCountsByDepartment[department.id]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <Link key={job.id} href={`/careers/${job.Slug}`}>
                    <div
                      className={cn(
                        "rounded-lg p-6 my-5 bg-gray-50 hover:bg-gray-200 transition duration-300"
                      )}
                    >
                      <h2 className="text-3xl md:text-4xl font-semibold">
                        {job.Title}
                      </h2>
                      <p className="text-gray-600 mt-2">{job.Location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No jobs available for this department.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
