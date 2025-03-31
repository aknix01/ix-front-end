import React from 'react'

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currrentPage }) {

    let pages = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }


    return (
       
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }} >

                            <button
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    fontSize: "20px",
                                    backgroundColor: "#FF5733",
                                    border: "1px solid white",
                                    cursor: currrentPage === 1 ? "not-allowed" : "pointer",
                                    opacity: currrentPage === 1 ? 0.5 : 1,
                                }}
                                disabled={currrentPage === 1}
                                onClick={() => setCurrentPage(currrentPage - 1)}
                            >
                                Prev
                            </button>

                            {pages.map((page, index) => (
                                <button
                                    key={index}
                                    style={{
                                        padding: "10px",
                                        borderRadius: "5px",
                                        fontSize: "20px",
                                        backgroundColor: currrentPage === page ? "#FFD700" : "#BFD641",
                                        border: "1px solid white",
                                        fontWeight: currrentPage === page ? "bold" : "normal",
                                    }}
                                    className="mx-3"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    fontSize: "20px",
                                    backgroundColor: "#FF5733",
                                    border: "1px solid white",
                                    cursor: currrentPage === totalPages ? "not-allowed" : "pointer",
                                    opacity: currrentPage === totalPages ? 0.5 : 1,
                                }}
                                disabled={currrentPage === totalPages}
                                onClick={() => setCurrentPage(currrentPage + 1)}
                            >
                                Next
                            </button>

                        </div>

                    )
                }
 

export default Pagination