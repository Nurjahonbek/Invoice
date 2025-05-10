import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInvoiceById } from '../request'

function Details() {
    const {id} = useParams()
    const [invoice, setInvoice] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      setLoading(true);
      getInvoiceById("/invoices", id)
        .then((res) => {
          setInvoice(res);
        })
        .catch(({ message }) => {
          setError(message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    if (loading) {
      return <p>loading...</p>
    }

    if (error) {
      return <p>{error}</p>;
    }

    getInvoiceById(id)


  return (
    <div>
        {JSON.stringify(invoice)}
    </div>
  )
}

export default Details
