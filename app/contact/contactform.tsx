import { useState } from 'react';
import Button from '@mui/material/Button';


type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};
const ContactForm = () => {
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', email: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', form);
    setSubmitted(true);
  };

  return (
   <>
   <div className="contactmaincontent">
      <div id="contact-text">
        <h2>How can we Help?</h2>
        <p>We'll get back to you within 24 hours.</p>
        <p><span style={{ fontWeight: 'bold' }}>Email:</span> Saasy Marketing  at <a href="mailto:saasy@saasymktg.com">saasy@saasymktg.com</a>
        </p>
        <p><strong>Phone:  <a href="tel:1-888-867-5309">1-888-867-5309</a></strong></p>
  
        <p><a href='/privacy'>Privacy</a></p>
      </div>

      <div id="contact-form" className="searchmaincontent">
         <span style={{ width: '50%', display: 'inline-block' }}><label htmlFor="firstName">First name</label><br />
        <input id="firstName" name="firstName" type="text" placeholder="Jane" onChange={handleChange} /></span>
        
 <span style={{ width: 'auto', display: 'inline-block' }}>
        <label htmlFor="lastName">Last name </label><br />
        <input id="lastName" name="lastName" type="text" placeholder="Smith" onChange={handleChange} /></span>
<span style={{ width: '100%', display: 'inline-block' }}>
        <label htmlFor="email">Email address</label><br />
        <input id="email" name="email" type="email" placeholder="jane@example.com" onChange={handleChange} style={{ width: '375px' }} />
        </span>
 <span style={{ width: '25%', display: 'inline-block' }}>
        <label htmlFor="subject">Subject</label><br /></span>
         
         
         <span style={{ width: '25%', display: 'inline-block' }}>
        <select id="subject" name="subject" onChange={handleChange} defaultValue="">
          <option value="" disabled>Select a topic</option>
          <option>General Inquiry</option>
          <option>Technical Support</option>
          <option>Sales & Marketing</option>
          <option>Other</option>
        </select>
        </span> 
       <br />
  
<span style={{ width: '50%', display: 'inline-block' }}>
        <label htmlFor="message">Message </label><br />
        <textarea id="message" name="message" placeholder="Tell us how we can help..." rows={5} cols={47} onChange={handleChange} />
        
</span><br />
        <Button onClick={handleSubmit} variant="contained" color="primary">Send message</Button>
        {submitted && <p>Thank you for contacting us! We'll be in touch soon.</p>}
        
      </div>
    </div>
    </>
    
  );
};

export default ContactForm;

