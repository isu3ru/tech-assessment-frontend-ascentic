import {useRef, useState} from "react";
import axiosClient from "../../../axios-client.js";

function Validator() {
  const ibanRef = useRef();
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setErrors(null);
    setMessage(null);

    const requestData = {
      iban: ibanRef.current.value,
    };

    axiosClient.post("/iban/validate", requestData)
      .then(({data}) => {
        setMessage(`${data.message} - IBAN: ${requestData.iban}`);
        ibanRef.current.value = ''; // clear field
        ibanRef.current.focus(); // focus field
      }).catch(error => {
      const response = error.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    });
  }

  return (
    <main className="container p-5">
      <div className="card mx-auto w-50">
        <div className="card-body">
          <h1 className="card-title mb-3 text-center">Validate IBAN Code</h1>

          {message && <div className="alert alert-success">
            {message}
          </div>}

          {errors && <div className="alert alert-danger">
            <ul className="m-0 list-unstyled">
              {Object.keys(errors).map(key => (
                <li key={key}>{errors[key][0]}</li>
              ))}
            </ul>
          </div>}

          <form>
            <div className="mb-3">
              <label htmlFor="iban" className="form-label">IBAN Code</label>
              <input type="text" className="form-control" id="iban"
                     placeholder="Enter your IBAN code here.." required ref={ibanRef}/>
            </div>
            <div className="mb-3">
              <button className="btn btn-success" onClick={onSubmitHandler}>Validate</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Validator
