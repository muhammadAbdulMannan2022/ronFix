


import { useState } from "react";
import { useGetPdfsQuery } from "../../redux/features/baseApi";
import { FaRegEye } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;
const baseURL = "http://rongever.duckdns.org";

const VAForm = () => {
  const { data: pdfs } = useGetPdfsQuery();
  console.log("PDFs Data:", pdfs);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedPdf, setSelectedPdf] = useState(null);  

  if (!pdfs) {
    return (
      <div className="h-screen  py-20 flex flex-col items-center justify-center mx-auto">
        <h2 className="text-3xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  const totalPages = Math.ceil(pdfs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = pdfs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModal = (pdf) => {
    setSelectedPdf(pdf);  
    setIsModalOpen(true);  
  };

  const closeModal = () => {
    setIsModalOpen(false);  
    setSelectedPdf(null);   
  };

  return (
    <div className="min-h-screen py-20 pt-32  px-4 flex flex-col items-center mx-auto w-full">
      <h2 className="text-4xl font-semibold mb-6 text-gray-800">VA Form PDFs</h2>

      <div className="overflow-x-auto w-full md:max-w-7xl">
        <table className="table table-zebra w-full shadow-sm rounded-lg border border-gray-200">
          <thead className="bg-[#0B2A52]  text-white">
            <tr>
              <th className="py-2 px-4 text-lg font-semibold">#</th>
              <th className="py-2 px-4 text-lg font-semibold">Submitted By</th>
              <th className="py-2 px-4 text-lg font-semibold">Submission Date</th>
              <th className="py-2 px-4 text-lg font-semibold">Status</th>
              <th className="py-2 px-4 text-lg font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((pdf, index) => (
              <tr
                key={pdf.id || index}
                className="hover:bg-indigo-50 cursor-pointer transition-all"
              >
                <td className="py-3 px-4">{startIndex + index + 1}</td>
                <td className="py-3 px-4">{pdf?.user?.user_profile?.name || "Unnamed "}</td>
                <td className="py-3 px-4">
                  {new Date(pdf?.submission_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </td>
                <td className="py-3 px-4 capitalize">{pdf?.status}</td>
                <td className="py-3 px-4 flex items-center gap-2 text-indigo-600">
                  <FaRegEye className="text-lg" />
                  <span
                    className="text-md cursor-pointer"
                    onClick={() => openModal(pdf)}  
                  >
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-md rounded-lg py-1 px-4"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            « Prev
          </button>
          <span className="text-lg text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-md rounded-lg py-1 px-4"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next »
          </button>
        </div>
      </div>

      {/* DaisyUI Modal */}
      {isModalOpen && selectedPdf && (
        <div className="modal modal-open">
          <div className="w-[900px] bg-white p-5 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">PDF Details</h3>

            {/* Table to show document details in the modal */}
            <table className="table w-full mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2">Document Type</th>
                  <th className="text-left p-2">VA Form</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedPdf.documents && selectedPdf.documents.map((doc, index) => (
                  <tr key={doc.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="p-2">{doc.document_type}</td>
                    <td className="p-2">{doc.va_form}</td>
                    <td className="p-2">
                      <a
                        href={`${baseURL}${doc.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 mr-2"
                      >
                        View PDF
                      </a>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-action">
              <button
                className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VAForm;
