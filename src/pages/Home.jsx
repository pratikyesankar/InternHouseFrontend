 
import React, { useEffect, useState } from 'react';
import InternCard from '../components/InternCard';
import axios from 'axios';

function Home() {
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://intern-house-backend-sandy.vercel.app/interns')
      .then((res) => setInterns(res.data))
      .catch((err) => console.error("Failed to fetch setInterns:", err));
  }, []);

  const filteredInterns = interns.filter((intern) =>
    intern.title.toLowerCase().includes(search.toLowerCase())
  );
  
  console.log("where is data", filteredInterns)

  return (
    <div className="container py-4">
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by intern title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h1>All Jobs</h1>
      <div className="row">
        {filteredInterns.map((intern) => (
          <div className="col-md-4" key={intern._id}>
            <InternCard intern={intern} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
