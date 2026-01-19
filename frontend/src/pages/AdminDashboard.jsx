import React, { useEffect, useMemo, useState } from "react";
import { useProductContext } from "../context/productContext";
import FormatPrice from "../Helpers/FormatPrice";

const AdminDashboard = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    addProductsBulk,
  } = useProductContext();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("adminUsers") || "[]");
    } catch {
      return [];
    }
  });
  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("billingTransactions") || "[]");
    } catch {
      return [];
    }
  });
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
    name: "",
    email: "",
    role: "customer",
    status: "active",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [transactionForm, setTransactionForm] = useState({
    id: "",
    date: "",
    userId: "",
    total: "",
    status: "paid",
    note: "",
  });

  const categories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [products]);

  const prices = useMemo(() => {
    return [...products].map((p) => p.price).sort((a, b) => a - b);
  }, [products]);

  const saveUsers = (next) => {
    setUsers(next);
    localStorage.setItem("adminUsers", JSON.stringify(next));
  };

  const saveTransactions = (next) => {
    setTransactions(next);
    localStorage.setItem("billingTransactions", JSON.stringify(next));
  };

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalUsers = users.length;
    const totalStock = products.reduce((s, p) => s + (Number(p.stock) || 0), 0);
    const inventoryValue = products.reduce(
      (s, p) => s + (Number(p.stock) || 0) * (Number(p.price) || 0),
      0
    );
    const totalRevenue = transactions.reduce(
      (s, t) => s + (Number(t.total) || 0),
      0
    );
    return {
      totalProducts,
      totalUsers,
      totalStock,
      inventoryValue,
      totalRevenue,
    };
  }, [products, users, transactions]);

  const barData = Object.entries(categories);
  const maxBar = Math.max(...barData.map(([, c]) => c), 1);

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
    const parsed = {
      id: productForm.id || String(Date.now()),
      name: productForm.name.trim(),
      category: productForm.category.trim(),
      company: productForm.company.trim(),
      price: Number(productForm.price),
      stock: Number(productForm.stock || 0),
      colors: productForm.colors
        ? productForm.colors
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        : [],
      image: productForm.image.trim(),
      featured: !!productForm.featured,
    };
    if (editingProductId) {
      updateProduct(editingProductId, parsed)
        .then(() =>
          setAdminMsg({
            type: "success",
            text: "Product updated successfully.",
          })
        )
        .catch((e) =>
          setAdminMsg({
            type: "error",
            text:
              e?.response?.data?.error ||
              e?.response?.data?.message ||
              "Failed to update product.",
          })
        );
    } else {
      addProduct(parsed)
        .then(() =>
          setAdminMsg({ type: "success", text: "Product added successfully." })
        )
        .catch((e) =>
          setAdminMsg({
            type: "error",
            text:
              e?.response?.data?.error ||
              e?.response?.data?.message ||
              "Failed to add product.",
          })
        );
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
      featured: false,
    });
    setEditingProductId(null);
    setActiveTab("products");
  };

  const adjustStock = (id, stock) => {
    const value = Number(stock);
    updateProduct(id, { stock: value });
  };

  const beginEditUser = (u) => {
    setEditingUserId(u.id);
    setUserForm({
      id: u.id,
      name: u.name || "",
      email: u.email || "",
      role: u.role || "customer",
      status: u.status || "active",
    });
    setActiveTab("users");
  };

  const submitUser = () => {
    const parsed = {
      id: userForm.id || String(Date.now()),
      name: userForm.name.trim(),
      email: userForm.email.trim(),
      role: userForm.role,
      status: userForm.status,
    };
    if (editingUserId) {
      saveUsers(
        users.map((u) => (u.id === editingUserId ? { ...u, ...parsed } : u))
      );
    } else {
      saveUsers([{ ...parsed }, ...users]);
    }
    setEditingUserId(null);
    setUserForm({
      id: "",
      name: "",
      email: "",
      role: "customer",
      status: "active",
    });
    setActiveTab("users");
  };

  const deleteUser = (id) => {
    saveUsers(users.filter((u) => u.id !== id));
    setAdminMsg({ type: "success", text: "User deleted." });
  };

  const submitTransaction = () => {
    const parsed = {
      id: transactionForm.id || String(Date.now()),
      date: transactionForm.date || new Date().toISOString().slice(0, 10),
      userId: transactionForm.userId,
      total: Number(transactionForm.total),
      status: transactionForm.status,
      note: transactionForm.note || "",
    };
    const next = [{ ...parsed }, ...transactions];
    saveTransactions(next);
    setTransactionForm({
      id: "",
      date: "",
      userId: "",
      total: "",
      status: "paid",
      note: "",
    });
    setActiveTab("billing");
  };

  useEffect(() => {
    if (!transactionForm.date) {
      setTransactionForm((f) => ({
        ...f,
        date: new Date().toISOString().slice(0, 10),
      }));
    }
  }, []);

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
                className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer text-left transition-colors ${activeTab === "inventory" ? "!bg-[#6254F3] !text-white !border-[#6254F3]" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveTab("inventory")}
              >
                Inventory
              </button>
              <button
                className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer text-left transition-colors ${activeTab === "billing" ? "!bg-[#6254F3] !text-white !border-[#6254F3]" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveTab("billing")}
              >
                Billing
              </button>
              <button
                className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white py-[0.8rem] px-[1.2rem] rounded-[0.6rem] cursor-pointer text-left transition-colors ${activeTab === "analytics" ? "!bg-[#6254F3] !text-white !border-[#6254F3]" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
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
                    <div className="text-[1.4rem] opacity-80 mb-[0.6rem] text-[#1d1d1d] dark:text-white">Total Stock</div>
                    <div className="text-[2rem] font-semibold text-[#1d1d1d] dark:text-white">{metrics.totalStock}</div>
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
                        <tr key={p.id} className="text-[#1d1d1d] dark:text-white">
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.name}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.category}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.company}</td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">
                            <FormatPrice price={p.price} />
                          </td>
                          <td className="p-[1rem] border-b border-gray-200 dark:border-gray-700 text-[1.4rem]">{p.stock ?? 0}</td>
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
                <div className="grid grid-cols-3 gap-[1rem] mt-[1rem] max-md:grid-cols-1">
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="product-name" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Name</label>
                    <input
                      id="product-name"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="product-category" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Category</label>
                    <input
                      id="product-category"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="product-company" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Company</label>
                    <input
                      id="product-company"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.company}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="product-price" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Price</label>
                    <input
                      id="product-price"
                      type="number"
                      min="0"
                      step="1"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-[0.4rem]">
                    <label htmlFor="product-stock" className="text-[#1d1d1d] dark:text-white text-[1.4rem]">Stock</label>
                    <input
                      id="product-stock"
                      type="number"
                      min="0"
                      step="1"
                      className="p-[0.6rem] border border-gray-200 dark:border-gray-700 rounded-[0.6rem] bg-white dark:bg-gray-800 text-[#1d1d1d] dark:text-white"
                      value={productForm.stock}
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
