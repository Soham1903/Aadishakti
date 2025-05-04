import React, { useState } from 'react';
import { Calendar, Clock, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Appointment = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const phoneNumber = params.get('number') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: phoneNumber,
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('आपल्या अपॉइंटमेंटसाठी धन्यवाद! आम्ही लवकरच संपर्क करू.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#921a40] to-[#6d1431] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 md:p-8">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>मागे जा</span>
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">अपॉइंटमेंट बुक करा</h1>
          <p className="text-white/80 mb-8">तुमच्या मोबाईल नंबर न्यूमरोलॉजी विश्लेषणासाठी वेळ निवडा</p>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="bg-white/20 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-yellow-300" />
                  <h3 className="text-xl font-semibold text-white">तुमचा नंबर: {phoneNumber}</h3>
                </div>
                <p className="text-white/80">
                  या नंबरचे न्यूमरोलॉजी विश्लेषण करून तुम्हाला तुमच्या जीवनावर याचा काय प्रभाव पडतो हे समजेल.
                </p>
              </div>
              
              <div className="bg-white/20 p-5 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-4">फायदे</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-yellow-500 flex-shrink-0 mt-1"></span>
                    <span>आपल्या मोबाईल नंबरमध्ये दडलेले गूढ जाणून घ्या</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-yellow-500 flex-shrink-0 mt-1"></span>
                    <span>तुमच्यासाठी विशेष भाग्यकारक पॅटर्न लॉक</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-yellow-500 flex-shrink-0 mt-1"></span>
                    <span>तुमचे जीवन सुधारण्यासाठी संख्यात्मक मार्गदर्शन</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white/20 p-6 rounded-xl space-y-6">
              <div>
                <label className="block text-white/80 mb-2" htmlFor="name">
                  संपूर्ण नाव
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300"
                  placeholder="आपले नाव प्रविष्ट करा"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2" htmlFor="email">
                  ईमेल
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300"
                  placeholder="youremail@example.com"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2" htmlFor="phone">
                  मोबाईल क्रमांक
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300"
                  placeholder="तुमचा मोबाईल नंबर"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2" htmlFor="date">
                    तारीख
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300"
                    />
                    <Calendar className="absolute right-3 top-3 h-5 w-5 text-white/50" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2" htmlFor="time">
                    वेळ
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300"
                    />
                    <Clock className="absolute right-3 top-3 h-5 w-5 text-white/50" />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#921a40] border border-yellow-300 text-white font-bold py-3 px-6 rounded-lg transition-all hover:bg-[#7a1736] focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
              >
                अपॉइंटमेंट बुक करा
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
