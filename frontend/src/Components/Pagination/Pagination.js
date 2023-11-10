import React from "react";

const Pagination = () => {
  return (
    <div>
      <div className="container row-12">
        <div className="col-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center mt-5">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabindex="-1">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
