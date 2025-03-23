import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                data.url === "" ||
                data.title === "" ||
                data.author === "" ||
                data.price === "" ||
                data.desc === "" ||
                data.language === ""
            ) {
                alert("All fields are required");
            } else {
                const response = await axios.put(
                  "https://book-store-three-iota.vercel.app/api/v1/books/update-book",
                  data,
                  { headers }
                );
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                });
                alert(response.data.message);
                navigate(`/book-details/${id}`);
            }
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                  `https://book-store-three-iota.vercel.app/api/v1/books/get-book-by-id/${id}`
                );
                setData(response.data.data);
            } catch (error) {
                console.log(error)
            };
        }
        fetch();
    }, []);

  return (
      <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              Update Book
          </h1>
          <div className="p-4 bg-zinc-800 rounded">
              <div>
                  <label htmlFor="" className="text-zinc-400">
                      Image
                  </label>
                  <input
                      type="text"
                      className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                      placeholder="url of image"
                      name="url"
                      required
                      value={data.url}
                      onChange={change}
                  />
              </div>
              <div className="mt-4">
                  <label htmlFor="" className="text-zinc-400">
                      Title of book
                  </label>
                  <input
                      type="text"
                      className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                      placeholder="title of book"
                      name="title"
                      required
                      value={data.title}
                      onChange={change}
                  />
              </div>
              <div className="mt-4">
                  <label htmlFor="" className="text-zinc-400">
                      Author of book
                  </label>
                  <input
                      type="text"
                      className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                      placeholder="author of book"
                      name="author"
                      required
                      value={data.author}
                      onChange={change}
                  />
              </div>
              <div className="mt-4 flex gap-4">
                  <div className="w-3/6">
                      <label htmlFor="" className="text-zinc-400">
                          Language
                      </label>
                      <input
                          type="text"
                          className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                          placeholder="language of book"
                          name="language"
                          required
                          value={data.language}
                          onChange={change}
                      />
                  </div>
                  <div className="w-3/6">
                      <label htmlFor="" className="text-zinc-400">
                          Price
                      </label>
                      <input
                          type="number"
                          className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                          placeholder="price of book"
                          name="price"
                          required
                          value={data.price}
                          onChange={change}
                      />
                  </div>
              </div>
              <div className="mt-4">
                  <label htmlFor="" className="text-zinc-400">
                      Description of book
                  </label>
                  <textarea
                      rows="5"
                      className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                      placeholder="description of book"
                      name="desc"
                      required
                      value={data.desc}
                      onChange={change}
                  />
              </div>
              <button
                  className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
                  onClick={submit}
              >
                  Update Book
              </button>
          </div>
      </div>
  )
}

export default UpdateBook
