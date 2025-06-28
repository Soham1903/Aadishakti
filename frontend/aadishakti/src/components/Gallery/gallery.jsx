import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SectionHeading } from '../Home/SectionHeading';

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
    description: "विधीलिखित संस्था कडून ज्योतिषाचार्य चारुशीला कांबळे यांना दिला गेलेला सन्मान."
  },
  {
    id: 12,
    imageUrl: "/assets/GalleryPhotos/12.jfif",
    title: "दत्तप्रसाद चव्हाण यांच्या हस्ते सन्मान",
    description: "दत्तप्रसाद चव्हाण यांच्या हस्ते सन्मानचिन्ह स्वीकारताना."
  },
  {
    id: 13,
    imageUrl: "/assets/GalleryPhotos/20.jpg",
    title: "देवाशीष ज्योतिष ",
    description: "देवाशीष ज्योतिष कार्यालयाच्या उद्घाटन प्रसंगी माझे विद्यार्थी श्री नेताजी  माने व तानाजी माने यांनी आम्हा दोघा उभयतांना  आणि परमपूज्य श्री भगरे गुरुजी यांना प्रमुख अतिथी म्हणून बोलावले होते त्या प्रसंगी चे  आनंद क्षण येथे देत आहे ."
  }
  // {
  //   id: 14,
  //   videoUrl: "/assets/GalleryVideos/video.mp4",
  //   title: "चारुशीला कांबळे यांचे व्याख्यान",
  //   description: "वास्तू व ज्योतिष शास्त्रावर चारुशीला कांबळे यांचे माहितीपूर्ण व्याख्यान."
  // }
];

function ImageModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
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
          <div className="w-full md:w-1/3 p-8 overflow-y-auto max-h-[40vh] md:max-h-[90vh]">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">{item.title}</h3>
            <p className="text-slate-600">{item.description}</p>
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
    <div className="bg-gray-50 min-h-screen py-16 md:py-20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="आमची पुरस्कारप्राप्त क्षणचित्रे"
          subtitle="विविध अधिवेशनांमधील मान्यता व गौरवाचे क्षण येथे मांडले आहेत"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => openModal(item)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-medium text-lg text-slate-800 mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-slate-600 line-clamp-2">{item.description}</p>
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
