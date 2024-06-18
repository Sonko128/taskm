import { useEffect, useState } from "react";
import Layout from "../../Layout";

function Add_notes(){
    return(
        <Layout children={<Notes/>}/>
    )
}
export default Add_notes;

function Notes(){
  interface Note{
    id:number;
    grade:string;
    subject:string;
    filename:string;
  }
  const [grade,setGrade]=useState('');
  const [subject,setSubject]=useState('');
  const [file,setFile]=useState('');
  const [notes,setNotes]=useState<Note[]>([]);

  const handleSubmit=async (e: React.FormEvent)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/notes',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          grade:grade,
          subject:subject,
          filename:file,
        }),
      });
      if(response.ok){
        const data= await response.json();
        console.log(data.message);
        setGrade('');
        setSubject('');
        setFile('');
        //Fetch notes when upload is sucessful
        fetchNotes();
      }else if(response.status===422){
        alert('notes not upload');
      }else{
        alert('An error ocurred');
      }
    }catch(error){
      console.error("Error:",error);
    }
  };

  const fetchNotes = async ()=>{
    try{
      const response=await fetch('http://localhost:3000/notes',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }
      });
      const data = await response.json();
      if(Array.isArray(data)){
        setNotes(data);
      }else{
        console.error("Unexpected response format:",data);
      }
    }catch(error){
      console.error("Error fetching notes:",error);
    }
  };
  useEffect(()=>{
    fetchNotes();
  },[]);
  const customerList = Array.isArray(notes) ? notes.map((c) => (
    <tr className="border-collapse" key={c.id}>
        <td className="font-bold border-2 p-3">{c.grade}</td>
        <td className="border-2 p-3 text-center">{c.subject}</td>
        <td className="border-2 p-3 text-center">{c.filename}</td>
    </tr>
  )) : null;
    return(
        <div>
        <div className="p-4 grid md:lg:grid-cols-1 gap-2">
          <form className="col-span-2" onSubmit={handleSubmit}>
                <div className="ring-slate-300 ring-1 rounded-md pb-12 bg-blue-40 w-full p-1">
                    <div className="mt-1 grid grid-cols-1 gap-x-3 sm:grid-cols-5">
                        <div className="sm:col-span-2">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Grade
                            </label>
                            <div className="mt-1">
                                <input
                                type="text"
                                name={grade}
                                onChange={(e)=>setGrade(e.target.value)}
                                id="first-name"
                                autoComplete="given-name"
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
                        name={subject}
                        onChange={(e)=>setSubject(e.target.value)}
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
            <div className="sm:col-span-2">
              <div className="mt-1">
              <input type="file" id="real-file" 
              name={file}
              onChange={(e)=>setFile(e.target.value)}
              />
                    <button type="button" id="custom-button"></button>
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
              Notes Uploaded
              <table className="border-collapse border-slate-500 mx-auto w-full px-3 rounded-xl">
          <thead>
            <tr className="bg-slate-400 p-4">
              <th className="border-2 p-4">grade</th>
              <th className="border-2 p-4">subject</th>
              <th className="border-2 p-4">file</th>
              <th className="border-2 p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {customerList}
          </tbody>
        </table>
          </div>
      </div>
    )
}