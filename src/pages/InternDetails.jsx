
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InternDetails() {
  const { id } = useParams();
  const [intern, setIntern] = useState(null);

  useEffect(() => {
    axios.get(`https://intern-house-backend-sandy.vercel.app/${id}`).then((res) => {
      setIntern(res.data);
    });
  }, [id]);

  if (!intern) return <div className="container py-4">Loading...</div>;

  return (
        <div className="container mt-3">
          <h2>{intern.title}</h2>
    <div className="container card py-4 mt-3">
      <div className="card-body">
      <p><strong>Company:</strong> {intern.companyName}</p>
      <p><strong>Location:</strong> {intern.location}</p>
      <p><strong>Salary:</strong> ${intern.salary}</p>
      <p><strong>Job Type:</strong> {intern.jobType}</p>
      <p><strong>Description:</strong> {intern.description}</p>
      <h5>Qualifications:</h5>
      <ol>
        {intern.qualifications.map((q, i) => <li key={i}>{q}</li>)}
      </ol>
      </div>
    </div>
        </div>
  );
}

export default InternDetails;