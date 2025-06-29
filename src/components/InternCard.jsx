 import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function InternCard({ intern }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/interns/${intern._id}`);
      alert('Intern deleted successfully!');
      window.location.reload();  
    } catch (error) {
      alert('Failed to delete intern.');
      console.error(error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h3 className="card-title">{intern.title}</h3>
        <p className="card-text"><strong>Company name: </strong>{intern.companyName}</p>
        <p className="card-text"><strong>Location: </strong>{intern.location}</p>
        <p className="card-text"><strong>Job Type: </strong>{intern.jobType}</p>

        <Link to={`/interns/${intern._id}`} className="btn btn-primary me-2">
          See Details
        </Link>

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default InternCard;
