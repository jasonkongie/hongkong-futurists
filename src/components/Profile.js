// src/components/Profile.js
export default class Profile {
    constructor(response) {
      this.name = '';
      this.email = '';
      this.birthDate = '';
      this.phoneNumber = '';
      this.university = '';
      this.major = '';
      this.startDate = '';
      this.status = '';
      this.linkedInProfile = '';
      this.personalStatement = '';
      this.visionStatement = '';
      this.personalityType = '';
      this.consentGiven = false; // Assuming this field is for consent
      this.additionalEmail = '';
  
      this.processProfile(response);
    }
  
    processProfile(response) {
      response.answers.forEach(answer => {
        switch (answer.field.ref) {
          // Replace the field ref with actual references from your Typeform
          // ... (add cases for each field)
        }
      });
    }
  }
  
