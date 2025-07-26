 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostIntern() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    qualifications: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setMessage("");
    setMessageType("");
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required.';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    if (!formData.salary || isNaN(formData.salary) || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number.';
    }
    if (!formData.jobType) newErrors.jobType = 'Job type is required.';
    if (!formData.description.trim()) newErrors.description = 'Job description is required.';
    if (!formData.qualifications.trim()) newErrors.qualifications = 'Qualifications are required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!validateForm()) {
      setMessage('Please fill in all required fields and correct errors.');
      setMessageType("danger");
      return;
    }

    setLoading(true);

    try {
      const newIntern = {
        ...formData,
        salary: parseFloat(formData.salary),
        qualifications: formData.qualifications
          .split(",")
          .map((q) => q.trim())
          .filter((q) => q.length > 0)
      };

      const API_URL = 'https://intern-house-backend-sandy.vercel.app/interns';
      await axios.post(API_URL, newIntern);

      setMessage("✅ Job posted successfully!");
      setMessageType("success");

      setFormData({
        title: "",
        companyName: "",
        location: "",
        salary: "",
        jobType: "",
        description: "",
        qualifications: ""
      });
      setErrors({});

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.error("Error posting job:", err.response?.data || err.message);
      setMessage(`Failed to post job: ${err.response?.data?.error || err.message}`);
      setMessageType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Post a Job</h2>
      {message && <div className={`alert alert-${messageType}`}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Job Title:</label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Company Name:</label>
          <input
            type="text"
            name="companyName"
            className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            name="location"
            className={`form-control ${errors.location ? 'is-invalid' : ''}`}
            value={formData.location}
            onChange={handleChange}
            required
          />
          {errors.location && <div className="invalid-feedback">{errors.location}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Salary:</label>
          <input
            type="number"
            name="salary"
            className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
            value={formData.salary}
            onChange={handleChange}
            required
          />
          {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Job Type:</label>
          <select
            name="jobType"
            className={`form-select ${errors.jobType ? 'is-invalid' : ''}`}
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Full-time (On-site)">Full-time (On-site)</option>
            <option value="Part-time (On-site)">Part-time (On-site)</option>
            <option value="Full-time (Remote)">Full-time (Remote)</option>
            <option value="Part-time (Remote)">Part-time (Remote)</option>
          </select>
          {errors.jobType && <div className="invalid-feedback">{errors.jobType}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description:</label>
          <textarea
            name="description"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            value={formData.description}
            onChange={handleChange}
            rows="2"
            required
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Job Qualifications:</label>
          <textarea
            name="qualifications"
            className={`form-control ${errors.qualifications ? 'is-invalid' : ''}`}
            value={formData.qualifications}
            onChange={handleChange}
             rows="2"
            required
          ></textarea>
          {errors.qualifications && <div className="invalid-feedback">{errors.qualifications}</div>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}

export default PostIntern;