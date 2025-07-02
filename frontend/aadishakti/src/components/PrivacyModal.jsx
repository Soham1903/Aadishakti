import React from 'react';
import { X } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#87161A]">गोपनीयता धोरण (Privacy Policy)</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-gray-800 leading-relaxed">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-base font-medium">
              आम्ही तुमची वैयक्तिक माहिती गोपनीय ठेवण्यास वचनबद्ध आहोत.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">आम्ही कोणती माहिती गोळा करतो</h3>
              <p className="mb-3">
                जेव्हा तुम्ही कोर्स खरेदी करता किंवा सेवा घेण्यासाठी संपर्क करता, तेव्हा आम्ही खालील माहिती मागवतो:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>तुमचं नाव, ईमेल, फोन नंबर</li>
                <li>वैयक्तिक माहिती जी सेवा देण्यासाठी लागते (उदा. जन्मतारीख, जन्मस्थळ)</li>
                <li>QR पेमेंटची माहिती (जसे UPI रेफरन्स किंवा स्क्रीनशॉट)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">ही माहिती आम्ही कशी वापरतो</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>कोर्स अ‍ॅक्सेस देण्यासाठी</li>
                <li>तुमच्याशी संवाद साधण्यासाठी</li>
                <li>वैयक्तिक मार्गदर्शन देण्यासाठी (जसे ज्योतिष, वास्तु, टॅरो इ.)</li>
              </ul>
              <div className="bg-green-50 p-3 rounded-lg mt-3">
                <p className="font-medium text-green-800">
                  तुमची माहिती आम्ही कोणासोबतही शेअर करत नाही.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">पेमेंट प्रक्रिया</h3>
              <p>
                पेमेंट QR कोडने होते. पेमेंट मिळाल्यानंतर आम्ही कोर्स अ‍ॅक्सेस मॅन्युअली देतो. वेबसाइटवर कुठलीही बँकिंग माहिती सेव्ह होत नाही.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">Cookies (कुकीज)</h3>
              <p>
                वेबसाइटचा अनुभव सुधारण्यासाठी कुकीज वापरल्या जाऊ शकतात. तुम्ही तुमच्या ब्राऊजर सेटिंग्समधून त्या बंद करू शकता.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">तुमची संमती</h3>
              <p>
                या वेबसाइटचा वापर करून आणि तुमची माहिती देऊन तुम्ही आमच्या गोपनीयता धोरणास सहमती देता.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">बदल</h3>
              <p>
                हे धोरण वेळोवेळी अपडेट होऊ शकते. कृपया ही पेज वेळोवेळी तपासा.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#87161A] mb-3">संपर्क</h3>
              <p>
                गोपनीयतेशी संबंधित काही प्रश्न असल्यास, कृपया वेबसाइटवरील संपर्क फॉर्मद्वारे किंवा दिलेल्या ईमेलवर आमच्याशी संपर्क करा.
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

export default PrivacyModal;
