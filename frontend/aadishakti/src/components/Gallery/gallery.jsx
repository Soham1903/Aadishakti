import React, { useState } from 'react';
import { X } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    imageUrl: "/assets/GalleryPhotos/1.jfif",
    title: "डोंबिवली येथील वास्तू अधिवेशन",
    description: "डोंबिवली येथे भरवलेल्या वास्तू अधिवेशना मधील दिग्गज व्याख्याते आणि ज्योतिषाचार्य चारुशीला कांबळे."
  },
  {
    id: 2,
    imageUrl: "/assets/GalleryPhotos/2.png",
    title: "सातारा येथील राज्यस्तरीय अधिवेशन",
    description: "सातारा येथील राज्यस्तरीय अधिवेशनात चारुशीला कांबळे यांना व्याख्याते म्हणून बोलावण्यात आले होते. त्यावेळी सौ मानसी काळे यांना अंकशास्त्र हे पुस्तक प्रेझेंट देताना."
  },
  {
    id: 3,
    imageUrl: "/assets/GalleryPhotos/3.jpg",
    title: "सातारा येथील राज्यस्तरीय अधिवेशन",
    description: "सातारा येथील राज्यस्तरीय अधिवेशनात चारुशीला कांबळे यांना व्याख्याते म्हणून बोलावण्यात आले होते. त्यावेळी श्री आनंद पिंपळकर आणि इतर व्याख्यात्यां च्या समवेत."
  },
  {
    id: 4,
    imageUrl: "/assets/GalleryPhotos/4.jfif",
    title: "सातारा येथे संमोहन कार्यशाळा",
    description: "सातारा येथे संमोहन कार्यशाळा झाली त्यावेळी विद्यार्थ्यांच्या समवेत ज्योतिषाचार्य सौ चारुशीला कांबळे."
  },
  {
    id: 5,
    imageUrl: "/assets/GalleryPhotos/5.JPG",
    title: "सासवड येथील राज्यस्तरीय ज्योतिष अधिवेशन",
    description: "सासवड येथील राज्यस्तरीय ज्योतिष अधिवेशनामध्ये गुरुवर्य श्री प्रदीप पंडित सर यांना उत्तम लेखक हा पुरस्कार देताना अतुल शास्त्री भगरे गुरुजी आणि ज्योतिषाचार्य चारुशीला कांबळे."
  },
  {
    id: 6,
    imageUrl: "/assets/GalleryPhotos/6.JPG",
    title: "सासवड अधिवेशनातील सत्कार समारंभ",
    description: "सासवड येथील राज्यस्तरीय ज्योतिष अधिवेशनामध्ये डॉक्टर ज्योती जोशी, डॉक्टर मुग्धा पत्की आणि डॉक्टर जयश्री मग्गीरवार यांचा सत्कार करताना मा अतुल शास्त्री भगरे गुरुजी आणि ज्योतिषाचार्य चारुशीला कांबळे."
  },
  {
    id: 7,
    imageUrl: "/assets/GalleryPhotos/7.JPG",
    title: "भविष्य कथन सन्मान",
    description: "सासवड येथील राज्यस्तरीय ज्योतिष अधिवेशनामध्ये झी टीव्हीवरील भविष्य कथन करणारे गुरुवर्य श्री अतुल शास्त्री भगरे गुरुजी यांचा सत्कार करताना श्री आणि सौ कांबळे."
  },
  {
    id: 8,
    imageUrl: "/assets/GalleryPhotos/8.JPG",
    title: "वास्तू न्यूमरो महागुरु पदवी प्रदान",
    description: "डॉक्टर ज्योती जोशी यांनी त्यांच्या पुणे येथील अधिवेशनात ज्योतिषाचार्य चारुशीला कांबळे यांना वास्तू न्यूमरो महागुरु ही पदवी प्रदान केली त्या वेळचा फोटो."
  },
  {
    id: 9,
    imageUrl: "/assets/GalleryPhotos/9.jfif",
    title: "जळगाव येथील अधिवेशन",
    description: "डॉक्टर ज्योती जोशी यांनी त्यांच्या जळगाव येथील अधिवेशनात ज्योतिषाचार्य सौ. चारुशीला कांबळे यांच्याबरोबर चर्चासत्र सुरू असताना."
  },
  {
    id: 10,
    imageUrl: "/assets/GalleryPhotos/10.jfif",
    title: "पंढरपूर हस्तरेषा अधिवेशन",
    description: "पंढरपूर येथील हस्तरेषा अधिवेशनातील फोटो."
  },
  {
    id: 11,
    imageUrl: "/assets/GalleryPhotos/11.jfif",
    title: "विधीलिखित संस्था सन्मान",
    description: "विधीलिखित संस्थेचे सर्वेसर्वा श्री आदिनाथ साळवी यांच्या हस्ते सन्मानचिन्ह स्वीकारताना."
  },
  {
    id: 12,
    imageUrl: "/assets/GalleryPhotos/12.jfif",
    title: "दत्तप्रसाद चव्हाण यांच्या हस्ते सन्मान",
    description: "दत्तप्रसाद चव्हाण यांच्या हस्ते सन्मानचिन्ह स्वीकारताना."
  }
];

function ImageModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors z-10"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-2/3 h-[50vh] md:h-auto">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full md:w-1/3 p-6 overflow-y-auto max-h-[40vh] md:max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Achievements & Awards
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A showcase of our recognition and notable moments across various conferences and events.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-[1.01] transition-transform"
              onClick={() => openModal(item)}
            >
              <div className="aspect-auto h-64 overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && <ImageModal item={selectedItem} onClose={closeModal} />}
    </div>
  );
}

export default Gallery;