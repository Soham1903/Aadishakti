import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Certificate({ name, course, date }) {
  const certificateRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", -10, 0, pdfWidth + 20, pdfHeight);
    pdf.save(`certificate-${name}.pdf`);
  };

  return (
    <div>
      <div ref={certificateRef} style={styles.container}>
        <div style={styles.logoRow}>
          <img
            src="/assets/aadishaktipng.png"
            alt="Logo 1"
            style={styles.logo}
          />
          <img
            src="/assets/Adishakti TEXT logo.png"
            alt="Logo 2"
            style={styles.logo}
          />
        </div>

        <h1 style={styles.title}>Certificate of Completion</h1>
        <p style={styles.text}>
          This is to certify that <strong>{name}</strong>
        </p>
        <p style={styles.text}>
          has successfully completed the course <strong>{course}</strong>
        </p>
        <p style={styles.text}>
          on <strong>{date}</strong>
        </p>
        <p style={styles.footer}>Congratulations!</p>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleDownload} style={styles.button}>
          Download as PDF
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    border: "2px solid #000",
    padding: "30px",
    width: "1120px",
    margin: "100px auto",
    textAlign: "center",
    fontFamily: "serif",
    backgroundColor: "#fdf6e3",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    position: "relative",

    // Add these lines 👇
    height: "auto",
    maxHeight: "600px",
    overflow: "hidden",
  },
  logo: {
    height: "80px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.25rem",
    margin: "10px 0",
  },
  footer: {
    marginTop: "30px",
    fontSize: "1.2rem",
    fontStyle: "italic",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    marginBottom: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px", // spacing between logos
    marginBottom: "20px",
  },
};

export default Certificate;
