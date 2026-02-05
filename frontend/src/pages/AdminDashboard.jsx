import React, { useEffect, useMemo, useState } from "react";
import { useProductContext } from "../context/productContext";
import FormatPrice from "../Helpers/FormatPrice";
import userService from "../services/user";
import orderService from "../services/order";
import { toast } from "react-toastify";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    addProductsBulk,
  } = useProductContext();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    category: "",
    company: "",
    price: "",
    stock: "",
    colors: "",
    image: "",
    featured: false,
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [bulkJson, setBulkJson] = useState("");
  const [bulkDiscount, setBulkDiscount] = useState("");
  const [adminMsg, setAdminMsg] = useState({ type: "", text: "" });
  const [userForm, setUserForm] = useState({
    id: "",
    username: "",
    email: "",
    role: "user",
    status: "active",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [posCart, setPosCart] = useState([]);
  const [posSearch, setPosSearch] = useState("");
  const [posPaymentMethod, setPosPaymentMethod] = useState("cash");

  // Initialize services with token
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.accessToken) {
      userService.setToken(loggedInUser.accessToken);
      orderService.setToken(loggedInUser.accessToken);
    }
  }, []);

  // Fetch data on mount and tab change
  useEffect(() => {
    if (activeTab === "users" || activeTab === "dashboard") {
      userService
        .getAllUsers()
        .then((data) => setUsers(data))
        .catch((err) => console.error("Failed to fetch users", err));
    }
    if (activeTab === "orders" || activeTab === "dashboard") {
      orderService
        .getAllOrders()
        .then((data) => setOrders(data))
        .catch((err) => console.error("Failed to fetch orders", err));
    }
  }, [activeTab]);

  const categories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [products]);

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalStock = products.reduce((s, p) => s + (Number(p.stock) || 0), 0);
    const inventoryValue = products.reduce(
      (s, p) => s + (Number(p.stock) || 0) * (Number(p.price) || 0),
      0
    );
    const totalRevenue = orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((s, o) => s + (Number(o.amount) || 0), 0);
      
    return {
      totalProducts,
      totalUsers,
      totalStock,
      inventoryValue,
      totalRevenue,
      totalOrders
    };
  }, [products, users, orders]);

  const beginEditProduct = (p) => {
    setEditingProductId(p.id);
    setProductForm({
      id: p.id,
      name: p.name || "",
      category: p.category || "",
      company: p.company || "",
      price: String(p.price ?? ""),
      stock: String(p.stock ?? ""),
      colors: Array.isArray(p.colors)
        ? p.colors.join(",")
        : String(p.colors || ""),
      image: p.image || "",
      featured: !!p.featured,
    });
    setActiveTab("products");
  };

  const submitProduct = () => {
    // Construct FormData
    const formData = new FormData();
    formData.append("name", productForm.name.trim());
    formData.append("category", productForm.category.trim());
    formData.append("company", productForm.company.trim());
    formData.append("price", productForm.price);
    formData.append("stock", productForm.stock || 0);
    formData.append("featured", !!productForm.featured);
    
    // Colors
    const colorsArr = productForm.colors
      ? productForm.colors.split(",").map((c) => c.trim()).filter(Boolean)
      : [];
    colorsArr.forEach(c => formData.append("colors", c));

    // Image
    if (productForm.imageFile) {
      formData.append("image", productForm.imageFile);
    } else {
      formData.append("imageUrl", productForm.image.trim());
    }

    if (editingProductId) {
      updateProduct(editingProductId, formData)
        .then(() => {
          setAdminMsg({
            type: "success",
            text: "Product updated successfully.",
          });
          toast.success("Product updated successfully");
        })
        .catch((e) => {
          const msg = e?.response?.data?.error || e?.response?.data?.message || "Failed to update product.";
          setAdminMsg({
            type: "error",
            text: msg,
          });
          toast.error(msg);
        });
    } else {
      addProduct(formData)
        .then(() => {
          setAdminMsg({ type: "success", text: "Product added successfully." });
          toast.success("Product added successfully");
        })
        .catch((e) => {
          const msg = e?.response?.data?.error || e?.response?.data?.message || "Failed to add product.";
          setAdminMsg({
            type: "error",
            text: msg,
          });
          toast.error(msg);
        });
    }
    setProductForm({
      id: "",
      name: "",
      category: "",
      company: "",
      price: "",
      stock: "",
      colors: "",
      image: "",
      imageFile: null,
      featured: false,
    });
    setEditingProductId(null);
    setActiveTab("products");
  };

  const beginEditUser = (u) => {
    setEditingUserId(u.id);
    setUserForm({
      id: u.id,
      username: u.username || "",
      email: u.email || "",
      role: u.role || "user",
      status: u.status || "active",
    });
    setActiveTab("users");
  };

  const submitUser = () => {
    if (editingUserId) {
      userService
        .updateUser(editingUserId, {
          username: userForm.username,
          email: userForm.email,
          role: userForm.role,
        })
        .then((updatedUser) => {
          setUsers(users.map((u) => (u.id === editingUserId ? updatedUser : u)));
          toast.success("User updated successfully");
        })
        .catch((err) => {
          toast.error("Failed to update user");
          console.error(err);
        });
    } else {
      userService
        .createUser({
            username: userForm.username,
            email: userForm.email,
            password: "password123", // Default password
            role: userForm.role,
        })
        .then((newUser) => {
            setUsers([...users, newUser]);
            toast.success("User created successfully (Default pass: password123)");
        })
        .catch(err => {
            toast.error("Failed to create user");
            console.error(err);
        });
    }
    setEditingUserId(null);
    setUserForm({
      id: "",
      username: "",
      email: "",
      role: "user",
      status: "active",
    });
    setActiveTab("users");
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      userService
        .deleteUser(id)
        .then(() => {
          setUsers(users.filter((u) => u.id !== id));
          toast.success("User deleted successfully");
        })
        .catch((err) => {
            toast.error("Failed to delete user");
            console.error(err);
        });
    }
  };

  const handleOrderStatusUpdate = (orderId, status) => {
      orderService.updateOrderStatus(orderId, { status })
        .then((updatedOrder) => {
            setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
            toast.success("Order status updated");
        })
        .catch(err => toast.error("Failed to update order status"));
  };

  const handlePaymentStatusUpdate = (orderId, paymentStatus) => {
    orderService.updateOrderStatus(orderId, { paymentStatus })
      .then((updatedOrder) => {
          setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
          toast.success("Payment status updated");
      })
      .catch(err => toast.error("Failed to update payment status"));
  };

  const addToPosCart = (product) => {
    const existing = posCart.find((item) => item.id === product.id);
    if (existing) {
      if (existing.qty >= product.stock) {
        toast.error("Not enough stock");
        return;
      }
      setPosCart(
        posCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setPosCart([...posCart, { ...product, qty: 1 }]);
    }
  };

  const removeFromPosCart = (id) => {
    setPosCart(posCart.filter((item) => item.id !== id));
  };

  const updatePosQuantity = (id, delta) => {
    setPosCart(
      posCart.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          if (newQty < 1) return item;
          if (newQty > item.stock) {
            toast.error("Not enough stock");
            return item;
          }
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const handlePosCheckout = () => {
    if (posCart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    const totalAmount = posCart.reduce((acc, item) => acc + item.price * item.qty, 0);
    
    // Create order payload matching backend expectation
    const orderData = {
        cart: posCart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            amount: item.price, // price per item
            qty: item.qty,
            image: item.image,
            color: item.colors && item.colors.length > 0 ? item.colors[0] : "#000", // Default color
            stock: item.stock
        })),
        shipping_fee: 0,
        total_price: totalAmount,
        paymentMethod: posPaymentMethod
    };

    orderService.createOrder(orderData)
        .then((newOrder) => {
            toast.success(`Order created! ID: ${newOrder.id}`);
            setPosCart([]);
            setOrders([...orders, newOrder]);
        })
        .catch(err => {
            toast.error("Checkout failed");
            console.error(err);
        });
  };

  return (
    <section className="py-[9rem] bg-white dark:bg-gray-900">
      <div className="max-w-[120rem] mx-auto px-[3.2rem]">
        <div className="grid grid-cols-[24rem_1fr] gap-[2rem] max-md:grid-cols-1">
          <aside className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem] h-fit">
            <h2 className="mb-[1rem] text-[2rem] font-bold text-[#1d1d1d] dark:text-white">Admin</h2>
            <nav className="grid gap-[0.8rem]">
              <button
                className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer text-left transition-colors ${activeTab === "dashboard" ? "!bg-[#6254F3] !text-white !border-[#6254F3]" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer text-left transition-colors ${activeTab === "products" ? "!bg-[#6254F3] !text-white !border-[#6254F3]" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveTab("products")}
              >
                Products
              </button>
              <button
                className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer text-left transition-colors ${activeTab === "users" ? "!bg-[#6254F3] !text-white !border-[#6254F3]" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveTab("users")}
              >
                Users
              </button>
              <button
                className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer text-left transition-colors ${activeTab === "orders" ? "!bg-[#6254F3] !text-white !border-[#6254F3]" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </button>
              <button
                className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer text-left transition-colors ${activeTab === "pos" ? "!bg-[#6254F3] !text-white !border-[#6254F3]" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveTab("pos")}
              >
                POS System
              </button>
            </nav>
          </aside>
          <main className="min-h-[40rem]">
            {activeTab === "dashboard" && (
              <section>
                <h2 className="text-[2.4rem] font-bold text-[#1d1d1d] dark:text-white mb-[1rem]">Admin Dashboard</h2>
                <p className="mb-[2rem] text-[#1d1d1d] dark:text-gray-300 text-[1.6rem]">
                  Central control of products, users, inventory, and billing.
                </p>
                <div className="grid grid-cols-3 gap-[1.6rem] mt-[2rem] max-md:grid-cols-1">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[0.8rem] p-[1.6rem] shadow-sm">
                    <div className="text-[1.4rem] opacity-80 mb-[0.6rem] text-[#1d1d1d] dark:text-white">Total Products</div>
                    <div className="text-[2rem] font-semibold text-[#1d1d1d] dark:text-white">{metrics.totalProducts}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[0.8rem] p-[1.6rem] shadow-sm">
                    <div className="text-[1.4rem] opacity-80 mb-[0.6rem] text-[#1d1d1d] dark:text-white">Total Users</div>
                    <div className="text-[2rem] font-semibold text-[#1d1d1d] dark:text-white">{metrics.totalUsers}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[0.8rem] p-[1.6rem] shadow-sm">
                    <div className="text-[1.4rem] opacity-80 mb-[0.6rem] text-[#1d1d1d] dark:text-white">Total Orders</div>
                    <div className="text-[2rem] font-semibold text-[#1d1d1d] dark:text-white">{metrics.totalOrders}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[0.8rem] p-[1.6rem] shadow-sm">
                    <div className="text-[1.4rem] opacity-80 mb-[0.6rem] text-[#1d1d1d] dark:text-white">Inventory Value</div>
                    <div className="text-[2rem] font-semibold text-[#1d1d1d] dark:text-white">
                      <FormatPrice price={metrics.inventoryValue} />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[0.8rem] p-[1.6rem] shadow-sm">
                    <div className="text-[1.4rem] opacity-80 mb-[0.6rem] text-[#1d1d1d] dark:text-white">Total Revenue</div>
                    <div className="text-[2rem] font-semibold text-[#1d1d1d] dark:text-white">
                      <FormatPrice price={metrics.totalRevenue} />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "products" && (
              <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem]">
                <h3 className="text-[2rem] font-bold mb-[2rem] text-[#1d1d1d] dark:text-white">Products</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-[0.8rem] overflow-hidden">
                    <thead>
                      <tr>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Name</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Category</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Company</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Price</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Stock</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Featured</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className={`text-[#1d1d1d] dark:text-white ${p.stock < 10 ? 'bg-red-50 dark:bg-red-900/20' : ''}`}>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.name}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.category}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.company}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            <FormatPrice price={p.price} />
                          </td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            {p.stock ?? 0}
                            {p.stock < 10 && <span className="ml-2 text-red-500 text-xs font-bold">(Low)</span>}
                          </td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.featured ? "Yes" : "No"}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            <div className="inline-flex gap-[0.6rem] items-center">
                              <button
                                className="border-none bg-[#6254F3] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#5244e3] transition-colors"
                                onClick={() => beginEditProduct(p)}
                              >
                                Edit
                              </button>
                              <button
                                className="border-none bg-[#e74c3c] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#c0392b] transition-colors"
                                onClick={() => deleteProduct(p.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Product Form Inputs - kept simple for brevity */}
                <div className="grid grid-cols-3 gap-[1rem] mt-[1rem] max-md:grid-cols-1">
                  <div className="grid gap-[0.4rem]">
                    <label className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Name</label>
                    <input
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    />
                  </div>
                  {/* ... other inputs can remain or be improved ... */}
                  <div className="grid gap-[0.4rem]">
                      <label className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Price</label>
                      <input type="number" className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                  </div>
                  <div className="grid gap-[0.4rem]">
                      <label className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Stock</label>
                      <input type="number" className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-[1rem] mt-[1rem]">
                  <button onClick={submitProduct} className="bg-[#6254F3] text-white py-[0.8rem] px-[1.6rem] rounded-[0.6rem] hover:bg-[#5244e3]">
                    {editingProductId ? "Update Product" : "Add Product"}
                  </button>
                </div>
                {adminMsg.text && (
                    <div className={`mt-4 p-4 rounded ${adminMsg.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {adminMsg.text}
                    </div>
                )}
              </section>
            )}

            {activeTab === "users" && (
              <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem]">
                <h3 className="text-[2rem] font-bold mb-[2rem] text-[#1d1d1d] dark:text-white">Users</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-[0.8rem] overflow-hidden">
                    <thead>
                      <tr>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Name</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Email</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Role</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="text-[#1d1d1d] dark:text-white">
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{u.username}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{u.email}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{u.role}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            <div className="inline-flex gap-[0.6rem] items-center">
                              <button
                                className="border-none bg-[#6254F3] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#5244e3] transition-colors"
                                onClick={() => beginEditUser(u)}
                              >
                                Edit
                              </button>
                              <button
                                className="border-none bg-[#e74c3c] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#c0392b] transition-colors"
                                onClick={() => deleteUser(u.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-3 gap-[1rem] mt-[1rem] max-md:grid-cols-1">
                  <div className="grid gap-[0.4rem]">
                    <label className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Username</label>
                    <input
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={userForm.username}
                      onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Email</label>
                    <input
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={userForm.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Role</label>
                    <select
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={userForm.role}
                      onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="mt-[1rem]">
                  <button onClick={submitUser} className="bg-[#6254F3] text-white py-[0.8rem] px-[1.6rem] rounded-[0.6rem] hover:bg-[#5244e3]">
                    {editingUserId ? "Update User" : "Add User"}
                  </button>
                </div>
              </section>
            )}

            {activeTab === "orders" && (
                <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem]">
                <h3 className="text-[2rem] font-bold mb-[2rem] text-[#1d1d1d] dark:text-white">Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-[0.8rem] overflow-hidden">
                    <thead>
                      <tr>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">ID</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Date</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Total</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Payment</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Status</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="text-[#1d1d1d] dark:text-white">
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{o.id}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            <FormatPrice price={o.amount} />
                          </td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                              <select 
                                value={o.paymentStatus} 
                                onChange={(e) => handlePaymentStatusUpdate(o.id, e.target.value)}
                                className="bg-transparent border border-gray-300 rounded p-1"
                              >
                                  <option value="pending">Pending</option>
                                  <option value="paid">Paid</option>
                                  <option value="failed">Failed</option>
                              </select>
                          </td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                              <select 
                                value={o.status} 
                                onChange={(e) => handleOrderStatusUpdate(o.id, e.target.value)}
                                className="bg-transparent border border-gray-300 rounded p-1"
                              >
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                              </select>
                          </td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            {/* View Details Button could go here */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === "pos" && (
                <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem] h-[600px] flex gap-[2rem]">
                    {/* Product List */}
                    <div className="flex-1 flex flex-col">
                        <input 
                            type="text" 
                            placeholder="Search Products..." 
                            className="p-[1rem] border border-gray-300 rounded mb-[1rem] text-[1.6rem]"
                            value={posSearch}
                            onChange={(e) => setPosSearch(e.target.value)}
                        />
                        <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-[1rem] auto-rows-min">
                            {products
                                .filter(p => p.name.toLowerCase().includes(posSearch.toLowerCase()))
                                .map(p => (
                                <div key={p.id} className="border p-[1rem] rounded flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => addToPosCart(p)}>
                                    <img src={p.image} alt={p.name} className="w-[8rem] h-[8rem] object-contain mb-[0.5rem]" />
                                    <div className="font-bold text-[1.4rem] text-center">{p.name}</div>
                                    <div className="text-[1.2rem] text-gray-500"><FormatPrice price={p.price} /></div>
                                    <div className="text-[1rem] text-gray-400">Stock: {p.stock}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div className="w-[350px] border-l pl-[2rem] flex flex-col">
                        <h3 className="text-[2rem] font-bold mb-[1rem] flex items-center gap-[1rem]">
                            <FaShoppingCart /> Current Sale
                        </h3>
                        <div className="flex-1 overflow-y-auto mb-[1rem]">
                            {posCart.length === 0 ? (
                                <div className="text-center text-gray-400 mt-[5rem] text-[1.6rem]">Cart is empty</div>
                            ) : (
                                posCart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center mb-[1rem] border-b pb-[0.5rem]">
                                        <div className="flex-1">
                                            <div className="font-bold text-[1.4rem]">{item.name}</div>
                                            <div className="text-[1.2rem]"><FormatPrice price={item.price} /> x {item.qty}</div>
                                        </div>
                                        <div className="flex items-center gap-[0.5rem]">
                                            <button onClick={() => updatePosQuantity(item.id, -1)} className="p-[0.5rem] bg-gray-200 rounded hover:bg-gray-300"><FaMinus /></button>
                                            <span className="text-[1.4rem] w-[2rem] text-center">{item.qty}</span>
                                            <button onClick={() => updatePosQuantity(item.id, 1)} className="p-[0.5rem] bg-gray-200 rounded hover:bg-gray-300"><FaPlus /></button>
                                            <button onClick={() => removeFromPosCart(item.id)} className="p-[0.5rem] text-red-500 hover:text-red-700 ml-[0.5rem]"><FaTrash /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <div className="border-t pt-[1rem]">
                            <div className="flex justify-between text-[1.8rem] font-bold mb-[1rem]">
                                <span>Total:</span>
                                <span><FormatPrice price={posCart.reduce((acc, item) => acc + item.price * item.qty, 0)} /></span>
                            </div>
                            
                            <div className="mb-[1rem]">
                                <label className="block text-[1.4rem] mb-[0.5rem]">Payment Method</label>
                                <select 
                                    className="w-full p-[0.8rem] border rounded text-[1.4rem]"
                                    value={posPaymentMethod}
                                    onChange={(e) => setPosPaymentMethod(e.target.value)}
                                >
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="esewa">eSewa</option>
                                    <option value="khalti">Khalti</option>
                                    <option value="connectips">ConnectIPS</option>
                                </select>
                            </div>

                            <button 
                                className="w-full bg-[#6254F3] text-white py-[1rem] rounded-[0.5rem] text-[1.6rem] font-bold hover:bg-[#5244e3] disabled:opacity-50"
                                onClick={handlePosCheckout}
                                disabled={posCart.length === 0}
                            >
                                Complete Sale
                            </button>
                        </div>
                    </div>
                </section>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stock: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="product-colors" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Colors (comma)</label>
                    <input
                      id="product-colors"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.colors}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          colors: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="product-image" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Image URL</label>
                    <input
                      id="product-image"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.image}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          image: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="product-featured" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Featured</label>
                    <select
                      id="product-featured"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.featured ? "yes" : "no"}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          featured: e.target.value === "yes",
                        })
                      }
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
                <div className="mt-[1rem] flex justify-end">
                  <button className="border-none bg-[#6254F3] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#5244e3] transition-colors" onClick={submitProduct}>
                    {editingProductId ? "Update Product" : "Add Product"}
                  </button>
                </div>
                {adminMsg.text ? (
                  <div className={`mt-[1.2rem] mb-[1.2rem] p-[1rem] px-[1.2rem] rounded-[8px] text-[1.4rem] border ${adminMsg.type === "success" ? "bg-[#e8f8f2] text-[#0f5132] border-[#b7e4d7]" : "bg-[#fdecea] text-[#842029] border-[#f5c2c7]"}`}>{adminMsg.text}</div>
                ) : null}
                <h4 className="mt-[2rem] text-[#1d1d1d] dark:text-white font-bold text-[1.6rem]">Bulk Import</h4>
                <div className="grid grid-cols-3 gap-[1rem] mt-[1rem] max-md:grid-cols-1">
                  <div
                    className="grid gap-[0.4rem] col-span-2 max-md:col-span-1"
                  >
                    <label htmlFor="bulk-json" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Products JSON</label>
                    <textarea
                      id="bulk-json"
                      rows="6"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white w-full"
                      value={bulkJson}
                      onChange={(e) => setBulkJson(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="bulk-discount" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Default Discount %</label>
                    <input
                      id="bulk-discount"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={bulkDiscount}
                      onChange={(e) => setBulkDiscount(e.target.value)}
                    />
                  </div>
                    <label htmlFor="bulk-discount" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Default Discount %</label>
                    <input
                      id="bulk-discount"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={bulkDiscount}
                      onChange={(e) => setBulkDiscount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-[1rem] flex justify-end">
                  <button
                    className="border-none bg-[#6254F3] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#5244e3] transition-colors"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(bulkJson || "[]");
                        if (Array.isArray(parsed) && parsed.length > 0) {
                          addProductsBulk(parsed, Number(bulkDiscount) || 0)
                            .then(() => {
                              setBulkJson("");
                              setBulkDiscount("");
                              setAdminMsg({
                                type: "success",
                                text: "Bulk import completed.",
                              });
                            })
                            .catch((e) =>
                              setAdminMsg({
                                type: "error",
                                text:
                                  e?.response?.data?.error ||
                                  e?.response?.data?.message ||
                                  "Bulk import failed.",
                              })
                            );
                        }
                      } catch (e) {
                        setBulkJson(bulkJson);
                        setAdminMsg({
                          type: "error",
                          text: "Invalid JSON. Please paste a valid products array.",
                        });
                      }
                    }}
                  >
                    Import Products
                  </button>
                </div>
              </section>
            )}

            {activeTab === "users" && (
              <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem]">
                <h3 className="text-[2rem] font-bold mb-[2rem] text-[#1d1d1d] dark:text-white">Users</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-[0.8rem] overflow-hidden">
                    <thead>
                      <tr>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Name</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Email</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Role</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Status</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="text-[#1d1d1d] dark:text-white">
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{u.name}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{u.email}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{u.role}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{u.status}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            <div className="inline-flex gap-[0.6rem] items-center">
                              <button
                                className="border-none bg-[#6254F3] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#5244e3] transition-colors"
                                onClick={() => beginEditUser(u)}
                              >
                                Edit
                              </button>
                              <button
                                className="border-none bg-[#e74c3c] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#c0392b] transition-colors"
                                onClick={() => deleteUser(u.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-3 gap-[1rem] mt-[1rem] max-md:grid-cols-1">
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="user-name" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Name</label>
                    <input
                      id="user-name"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={userForm.name}
                      onChange={(e) =>
                        setUserForm({ ...userForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="user-email" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Email</label>
                    <input
                      id="user-email"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="user-role" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Role</label>
                    <select
                      id="user-role"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={userForm.role}
                      onChange={(e) =>
                        setUserForm({ ...userForm, role: e.target.value })
                      }
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="user-status" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Status</label>
                    <select
                      id="user-status"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={userForm.status}
                      onChange={(e) =>
                        setUserForm({ ...userForm, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>
                </div>
                <div className="mt-[1rem] flex justify-end">
                  <button className="border-none bg-[#6254F3] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#5244e3] transition-colors" onClick={submitUser}>
                    {editingUserId ? "Update User" : "Add User"}
                  </button>
                </div>
              </section>
            )}

            {activeTab === "inventory" && (
              <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem]">
                <h3 className="text-[2rem] font-bold mb-[2rem] text-[#1d1d1d] dark:text-white">Inventory Management</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-[0.8rem] overflow-hidden">
                    <thead>
                      <tr>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Product</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Stock</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Adjust</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="text-[#1d1d1d] dark:text-white">
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.name}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.stock ?? 0}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            <div className="inline-flex gap-[0.6rem] items-center">
                              <input
                                type="number"
                                className="w-[12rem] p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                                defaultValue={p.stock}
                                onBlur={(e) => adjustStock(p.id, e.target.value)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === "billing" && (
              <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem]">
                <h3 className="text-[2rem] font-bold mb-[2rem] text-[#1d1d1d] dark:text-white">Billing & Transactions</h3>
                <div className="overflow-x-auto mb-[2rem]">
                  <table className="w-full border-collapse rounded-[0.8rem] overflow-hidden">
                    <thead>
                      <tr>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Date</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">User ID</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Total</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Status</th>
                        <th className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem] bg-[#0a1435] text-white text-left">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t) => (
                        <tr key={t.id} className="text-[#1d1d1d] dark:text-white">
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{t.date}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{t.userId}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            <FormatPrice price={t.total} />
                          </td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{t.status}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{t.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h4 className="text-[#1d1d1d] dark:text-white font-bold text-[1.6rem] mb-[1rem]">New Transaction</h4>
                <div className="grid grid-cols-3 gap-[1rem] mt-[1rem] max-md:grid-cols-1">
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="billing-date" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Date</label>
                    <input
                      id="billing-date"
                      type="date"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={transactionForm.date}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="billing-user" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">User ID</label>
                    <input
                      id="billing-user"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={transactionForm.userId}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          userId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="billing-total" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Total</label>
                    <input
                      id="billing-total"
                      type="number"
                      min="0"
                      step="0.01"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={transactionForm.total}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          total: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="billing-status" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Status</label>
                    <select
                      id="billing-status"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={transactionForm.status}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="billing-note" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Note</label>
                    <input
                      id="billing-note"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={transactionForm.note}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          note: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-[1rem] flex justify-end">
                  <button className="border-none bg-[#6254F3] text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer hover:bg-[#5244e3] transition-colors" onClick={submitTransaction}>
                    Record Transaction
                  </button>
                </div>
              </section>
            )}

            {activeTab === "analytics" && (
              <section className="grid gap-[2rem]">
                <h3 className="text-[2rem] font-bold text-[#1d1d1d] dark:text-white">Analytics</h3>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem]">
                  <h4 className="text-[#1d1d1d] dark:text-white font-bold text-[1.6rem] mb-[0.6rem]">Products per Category</h4>
                  <svg width="100%" height="200" className="overflow-visible">
                    {barData.map(([label, count], i) => {
                      const barHeight = (count / maxBar) * 150;
                      const barWidth = 40;
                      const x = i * (barWidth + 20) + 10;
                      const y = 200 - barHeight;
                      return (
                        <g key={label}>
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill="#6254F3"
                            rx="4"
                          />
                          <text
                            x={x + barWidth / 2}
                            y={y - 5}
                            textAnchor="middle"
                            fill="#1d1d1d"
                            fontSize="12"
                            className="dark:fill-white"
                          >
                            {count}
                          </text>
                          <text
                            x={x + barWidth + 8}
                            y={y + 15}
                            fill="#666"
                            fontSize="12"
                            className="dark:fill-gray-400"
                            transform={`rotate(45, ${x + barWidth + 8}, ${y + 15})`}
                          >
                            {label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1rem] shadow-md p-[2rem]">
                  <h4 className="text-[#1d1d1d] dark:text-white font-bold text-[1.6rem] mb-[0.6rem]">Price Trend</h4>
                  <svg width="100%" height="160">
                    {prices.length > 1 &&
                      (() => {
                        const w = 340;
                        const h = 120;
                        const pad = 20;
                        const minP = prices[0];
                        const maxP = prices[prices.length - 1];
                        const scaleX = (i) =>
                          pad + (i / (prices.length - 1)) * (w - pad * 2);
                        const scaleY = (p) =>
                          h -
                          pad -
                          ((p - minP) / (maxP - minP || 1)) * (h - pad * 2);
                        const points = prices
                          .map((p, i) => `${scaleX(i)},${scaleY(p)}`)
                          .join(" ");
                        return (
                          <g>
                            <polyline
                              fill="none"
                              stroke="#25d366"
                              strokeWidth="2"
                              points={points}
                            />
                          </g>
                        );
                      })()}
                  </svg>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
