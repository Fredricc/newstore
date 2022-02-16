import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { fireproducts } from '../newstore-products';
function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const { cartItems } = useSelector(state => state.cartReducer);
  const [searchKey , setSearchKey] = useState('')
  const [filterType , setFilterType] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true)
    try {
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false)
      });

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));
  }, [cartItems])

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product});
  };

  //   function addProductsData() {
  //     fireproducts.map(async(product) =>{
  //         try {
  //             await addDoc(collection(fireDB, "products"), product);
  //         } catch (error) {
  //           console.log(error);
  //         }
  //     } )
  //   }

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex flex-row w-50 align-item-center my-3 justify-content-center">
          <input type="text" 
          value = {searchKey}
          onChange={(e) => {setSearchKey(e.target.value)}}
          className="form-control mx-2" placeholder="Search Items" />
          <select name="" id="" className="form-control mt-3" value = {filterType}
          onChange={(e) => {setFilterType(e.target.value)}}>
            <option value="">All</option>
            <option value="electronics">Electronic</option>
            <option value="fashion">Fashion</option>
            <option value="mobile">Mobile Phones</option>
            <option value="mobile-accessories">Mobile Phone Accessories</option>
            <option value="tools">Tools</option>
            <option value="car-accessories">Car Accessories</option>
          </select>
        </div>
        <div className="row">
          {products.filter(obj=>obj.name.toLowerCase().includes(searchKey)).filter(obj=>obj.category.toLowerCase().includes(filterType)).map((product) => {
            return (
              <div className="col-md-4">
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <p>{product.name}</p>
                    <div className="text-center">
                      <img
                        src={product.imageURL}
                        alt=""
                        className="product-img"
                      />
                    </div>
                  </div>
                  <div className="product-actions">
                    <h2>KES-{product.price}</h2>
                    <div className="d-flex">
                      <button
                        className="mx-2"
                        onClick={()=> addToCart(product)}>
                        ADD TO CART
                      </button>
                      <button
                        className="mx-2"
                        onClick={() => {
                          navigate(`/productinfo/${product.id}`);
                        }}
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>{" "}
      {/* <button onClick={addProductsData}>Add data to firebase</button> */}
    </Layout>
  );
}
export default Homepage;
