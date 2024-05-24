import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
    const themeMode = useSelector((state) => state.image.themeMode);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setFormErrors({
            ...formErrors,
            [name]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('https://silencecoderr-portfolio-api.vercel.app/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    toast.success('Message sent successfully!');
                    setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: ''
                    });
                } else {
                    toast.error('Failed to send message. Please try again later.');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                toast.error('An error occurred. Please try again later.');
            }
        } else {
            setFormErrors(errors);
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.fullName.trim()) {
            errors.fullName = 'Full Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            errors.email = 'Invalid email address';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required';
        } else if (!isValidPhone(formData.phone)) {
            errors.phone = 'Invalid phone number';
        }
        if (!formData.subject.trim()) {
            errors.subject = 'Subject is required';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        }
        return errors;
    };

    const isValidPhone = (phone) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    };

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    return (
        <div>
            <section name="contact" id="contact" className="bx-contact-section bx-section padding-tb-80 body-bg">
                <div className="container">
                    <Fade triggerOnce duration={2000} direction='up' delay={300} className="title">
                        <p className="light-txt">For enquiries</p>
                        <h2>Get In<span className="primary-clr"> Touch</span></h2>
                        <p className="subtitle">Fill the form below and we'll get back to you as soon as possible.</p>
                    </Fade>
                    <form className={`${themeMode === "light" ? "form-light" : ""}`} onSubmit={handleSubmit}>
                        <div className="row">
                            <Fade triggerOnce duration={2000} direction='up' delay={300} className="col-md-6">
                                <div className="border-box">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            autoComplete="off"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            required
                                        />
                                        {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            autoComplete="off"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            required
                                        />
                                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            autoComplete="off"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone"
                                            required
                                        />
                                        {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control border-none"
                                            autoComplete="off"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Subject"
                                            required
                                        />
                                        {formErrors.subject && <span className="error">{formErrors.subject}</span>}
                                    </div>
                                </div>
                            </Fade>
                            <Fade triggerOnce duration={2000} direction='up' delay={300} className="col-md-6">
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="7"
                                        placeholder="Message"
                                        required
                                    ></textarea>
                                    {formErrors.message && <span className="error">{formErrors.message}</span>}
                                    <button type="submit" className="custom-btn bx-btn-1">Submit</button>
                                </div>
                            </Fade>
                        </div>
                    </form>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}

export default Contact;