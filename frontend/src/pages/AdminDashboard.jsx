import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
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
    <Wrapper>
      <div className="container">
        <div className="layout">
          <aside className="sidebar">
            <h2 className="brand">Admin</h2>
            <nav className="nav">
              <button
                className={activeTab === "dashboard" ? "active" : ""}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={activeTab === "products" ? "active" : ""}
                onClick={() => setActiveTab("products")}
              >
                Products
              </button>
              <button
                className={activeTab === "users" ? "active" : ""}
                onClick={() => setActiveTab("users")}
              >
                Users
              </button>
              <button
                className={activeTab === "inventory" ? "active" : ""}
                onClick={() => setActiveTab("inventory")}
              >
                Inventory
              </button>
              <button
                className={activeTab === "billing" ? "active" : ""}
                onClick={() => setActiveTab("billing")}
              >
                Billing
              </button>
              <button
                className={activeTab === "analytics" ? "active" : ""}
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
              </button>
            </nav>
          </aside>
          <main className="content">
            {activeTab === "dashboard" && (
              <section>
                <h2>Admin Dashboard</h2>
                <p className="subtitle">
                  Central control of products, users, inventory, and billing.
                </p>
                <div className="kpis">
                  <div className="kpi">
                    <div className="kpi-title">Total Products</div>
                    <div className="kpi-value">{metrics.totalProducts}</div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-title">Total Users</div>
                    <div className="kpi-value">{metrics.totalUsers}</div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-title">Total Stock</div>
                    <div className="kpi-value">{metrics.totalStock}</div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-title">Inventory Value</div>
                    <div className="kpi-value">
                      <FormatPrice price={metrics.inventoryValue} />
                    </div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-title">Total Revenue</div>
                    <div className="kpi-value">
                      <FormatPrice price={metrics.totalRevenue} />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "products" && (
              <section className="panel">
                <h3>Products</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Featured</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>{p.category}</td>
                          <td>{p.company}</td>
                          <td>
                            <FormatPrice price={p.price} />
                          </td>
                          <td>{p.stock ?? 0}</td>
                          <td>{p.featured ? "Yes" : "No"}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                className="btn"
                                onClick={() => beginEditProduct(p)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn danger"
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
                <div className="form-grid">
                  <div className="form-item">
                    <label htmlFor="product-name">Name</label>
                    <input
                      id="product-name"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="product-category">Category</label>
                    <input
                      id="product-category"
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="product-company">Company</label>
                    <input
                      id="product-company"
                      value={productForm.company}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="product-price">Price</label>
                    <input
                      id="product-price"
                      type="number"
                      min="0"
                      step="1"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="product-stock">Stock</label>
                    <input
                      id="product-stock"
                      type="number"
                      min="0"
                      step="1"
                      value={productForm.stock}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stock: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="product-colors">Colors (comma)</label>
                    <input
                      id="product-colors"
                      value={productForm.colors}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          colors: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="product-image">Image URL</label>
                    <input
                      id="product-image"
                      value={productForm.image}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          image: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="product-featured">Featured</label>
                    <select
                      id="product-featured"
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
                <div className="actions">
                  <button className="btn" onClick={submitProduct}>
                    {editingProductId ? "Update Product" : "Add Product"}
                  </button>
                </div>
                {adminMsg.text ? (
                  <AlertBox data-type={adminMsg.type}>{adminMsg.text}</AlertBox>
                ) : null}
                <h4 style={{ marginTop: "2rem" }}>Bulk Import</h4>
                <div className="form-grid">
                  <div
                    className="form-item"
                    style={{ gridColumn: "1 / span 2" }}
                  >
                    <label htmlFor="bulk-json">Products JSON</label>
                    <textarea
                      id="bulk-json"
                      rows="6"
                      value={bulkJson}
                      onChange={(e) => setBulkJson(e.target.value)}
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="bulk-discount">Default Discount %</label>
                    <input
                      id="bulk-discount"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={bulkDiscount}
                      onChange={(e) => setBulkDiscount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="actions">
                  <button
                    className="btn"
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
              <section className="panel">
                <h3>Users</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.role}</td>
                          <td>{u.status}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                className="btn"
                                onClick={() => beginEditUser(u)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn danger"
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
                <div className="form-grid">
                  <div className="form-item">
                    <label htmlFor="user-name">Name</label>
                    <input
                      id="user-name"
                      value={userForm.name}
                      onChange={(e) =>
                        setUserForm({ ...userForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="user-email">Email</label>
                    <input
                      id="user-email"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="user-role">Role</label>
                    <select
                      id="user-role"
                      value={userForm.role}
                      onChange={(e) =>
                        setUserForm({ ...userForm, role: e.target.value })
                      }
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
                  <div className="form-item">
                    <label htmlFor="user-status">Status</label>
                    <select
                      id="user-status"
                      value={userForm.status}
                      onChange={(e) =>
                        setUserForm({ ...userForm, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="actions">
                  <button className="btn" onClick={submitUser}>
                    {editingUserId ? "Update User" : "Add User"}
                  </button>
                </div>
              </section>
            )}

            {activeTab === "inventory" && (
              <section className="panel">
                <h3>Inventory</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Stock</th>
                        <th>Adjust</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>{p.stock ?? 0}</td>
                          <td>
                            <div className="row-actions">
                              <input
                                type="number"
                                min="0"
                                defaultValue={p.stock ?? 0}
                                style={{ width: "8rem" }}
                                onBlur={(e) =>
                                  adjustStock(p.id, e.target.value)
                                }
                              />
                              <button
                                className="btn"
                                onClick={(e) =>
                                  adjustStock(
                                    p.id,
                                    e.currentTarget.previousSibling.value
                                  )
                                }
                              >
                                Save
                              </button>
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
              <section className="panel">
                <h3>Billing</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t) => {
                        const u = users.find((x) => x.id === t.userId);
                        return (
                          <tr key={t.id}>
                            <td>{t.date}</td>
                            <td>{u ? u.name : t.userId}</td>
                            <td>
                              <FormatPrice price={t.total} />
                            </td>
                            <td>{t.status}</td>
                            <td>{t.note}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="form-grid">
                  <div className="form-item">
                    <label htmlFor="billing-date">Date</label>
                    <input
                      id="billing-date"
                      type="date"
                      value={transactionForm.date}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="billing-user">User</label>
                    <select
                      id="billing-user"
                      value={transactionForm.userId}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          userId: e.target.value,
                        })
                      }
                    >
                      <option value="">Select user</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-item">
                    <label htmlFor="billing-total">Total</label>
                    <input
                      id="billing-total"
                      type="number"
                      min="0"
                      step="1"
                      value={transactionForm.total}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          total: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="billing-status">Status</label>
                    <select
                      id="billing-status"
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
                  <div className="form-item">
                    <label htmlFor="billing-note">Note</label>
                    <input
                      id="billing-note"
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
                <div className="actions">
                  <button className="btn" onClick={submitTransaction}>
                    Add Transaction
                  </button>
                </div>
              </section>
            )}

            {activeTab === "analytics" && (
              <section className="panel">
                <h3>Analytics</h3>
                <div className="charts">
                  <div className="chart">
                    <h4>Products by Category</h4>
                    <svg width="100%" height="160">
                      {barData.map(([label, count], i) => {
                        const w = 280;
                        const x = 20;
                        const y = 20 + i * 30;
                        const barWidth = (count / maxBar) * w;
                        return (
                          <g key={label}>
                            <rect
                              x={x}
                              y={y}
                              width={barWidth}
                              height="20"
                              fill="#8490ff"
                            />
                            <text
                              x={x + barWidth + 8}
                              y={y + 15}
                              fill="#666"
                              fontSize="12"
                            >
                              {label} ({count})
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  <div className="chart">
                    <h4>Price Trend</h4>
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
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;

const Wrapper = styled.section`
  padding: 9rem 0;
  .alert {
    margin: 1rem 0;
  }

  .layout {
    display: grid;
    grid-template-columns: 24rem 1fr;
    gap: 2rem;
  }

  .sidebar {
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    padding: 2rem;
    height: fit-content;
  }
  .brand {
    margin-bottom: 1rem;
  }
  .nav {
    display: grid;
    gap: 0.8rem;
  }
  .nav button {
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;
    cursor: pointer;
    text-align: left;
  }
  .nav button.active {
    background: ${({ theme }) => theme.colors.btn};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.btn};
  }
  .content {
    min-height: 40rem;
  }

  .subtitle {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text};
  }

  .panel {
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    padding: 2rem;
  }

  .kpis {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.6rem;
    margin-top: 2rem;
  }
  .kpi {
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 0.8rem;
    padding: 1.6rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  }
  .kpi-title {
    font-size: 1.4rem;
    opacity: 0.8;
    margin-bottom: 0.6rem;
  }
  .kpi-value {
    font-size: 2rem;
    font-weight: 600;
  }

  .table-responsive {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 0.8rem;
    overflow: hidden;
  }
  th,
  td {
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 1.4rem;
  }
  th {
    background-color: ${({ theme }) => theme.colors.footer_bg};
    color: #fff;
    text-align: left;
  }
  .row-actions {
    display: inline-flex;
    gap: 0.6rem;
    align-items: center;
  }
  input[type="number"] {
    width: 12rem;
    padding: 0.6rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 0.6rem;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
  }
  input,
  select {
    padding: 0.6rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 0.6rem;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    border: none;
    background: ${({ theme }) => theme.colors.btn};
    color: #fff;
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;
    cursor: pointer;
  }
  .btn.danger {
    background: #e74c3c;
  }
  .charts {
    display: grid;
    gap: 2rem;
  }
  .chart h4 {
    margin-bottom: 0.6rem;
  }
  .form-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  .form-item {
    display: grid;
    gap: 0.4rem;
  }
`;

const AlertBox = styled.div`
  margin: 0 0 1.2rem 0;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  font-size: 1.4rem;
  background: ${(p) =>
    p["data-type"] === "success" ? "#e8f8f2" : "#fdecea"};
  color: ${(p) => (p["data-type"] === "success" ? "#0f5132" : "#842029")};
  border: 1px solid
    ${(p) => (p["data-type"] === "success" ? "#b7e4d7" : "#f5c2c7")};
`;
