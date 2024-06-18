import { useEffect, useState } from "react";
import Layout from "../../Layout";

function Add_teacher(){
    return(
        <Layout children={<Teacher/>}/>
    )
}
export default Add_teacher;

function Teacher(){
  interface Teacher {
    id: number;
    name: string;
    age: number;
    weekness: string;
    email: string;
    teacher_id: number;
    location: string;
    mobile: number;
    subject: string;
  }

  const [teachername, setTeachername] = useState('');
  const [age, setAge] = useState('');
  const [weekness, setWeakness] = useState('');
  const [email, setEmail] = useState('');
  const [teacher_id, setTeacher_id] = useState('');
  const [location, setLocation] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: teachername,
          age: age,
          weekness: weekness,
          email: email,
          teacher_id: teacher_id,
          location: location,
          mobile: mobile,
          subject: subject,
        }),
      });
      if (response.ok){
        const data = await response.json();
        console.log(data.message);
        setTeachername('');
        setAge('');
        setWeakness('');
        setEmail('');
        setTeacher_id('');
        setLocation('');
        setMobile('');
        setSubject('');
        // Fetch the updated list of teachers
        fetchTeachers();
      } else if (response.status === 422) {
        alert("Teacher not registered");
      } else {
        alert("An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:3000/teachers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setTeachers(data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const customerList = Array.isArray(teachers) ? teachers.map((c) => (
    <tr className="border-collapse" key={c.id}>
        <td className="font-bold border-2 p-3">{c.name}</td>
        <td className="border-2 p-3 text-center">{c.age}</td>
        <td className="border-2 p-3 text-center">{c.weekness}</td>
        <td className="border-2 p-3 text-center">{c.email}</td>
        <td className="border-2 p-3 text-center">{c.teacher_id}</td>
        <td className="border-2 p-3 text-center">{c.location}</td>
        <td className="border-2 p-3 text-center">{c.mobile}</td>
        <td className="border-2 p-3 text-center">{c.subject}</td>
    </tr>
  )) : null;

  return (
    <div>
      <div className="p-4 grid md:lg:grid-cols-1 gap-2">
        <form className="col-span-2" onSubmit={handleSubmit}>
          <div className="ring-slate-300 ring-1 rounded-md pb-12 bg-blue-40 w-full p-1">
            <div className="mt-1 grid grid-cols-1 gap-x-3 sm:grid-cols-5">
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Teachers Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={teachername}
                    onChange={(e) => setTeachername(e.target.value)}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Teachers ID
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={teacher_id}
                    onChange={(e) => setTeacher_id(e.target.value)}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Age
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Weakness
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={weekness}
                    onChange={(e) => setWeakness(e.target.value)}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Subject
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    id="last-name"
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
        Teachers Details
        <table className="border-collapse border-slate-500 mx-auto w-full px-3 rounded-xl">
          <thead>
            <tr className="bg-slate-400 p-4">
              <th className="border-2 p-4">Name</th>
              <th className="border-2 p-4">Age</th>
              <th className="border-2 p-4">Weakness</th>
              <th className="border-2 p-4">Email</th>
              <th className="border-2 p-4">Teacher ID</th>
              <th className="border-2 p-4">Location</th>
              <th className="border-2 p-4">Mobile</th>
              <th className="border-2 p-4">Subject</th>
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
