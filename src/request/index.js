// const baseURL = import.meta.env.VITE_BASE_URL;

// export async function getInvoices(route = "/invoices",  query = '') {

//     const req = await fetch(baseURL + route + query ? `?status= ${query}` : '');

//     if(req.status === 200){
//         const result = await req.json()
//         return result.data
//     }
//     else{
//         throw new Error("Something went wrong")
//     }

// }

// export async function getInvoices(id) {

//     const req = await fetch(baseURL + `/${id}`);

//     if(req.status === 200){
//         const result = await req.json()
//         return result;
//     }
//     else{
//         throw new Error("Something went wrong")
//     }

// }

// export async function deleteById(id) {

//     const req = await fetch(baseURL + `/${id}`, {
//         method: "DELETE",
//     });

//     if(req.status === 200){
//         return "success";
//     }
//     else{
//         throw new Error("Something went wrong")
//     }

// }

// export async function updateById(id, newData) {

//     const req = await fetch(baseURL + `/${id}`, {
//         method: "PATCH",
//         body: JSON.stringify(newData)
//     });

//     if(req.status === 200){
//         const result = req.json()
//         return result;
//     }
//     else{
//         throw new Error("Something went wrong")
//     }

// }

// export async function addInvoice(data) {

//     const req = await fetch(baseURL + `/${id}`, {
//         method: "POST",
//         body: JSON.stringify(data)
//     });

//     if(req.status === 200){
//         const result = req.json()
//         return result;
//     }
//     else{
//         throw new Error("Something went wrong")
//     }

// }





const baseURL = import.meta.env.VITE_BASE_URL;

// All by id
export async function getInvoices(route = "/invoices", query = '') {
    const url = baseURL + route + (query ? `?status=${query}` : '');
    const req = await fetch(url);


    if (req.status === 200) {
        const result = await req.json();
        return result.data;
    } else {
        throw new Error("Something went wrong");
    }
}

// Get By id
export async function getInvoiceById(route = '/invoices', id) {
    const req = await fetch(`route + ${baseURL}/invoices/${id}`);

    if (req.status === 200) {
        const result = await req.json();
        return result;
    } else {
        throw new Error("Something went wrong");
    }
}

 // Delete by id
export async function deleteById(id) {
    const req = await fetch(`${baseURL}/invoices/${id}`, {
        method: "DELETE",
    });

    if (req.status === 200) {
        return "success";
    } else {
        throw new Error("Something went wrong");
    }
}

// Update By Id
export async function updateById(id, newData) {
    const req = await fetch(`${baseURL}/invoices/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
    });

    if (req.status === 200) {
        const result = await req.json();
        return result;
    } else {
        throw new Error("Something went wrong");
    }
}

// Add By id
export async function addInvoice(data) {
    const req = await fetch(`${baseURL}/invoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (req.status === 200 || req.status === 201) {
        const result = await req.json();
        return result;
    } else {
        throw new Error("Something went wrong");
    }
}
