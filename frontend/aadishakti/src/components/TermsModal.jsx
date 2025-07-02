import React from 'react';
import { X } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#87161A]">अटी व नियम (Terms & Conditions)</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-gray-800 leading-relaxed">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-[#87161A]">
            <p className="text-base">
              ही वेबसाइट वापरताना किंवा कोर्स खरेदी करताना खालील अटी स्वीकारल्या जातात:
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">१. सेवा वापरण्याच्या अटी</h3>
              <p>
                कोर्स किंवा सेवा वैयक्तिक मार्गदर्शनासाठी आहेत. यांचा वैद्यकीय, कायदेशीर किंवा आर्थिक सल्ला म्हणून वापर करू नये.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">२. पेमेंट व कोर्स अ‍ॅक्सेस</h3>
              <p>
                QR कोडद्वारे पेमेंट केल्यावर स्क्रीनशॉट किंवा पेमेंटचा पुरावा द्यावा. आम्ही पेमेंट मिळाल्यावर कोर्स अ‍ॅक्सेस मॅन्युअली देतो.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">३. रिफंड नाही</h3>
              <p>
                एकदा पेमेंट झाल्यावर पैसे परत मिळणार नाहीत. कृपया खात्री करूनच खरेदी करा.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">४. वैयक्तिक माहिती</h3>
              <p>
                तुम्ही दिलेली माहिती (जसे जन्मतारीख इ.) गोपनीय ठेवली जाईल आणि फक्त सेवेसाठी वापरली जाईल.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">५. कोर्स सामग्रीचे हक्क</h3>
              <p>
                सर्व व्हिडिओ, PDF आणि कोर्स कंटेंटचे हक्क वेबसाईटच्या मालकाकडे आहेत. हे कॉपी, फॉरवर्ड किंवा विकू नये.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">६. अटीत बदल</h3>
              <p>
                या अटी वेळोवेळी बदलू शकतात. वेबसाईटचा वापर करत राहिल्यास त्या स्वीकारल्या असल्याचे समजले जाईल.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">७. संपर्क</h3>
              <p>
                काही प्रश्न असल्यास वेबसाइटवरील संपर्क फॉर्म किंवा ईमेलद्वारे आमच्याशी संपर्क साधा.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              शेवटची अपडेट: {new Date().toLocaleDateString('mr-IN')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#87161A] text-white py-3 px-6 rounded-lg hover:bg-[#6d1216] transition-colors"
          >
            बंद करा
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
