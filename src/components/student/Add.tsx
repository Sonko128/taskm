import { useEffect, useState } from "react";
import Layout from "../../Layout";

function Add() {
  return (
    <Layout children={<Point />} />
  );
}
export default Add;

function Point() {
  // Define the Student interface with the expected fields
  interface Student {
    id: number;
    name: string;
    age: number;
    weakness: string;
    grade: string;
    pnumber: number;
    parent_name: string;
    email: string;
    class_teacher: string;
    studentid: number;
    location: string;  // Assuming location is a string, not a number
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [studentname, setStudentName] = useState('');
  const [age, setAge] = useState('');
  const [weakness, setWeakness] = useState('');
  const [pnumber, setPnumber] = useState('');
  const [grade, setGrade] = useState('');
  const [studentid, setStudentid] = useState('');
  const [location, setLocation] = useState('');
  const [pname, setPname] = useState('');
  const [email, setEmail] = useState('');
  const [classteacher, setClassteacher] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: studentname,
          age: age,
          weakness: weakness,
          pnumber: pnumber,
          grade: grade,
          studentid: studentid,
          location: location,
          parent_name: pname,
          email: email,
          class_teacher: classteacher,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Handle the response as needed

        // Clear form fields
        setStudentName('');
        setAge('');
        setWeakness('');
        setPnumber('');
        setGrade('');
        setStudentid('');
        setLocation('');
        setPname('');
        setEmail('');
        setClassteacher('');
      } else if (response.status === 422) {
        alert("Student Not Registered");
      } else {
        alert("An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:3000/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => { 
          if (Array.isArray(data)) {
              setStudents(data); 
          } else {
              console.error("Expected an array but got:", data);
          }
      })
      .catch(e => console.error(e));
  }, []); // Added empty dependency array to avoid infinite fetch

  const customerList = Array.isArray(students) ? students.map((c) => (
    <tr className="border-collapse" key={c.id}>
        <td className="font-bold border-2 p-3">{c.name}</td>
        <td className="border-2 p-3 text-center">{c.age}</td>
        <td className="border-2 p-3 text-center">{c.location}</td>
        <td className="border-2 p-3 text-center">{c.weakness}</td>
        <td className="border-2 p-3 text-center">{c.pnumber}</td>
        <td className="border-2 p-3 text-center">{c.grade}</td>
        <td className="border-2 p-3 text-center">{c.studentid}</td>
        <td className="border-2 p-3 text-center">{c.parent_name}</td>
        <td className="border-2 p-3 text-center">{c.email}</td>
        <td className="border-2 p-3 text-center">{c.class_teacher}</td>
    </tr>
  )) : null;

  return (
    <div>
      <div className="p-4 grid md:lg:grid-cols-1 gap-2">
        <form className="col-span-2" onSubmit={handleSubmit}>
          <div className="ring-slate-300 ring-1 rounded-md pb-12 bg-blue-40 w-full p-1">
            <div className="mt-1 grid grid-cols-1 gap-x-3 sm:grid-cols-5">
              <div className="sm:col-span-2">
                <label htmlFor="student-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Student's Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={studentname}
                    onChange={(e) => setStudentName(e.target.value)}
                    id="student-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="student-id" className="block text-sm font-medium leading-6 text-gray-900">
                  Student ID
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={studentid}
                    onChange={(e) => setStudentid(e.target.value)}
                    id="student-id"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                  Age
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    id="age"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                  Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="location"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="weakness" className="block text-sm font-medium leading-6 text-gray-900">
                  Weakness
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={weakness}
                    onChange={(e) => setWeakness(e.target.value)}
                    id="weakness"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="parent-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Parent Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={pname}
                    onChange={(e) => setPname(e.target.value)}
                    id="parent-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={pnumber}
                    onChange={(e) => setPnumber(e.target.value)}
                    id="phone-number"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="grade" className="block text-sm font-medium leading-6 text-gray-900">
                  Grade
                </label>
                <div className="mt-1">
                  <select
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Grade</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="class-teacher" className="block text-sm font-medium leading-6 text-gray-900">
                  Class Teacher
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={classteacher}
                    onChange={(e) => setClassteacher(e.target.value)}
                    id="class-teacher"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 sm:col-span-1">
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="border-t-2 border-t-slate-400 mb-4 rounded-md ring-1 mx-4 p-4">
             Students Details
              <table className="border-collapse border-slate-500 mx-auto w-full px-3 rounded-xl">
                <thead>
                  <tr className="bg-slate-400 p-4">
                      <th className="border-2 p-4">Name</th>
                      <th className="border-2 p-4">Age</th>
                      <th className="border-2 p-4">Location</th>
                      <th className="border-2 p-4">Weakness</th>
                      <th className="border-2 p-4">Parent</th>
                      <th className="border-2 p-4">Grade</th>
                      <th className="border-2 p-4">SID</th>
                      <th className="border-2 p-4">Parent</th>
                      <th className="border-2 p-4">Email</th>
                      <th className="border-2 p-4">Teacher</th> 
                  </tr>
                </thead>
                <tbody>
                  {customerList}
                </tbody>
              </table>
          </div>
    </div>
  );
}
