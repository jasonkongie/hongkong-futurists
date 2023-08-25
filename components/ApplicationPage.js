import React from 'react';

const ApplicationPage = () => {
  return (
    <div className="application-container">
      <h2>Application for HK Future Leaders Organization</h2>
      <form className="application-form">
        <label>
          Full Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email Address:
          <input type="email" name="email" required />
        </label>
        <label>
          Address in Hong Kong:
          <textarea name="address" required></textarea>
        </label>
        <label>
          Californian Institution:
          <input type="text" name="institution" required />
        </label>
        <label>
          Committee Interest:
          <select name="committee">
            <option value="finance">Finance, Trade & Property Committee</option>
            <option value="tech">Tech & Innovation Committee</option>
            <option value="tourism">Tourism, Entertainment & Professional Services Committee</option>
          </select>
        </label>
        <label>
          Experiences or Qualifications:
          <textarea name="experience" required></textarea>
        </label>
        <label>
          Why do you want to join?
          <textarea name="reason" required></textarea>
        </label>
        <label>
          Accept Membership Fee of 00 HKD or 00 USD:
          <input type="checkbox" name="feeAcceptance" required />
        </label>
        <label>
          I agree to the organization's values and rules:
          <input type="checkbox" name="agreement" required />
        </label>
        <input type="submit" value="Submit Application" />
      </form>
    </div>
  );
};

export default ApplicationPage;
