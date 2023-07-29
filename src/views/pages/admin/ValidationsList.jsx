import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import dayjs from "dayjs";
import Pagination from "react-js-pagination/src/components/Pagination.js";

function ValidationsList() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handlePageChange(1);
  }, []);

  const handlePageChange = (pageNumber) => {
    setLoading(true); // show loading message

    axiosClient.get(`/iban/list?page=${pageNumber}`)
      .then(({data}) => {
        setLoading(false); // hide loading message
        setPageData(data); // load table data
      }).catch(error => {
        console.log(error);
        setPageData(null);
    });
  };

  return (
    <main className="container p-5">
      <h1>Validated Codes List</h1>

      <table className="table table-bordered table-hover table-striped">
        <thead>
        <tr>
          <th>User</th>
          <th>IBAN</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {loading && (<tr>
          <td colSpan={3} className="text-center">Loading data, please wait..</td>
        </tr>)}

        {!loading && pageData.data.map((row)=> {
            return(
              <tr key={row.id}>
                <td>{row.user.name}</td>
                <td>{row.iban}</td>
                <td>{dayjs(row.created_at).format('YYYY-MM-DD hh:mm A')}</td>
              </tr>
            )
          })}

        {(!loading && pageData.data.length === 0) && (<tr>
          <td colSpan={3} className="text-center">No validation results available.</td>
        </tr>)}

        </tbody>
      </table>

      {pageData && (
        <Pagination
          activePage={pageData.meta.current_page}
          itemsCountPerPage={pageData.meta.per_page}
          totalItemsCount={pageData.meta.total}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          activeClass='active'
          itemClass='page-item'
          linkClass='page-link'
        />
        // <p>{`Displaying ${pageData.current_page} of ${pageData.total}`}</p>
      ) }
    </main>
  );
}

export default ValidationsList;
