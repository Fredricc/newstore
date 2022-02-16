import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs, setDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";

function AdminPage(props) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    try {
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  const editHandler = (item) => {
    setProduct(item);

    setShow(true);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      setLoading(false);
      handleClose();
      toast.success("Product updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product updated failed");
      setLoading(false);
    }
  };

  
  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const deleteProduct=async(item)=>{
    try {
      setLoading(true)
      await deleteDoc(doc(fireDB , "products", item.id));
      setLoading(false)
      window.location.reload();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Product delete failed");
      setLoading(false)
    }
  }

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      setLoading(false);
      handleClose();
      toast.success("Product add successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product add failed");
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="products" title="Products">
    <div className="d-flex justify-content-between mx-2">
        <h3>Products List</h3>
        <button onClick={addHandler}>Add Product</button>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash color="red" size={20} onClick={()=>deleteProduct(item)}/>
                  <FaEdit
                    onClick={() => editHandler(item)}
                    color="blue"
                    size={20}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {add === true ? "Add a product" : "Edit product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>Product Details</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={product.name}
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value });
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="image url"
              value={product.imageURL}
              onChange={(e) => {
                setProduct({ ...product, imageURL: e.target.value });
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="price"
              value={product.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
            />
            <input
              type="text"
              value={product.category}
              className="form-control"
              placeholder="category"
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
            />
            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          {add ? (
            <button onClick={addProduct}>Save</button>
          ) : (
            <button onClick={updateProduct}>Save</button>
          )}
        </Modal.Footer>
      </Modal>
  </Tab>
  <Tab eventKey="orders" title="Orders">
  <h1>Orders</h1>
  {orders.map((order) => {
          return(
        <table className="table mt-3 order">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.cartItems.map((item) => {
              return (
                <tr>
                  <td>
                    <img src={item.imageURL} height="80" width="80" alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )
      })}
  </Tab>
  <Tab eventKey="contact" title="Contact">
  <h1>Contacts</h1>
    
  </Tab>
</Tabs>

    </Layout>
  );
}

export default AdminPage;
